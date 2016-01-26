import React, { PropTypes } from 'react';
import PureComponent from 'react-pure-render/component';
import Greetings from './Greetings';
import GreetingControls from './GreetingControls';
import Paper from 'material-ui/lib/paper';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import { Themes } from 'app/utils/styles';
import { shireBackgroundImageMarkup } from 'app/utils/images';
import { Frame, Container } from './Flex';
import ImmutablePropTypes from 'react-immutable-proptypes';


const ShireTheme = ThemeManager.getMuiTheme(Themes.Shire);


export default class ShirePage extends PureComponent {
    componentDidMount () {
        if (this.props.names.size === 0)
            this.props.addName();
    }

    getChildContext () {
        return {
            muiTheme: ShireTheme,
        };
    }

    render () {
        const {
            names,
            windowSize,
            requestsPending,
            addName,
            subtractLastName,
        } = this.props;

        const imageUrlMarkup = shireBackgroundImageMarkup(windowSize);

        return (
            <Frame
             backgroundSize="cover"
             background={`${imageUrlMarkup} no-repeat center center fixed`}>

                <Paper zDepth={4}>

                    <Container justifyContent="space-between">

                        <Container padding={names.size ? '1rem' : 0}>

                            <Greetings names={names} />

                        </Container>

                        <Container>

                            <GreetingControls
                             requestsPending={requestsPending}
                             addName={addName}
                             subtractLastName={subtractLastName} />

                        </Container>

                    </Container>

                </Paper>

            </Frame>
        );
    }
}


ShirePage.propTypes = {
    names: ImmutablePropTypes.listOf( PropTypes.shape({
        name: PropTypes.string.isRequired,
    }) ).isRequired,
    windowSize:       PropTypes.number.isRequired,
    requestsPending:  PropTypes.bool.isRequired,
    addName:          PropTypes.func.isRequired,
    subtractLastName: PropTypes.func.isRequired,
};


ShirePage.childContextTypes = {
    muiTheme: PropTypes.object.isRequired,
};