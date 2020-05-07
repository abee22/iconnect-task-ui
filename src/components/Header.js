import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Paper,
    Grid,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

const Header = () => {
    const classes = useStyles();
    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={1}>
                        <Typography component="h1" variant="h4">
                            Logo
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Header;