import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Paper,
    Grid,
} from '@material-ui/core';
import api from '../api';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    grid: {
        padding: theme.spacing(6)
    },
    actionWrap: {
        flexDirection: 'column',
        paddingBottom: '20px'
    },
    label: {
        textAlign: 'left',
        paddingLeft: '15px'
    }
}));

const Profile = () => {
    const classes = useStyles();
    const [profile, setProfile] = useState({});
    useEffect(() => {
        api.get('/me').then(res => {
            setProfile(res.data);
        }).catch(() => {
            setProfile({});
        });
    }, []);
    
    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h4">
                            Profile
                        </Typography>
                    </Grid>
                </Grid>
                
                <Grid container spacing={1} className={classes.grid}>
                    <Grid xs={12} item>
                        <b>Full Name:</b> {profile.full_name}
                        <b>Mobile:</b> {profile.mobile}
                        <b>Username:</b> {profile.username}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Profile;