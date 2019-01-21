import React, { Component } from 'react';
import classnames from 'classnames';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import LeftDrawer from './Drawer';
const drawerWidth = 200;

const styles = (theme: Theme) => createStyles({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
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

interface AppBarState {
    isDrawerOpen: boolean;
}

interface AppBarProps extends WithStyles<typeof styles> {
    path: string,
    isAuthenticated: boolean;
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

    componentDidMount() {
        console.log('hello');
    }

    render() {
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
                        <Typography variant="h6" color="inherit" noWrap>
                            Huntor
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
}

export default withStyles(styles)(NAppBar);