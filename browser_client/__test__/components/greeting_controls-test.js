import React from 'react';
import {
    renderIntoDocument,
    Simulate,
} from 'react-addons-test-utils';
import { createFinder } from '../utils';
import GreetingControls from '../../components/greeting_controls';


function setup (requestsPending = false) {
    const props = {
        requestsPending,
        fetchAndAddName:  sinon.spy( x => x ),
        subtractLastName: sinon.spy( x => x ),
    };
    const greetingControls = renderIntoDocument(<GreetingControls {...props} />);
    const find = createFinder(greetingControls);
    const [ addButton, subtractButton ] = find('button');
    const waitingIndicator = find('div')[1];

    return { props, addButton, subtractButton, waitingIndicator };
}


describe('adding a greeting', () => {
    it('calls the `fetchAndAddName` action creator', () => {
        const { props, addButton } = setup();
        Simulate.click(addButton);
        expect( props.fetchAndAddName ).to.have.been.calledOnce;
    });
});


describe('subtracting a greeting', () => {
    it('calls the `subtractLastName` action creator', () => {
        const { props, subtractButton } = setup();
        Simulate.click(subtractButton);
        expect( props.subtractLastName ).to.have.been.calledOnce;
    });
});


describe('awaiting a greeting', () => {

    context('when there is not a pending greeting request', () => {
        it('does not show a waiting indicator', () => {
            const { waitingIndicator } = setup();
            expect( waitingIndicator.style.visibility ).to.equal( 'hidden' );
        });
    });

    context('when there is a pending greeting request', () => {
        it('does show a waiting indicator', () => {
            const { waitingIndicator } = setup(true);
            expect( waitingIndicator.style.visibility ).to.equal( 'visible' );
        });
    });
});