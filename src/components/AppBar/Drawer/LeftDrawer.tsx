import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom'
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Book from '@material-ui/icons/Book';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 200;

const styles = (theme: Theme) => createStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing.unit * 5 + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 6 + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

interface LeftDrawerProps extends WithStyles<typeof styles> {
    path: string;
    isDrawerOpen: boolean;
    onDrawerClose: () => void;
}

const LeftDrawer = ({ classes, isDrawerOpen, onDrawerClose, path }: LeftDrawerProps) => (
    <Drawer
        variant="permanent"
        className={classnames(classes.drawer, {
            [classes.drawerOpen]: isDrawerOpen,
            [classes.drawerClose]: !isDrawerOpen,
        })}
        classes={{
            paper: classnames({
                [classes.drawerOpen]: isDrawerOpen,
                [classes.drawerClose]: !isDrawerOpen,
            }),
        }}
        open={isDrawerOpen}
    >
        <div className={classes.toolbar}>
            <IconButton onClick={onDrawerClose}>
                <ChevronRightIcon />
            </IconButton>
        </div>
        <Divider />
        <List>
            <NavLink to="/courses">
                <ListItem button selected={path === '/courses'}>
                    <ListItemIcon><Book /></ListItemIcon>
                    <ListItemText primary={'Courses'} />
                </ListItem>
            </NavLink>
            <NavLink to="/">
                <ListItem button selected={path === '/'}>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary={'Main'} />
                </ListItem>
            </NavLink>
        </List>
        <Divider />
        <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
    </Drawer>
)

export default withStyles(styles)(LeftDrawer);