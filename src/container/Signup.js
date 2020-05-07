import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    Paper,
    Grid,
    TextField,
    Button
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import api from '../api';

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        }
    },
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

const Signup = () => {
    const initialValues = {
        full_name: {
            value: '',
            valid: true
        },
        mobile: {
            value: '',
            valid: true
        },
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
                if (field === 'mobile') {
                    allFields[field].valid = /^[1-9]\d{9}$/.test(allFields[field].value);
                }
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
                full_name: fields.full_name.value,
                mobile: fields.mobile.value,
                username: fields.username.value,
                password: fields.password.value,
            };
            api.post('/signup', data).then(res => {
                const updatedFields = fields;
                for(const field in updatedFields) {
                    if (fields.hasOwnProperty(field)) {
                        updatedFields[field].value = '';
                    }
                }
                setPageState('success');
            }).catch(err => {
                setPageState('fail');
            });
        }
    };
    
    return (
        <Grid item xs={12}>
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h4">
                            Signup
                        </Typography>
                    </Grid>
                </Grid>
                
                <Grid container spacing={1} className={classes.grid}>
                    <Grid xs={2} item></Grid>
                    <Grid xs={8} item>
                        {pageState === 'fail' && <Alert severity="error">Something went wrong</Alert>}
                        {pageState === 'success' && <Alert severity="success">Signup Successfull</Alert>}
                        <Grid container spacing={1}>
                            <Grid xs={6} item>
                                <TextField
                                    label="Full Name"
                                    error={!fields.full_name.valid}
                                    helperText={fields.full_name.valid ? '' : 'Invalid Entry'}
                                    onChange={e => fieldChange(e.target.value, 'full_name')}
                                />
                            </Grid>

                            <Grid xs={6} item>
                                <TextField
                                    label="Mobile"
                                    error={!fields.mobile.valid}
                                    helperText={fields.mobile.valid ? '' : 'Invalid Entry'}
                                    onChange={e => fieldChange(e.target.value, 'mobile')}
                                />
                            </Grid>
                        </Grid>

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
                                Already User? <Link to="/login">Login</Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
};

export default Signup;