import datetime
from collections import namedtuple

import pytest

from app.models.ndb import friendship, character, faction


@pytest.yield_fixture(scope='function')
def test_setup(testbed):
    TestSetup = namedtuple(
        'TestSetup',
        ('own_friendship', 'other_friendship', 'c3po', 'r2d2', 'bb8', 'resistance')
    )
    resistance = create_faction('The Resistance')
    c3po = create_character('C3PO', resistance)
    r2d2 = create_character('R2D2', resistance)
    own_friendship = friendship.Friendship.create_friendship(c3po, r2d2)
    bb8 = create_character('BB8', resistance)
    other_friendship = friendship.Friendship.create_friendship(r2d2, bb8)
    yield TestSetup(own_friendship, other_friendship, c3po, r2d2, bb8, resistance)


def create_character(name_string, faction):
    character_key = character.Character(
        parent=character.root,
        name=name_string,
        description='blah',
        faction=faction.key
    ).put()
    return character_key.get()


def create_faction(name_string):
    faction_key = faction.Faction(
        name=name_string,
        description='blah'
    ).put()
    return faction_key.get()


def test_properties(test_setup):
    assert test_setup.c3po.name == 'C3PO'
    assert test_setup.c3po.description == 'blah'
    assert test_setup.c3po.faction.get().name == 'The Resistance'
    assert isinstance(test_setup.c3po.created, datetime.datetime)


def test_get_friends(test_setup):
    assert test_setup.c3po.get_friends() == [test_setup.r2d2]


def test_get_friends_of_friends(test_setup):
    assert test_setup.c3po.get_friends_of_friends() == [test_setup.bb8]


def test_ensure_character_name_not_in_datastore(test_setup):
    with pytest.raises(ValueError) as excinfo:
        character.Character.ensure_character_name_not_in_datastore('C3PO')

    assert str(excinfo.value) == '"C3PO" already exists'

    name = character.Character.ensure_character_name_not_in_datastore('Han')
    assert name == 'Han'


def test_create_character(test_setup):
    kwargs = dict(
        name='C3PO',
        description='blah',
        faction=test_setup.resistance.key
    )

    with pytest.raises(ValueError) as excinfo:
        character.Character.create_character(**kwargs)

    assert str(excinfo.value) == '"C3PO" already exists'

    kwargs['name'] = 'Han'
    new_character = character.Character.create_character(**kwargs)
    assert new_character.name == 'Han'
