import React, { Component, ComponentType, ReactNode } from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import LeftDrawer from './Drawer';
import ToolBar from './ToolBar';
const drawerWidth = 200;

const styles = (theme: Theme) => createStyles({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexGrow: 1,
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
});

const Content = styled.div`
    flex-grow: 1;
    padding: 10px;
`;

interface AppBarState {
    isDrawerOpen: boolean;
}

interface AppBarProps extends WithStyles<typeof styles> {
    path: string,
    isAuthenticated: boolean;
    wallet: {
        value: number;
    };
    children: ReactNode;
}

class NAppBar extends Component<AppBarProps, AppBarState> {
    state = {
        isDrawerOpen: false,
    }

    handleDrawerState = () => {
        this.setState((state) => ({
            isDrawerOpen: !state.isDrawerOpen,
        }));
    }

    renderAppBar() {
        const { classes } = this.props;

        if (!this.props.isAuthenticated) {
            return null;
        }

        return (
            <React.Fragment>
                <AppBar
                    position="fixed"
                    className={classnames(classes.appBar, {
                        [classes.appBarShift]: this.state.isDrawerOpen,
                    })}
                >
                    <Toolbar disableGutters={!this.state.isDrawerOpen}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerState}
                            className={classnames(classes.menuButton, {
                                [classes.hide]: this.state.isDrawerOpen,
                            })} >
                            <MenuIcon />
                        </IconButton>
                        <Typography style={{
                            flexGrow: 1
                        }} variant="h6" color="inherit" noWrap>
                            Huntor10
                        </Typography>
                        <Typography style={{
                            marginRight: '10px',
                        }} variant="h6" color="inherit" noWrap>
                            ₡{this.props.wallet.value}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <LeftDrawer
                    isDrawerOpen={this.state.isDrawerOpen}
                    onDrawerClose={this.handleDrawerState} 
                    path={this.props.path}
                    isAuthenticated={this.props.isAuthenticated}
                />
            </React.Fragment>
        );
    }

    renderAuthenticated() {
        return (
            <React.Fragment>
                {this.renderAppBar()}
                <Content>
                    <ToolBar />
                    {this.props.children}
                </Content>
            </React.Fragment>
        )
    }

    render() {
        const { classes, isAuthenticated } = this.props;

        if (isAuthenticated) {
            return this.renderAuthenticated();
        }

        return this.props.children;
    }
}

export default withStyles(styles)(NAppBar);