import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import RaisedButton from 'material-ui/lib/raised-button';
import { ColumnWise } from './Flex';


export default class GreetingControls extends PureComponent {
    render () {
        const { fetchAndAddName, subtractLastName, requestsPending } = this.props;

        return (
            <ColumnWise
             overflow="hidden"
             flexWrap="wrap"
             padding={'0 10px'}>

                <RaisedButton
                 style={{ marginBottom: 5 }}
                 primary={true}
                 label="ADD GREETING"
                 onTouchTap={fetchAndAddName} />

                <RaisedButton
                 style={{ marginBottom: 5 }}
                 secondary={true}
                 label="SUBTRACT LAST GREETING"
                 onTouchTap={subtractLastName} />

                <div
                 className="waiting"
                 style={{ visibility: requestsPending ? 'visible' : 'hidden' }}>
                    Waiting...
                </div>

            </ColumnWise>
        );
    }
}


GreetingControls.propTypes = {
    requestsPending:  PropTypes.bool.isRequired,
    fetchAndAddName:  PropTypes.func.isRequired,
    subtractLastName: PropTypes.func.isRequired,
};
