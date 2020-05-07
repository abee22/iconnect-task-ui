import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Paper,
    Grid,
    TextField,
    Button
} from '@material-ui/core';
import api from '../api';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    grid: {
        padding: theme.spacing(3)
    },
    actionWrap: {
        flexDirection: 'column',
        paddingBottom: '20px'
    }
}));

const Login = () => {
    const initialValues = {
        username: {
            value: '',
            valid: true
        },
        password: {
            value: '',
            valid: true
        },
    };
    const classes = useStyles();
    const [fields, setFields] = useState(initialValues);
    const [pageState, setPageState] = useState('init');
    const fieldChange = (value, field) => {
        const newFields = {...fields};
        newFields[field].value = value;
        const updatedFields = validateFields(newFields);
        setFields({...updatedFields});
    };

    const validateFields = (allFields) => {
        for(const field in allFields) {
            if (allFields.hasOwnProperty(field)) {
                allFields[field].valid = !!allFields[field].value;
            }
        }
        return allFields
    }

    const onSubmit = () => {
        const updatedFields = validateFields(fields);
        setFields({...updatedFields});
        let allValid = true;
        for(const field in updatedFields) {
            if (fields.hasOwnProperty(field)) {
                allValid = !allValid && updatedFields[field].valid
            }
        }
        if (allValid) {
            setPageState('loading');
            const data = {
                username: fields.username.value,
                password: fields.password.value,
            };
            api.post('/login', data).then(res => {
                setPageState('success');
                localStorage.setItem('token', res.data.token);
            }).catch(() => {
                setPageState('fail');
            });
        }
    };
    return pageState === 'success' ? <Redirect to='/profile'/> : (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h4">
                            Login
                        </Typography>
                    </Grid>
                </Grid>
                
                <Grid container spacing={1} className={classes.grid}>
                    <Grid xs={2} item></Grid>
                    <Grid xs={8} item>
                        <Grid container spacing={1}>
                            <Grid xs={6} item>
                                <TextField
                                    label="Username"
                                    error={!fields.username.valid}
                                    helperText={fields.username.valid ? '' : 'Invalid Entry'}
                                    onChange={e => fieldChange(e.target.value, 'username')}
                                />
                            </Grid>

                            <Grid xs={6} item>
                                <TextField
                                    label="Password"
                                    error={!fields.password.valid}
                                    helperText={fields.password.valid ? '' : 'Invalid Entry'}
                                    onChange={e => fieldChange(e.target.value, 'password')}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid xs={3} item></Grid>
                            <Grid xs={6} item>
                                <Button variant="contained" color="primary" disabled={['loading'].includes(pageState)} onClick={onSubmit}>Submit</Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid xs={3} item></Grid>
                            <Grid xs={6} item>
                                New User? <Link to="/signup">Signup</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Login;