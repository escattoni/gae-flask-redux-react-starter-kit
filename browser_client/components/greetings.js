import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import { VelocityTransitionGroup } from 'velocity-react';
import Greeting from './greeting';
import { randomElement } from '../utils/array';
import { memoize } from '../utils/lodash_utils';


export default class Greetings extends PureComponent {
    constructor(props) {
        super(props);
        this.chooseSalutation = memoize( key => randomElement(salutations) );
    }

    render () {
        return (
            <VelocityTransitionGroup
             component="div"
             style={{ float: 'left', marginLeft: 20 }}
             enter={greetingEnter}
             leave={greetingLeave}>

                {this.props.names.map( (name, index) =>

                    <Greeting
                     key={index}
                     name={name}
                     salutation={this.chooseSalutation(index)} />

                )}

            </VelocityTransitionGroup>
        );
    }
}


Greetings.propTypes = {
    names: PropTypes.object.isRequired,
};


const salutations = [ 'Hello', 'Hi', 'Hey', 'Yo', ];


const greetingEnter = {
    ...defaultAnimationOpts,
    animation: {
        translateY: [0, 30],
        opacity:    [1, 0],
    },
};


const greetingLeave = {
    ...defaultAnimationOpts,
    animation: {
        translateY: [30, 0],
        opacity:    [0, 1],
    },
};


const defaultAnimationOpts = {
    duration: 300,
    easing:   'easeOutExpo',
};
