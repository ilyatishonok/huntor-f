import React from 'react';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import Routes from '../../containers/Routes';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import deepPurple from '@material-ui/core/colors/deepPurple';
import store, { history } from '../../store';

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }

    #root {
        display: flex;
        height: 100%;
    }
`;

const theme = createMuiTheme({
    palette: {
        primary: deepPurple,
    },
    spacing: {
        unit: 10,
    },
});

const App = () => (
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <GlobalStyle />
            <ConnectedRouter history={history}>
                <Routes />
            </ConnectedRouter>
        </MuiThemeProvider>
    </Provider>
);

export default App;