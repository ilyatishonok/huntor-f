import React from 'react';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    }
});

const ToolBar = (props: WithStyles<typeof styles>) => (
    <div className={props.classes.toolbar}></div>
);

export default withStyles(styles)(ToolBar);