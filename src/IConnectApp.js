import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Header from './components/Header';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    }
}));

const IConnectApp = ({ children }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={1}></Grid>
                <Grid item xs={10}>
                    <Grid container spacing={2}>                        
                        <Header></Header>
                        {children}
                    </Grid>
                </Grid>
                <Grid item xs={1}></Grid>
            </Grid>
        </div>
    );
};

export default IConnectApp;