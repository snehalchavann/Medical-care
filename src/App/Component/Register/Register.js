import React, { Component } from 'react';
import { Paper, withStyles, Grid, TextField, Button, Typography } from '@material-ui/core';
import { Face, Fingerprint, AlternateEmail } from '@material-ui/icons';
import _ from 'lodash';
import { styles } from '../styles';
import schema from './schema';
import validate from 'validate.js';
import axios from 'axios';
import firebase from '../../firebase';

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      values: {
        username: '',
        email: '',
        password: '',
        rematch: ''
      },
      touched: {
        username: false,
        email: false,
        password: false,
        rematch: false
      },
      errors: {
        username: null,
        email: null,
        password: null,
        rematch: null
      },
      isValid: false,
      data: ''
    };

    _.bindAll(this, [
      'submit',
      'validateForm',
      'handleFieldChange'
    ]);
  }

  validateForm() {
    _.defer(() => {
      const { values } = this.state;
      const newState = { ...this.state };
      const errors = validate(values, schema);
      newState.errors = errors || {};
      newState.isValid = errors ? false : true;

      this.setState(newState);
    });
  }

  handleFieldChange(field, value) {
    const newState = { ...this.state };

    newState.submitError = null;
    newState.touched[field] = true;
    newState.values[field] = value;

    this.setState(newState, this.validateForm());
  };

  submit() {
    let usercount = 0;
    let emailcount = 0;
    if (this.state.data.length) {
      this.state.data.forEach((val, i) => {
        if (val.username === this.state.values.username) {
          usercount++;
        } else if (val.email === this.state.values.email) {
          emailcount++
        }
      });
    }
    console.log(this.state.data, 'register..')
    if (!usercount && !emailcount) {
      const { rematch, password, username, email } = this.state.values;
      if (rematch === password) {
        const body = { username, password, email };
        axios.post('http://localhost:3000/user/create', {
          body
        })
          .then((res) => {
            alert('Registration Completed');
            const auth = firebase.auth();
            auth.createUserWithEmailAndPassword(email, password).then((res) => {
              console.log("auth create", res);
            }).catch((error) => {
              console.log(error, 'error...');
            });
            let pathName = window.location.pathname;
            pathName = '';
            this.props.history.push({
              pathname: `${pathName}login`,
            });
          });
      } else {
        const newState = { ...this.state };
        newState.errors['rematch'] = ["Password Not Matching"];
        this.setState(newState);
      }
    } else if (usercount) {
      alert('User already available');
    } else if (emailcount) {
      alert('Email already available');
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3000/user/getAll')
      .then((res) => {
        this.setState({ data: res.data });
      });
  }
  render() {
    const { classes } = this.props;
    const { values, isValid, touched, errors } = this.state;
    const showUsernameError = touched.username && errors.username;
    const showEmailError = touched.email && errors.email;
    const showPasswordError = touched.password && errors.password;

    return (
      <Paper className={classes.padding} style={{ width: 500, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', boxShadow: '0px 1px 5px 0 rgba(0, 0, 0, 0.16)' }}>
        <div style={{ textAlign: 'center', color: '#686868', fontWeight: 'bold' }}>Registration Page</div>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Face />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField className="input" id="username" label="Username" type="text" fullWidth autoFocus required
                onChange={event =>
                  this.handleFieldChange('username', event.target.value)
                }
              />
              {showUsernameError && (
                <Typography
                  className={classes.fieldError}
                  variant="body2"
                >
                  {errors.username[0]}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <AlternateEmail />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField className="input" id="email" label="Email" type="email" fullWidth required
                onChange={event =>
                  this.handleFieldChange('email', event.target.value)
                }
              />
              {showEmailError && (
                <Typography
                  className={classes.fieldError}
                  variant="body2"
                >
                  {errors.email[0]}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField className="input" id="password" label="Password" type="password" fullWidth required
                onChange={event =>
                  this.handleFieldChange('password', event.target.value)
                }
              />
              {showPasswordError && (
                <Typography
                  className={classes.fieldError}
                  variant="body2"
                >
                  {errors.password[0]}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField className="input" id="password" label="Re-Enter Password" type="password" fullWidth required
                onChange={event =>
                  this.handleFieldChange('rematch', event.target.value)
                }
              />
              {(values.rematch && values.rematch !== values.password) && (
                <Typography
                  className={classes.fieldError}
                  variant="body2"
                >
                  Password Not Matching
                </Typography>
              )}
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button variant='contained' color="primary" style={{ textTransform: "none" }} onClick={this.submit} disabled={!isValid}>Submit</Button>
          </Grid>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Register);