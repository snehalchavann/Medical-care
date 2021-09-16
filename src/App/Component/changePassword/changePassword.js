import React, { Component } from 'react';
import { Paper, withStyles, Grid, TextField, Button, Typography } from '@material-ui/core';
import { Fingerprint } from '@material-ui/icons';
import _ from 'lodash';
import { styles } from '../styles';
import schema from './schema';
import validate from 'validate.js';
import axios from 'axios';
import firebase from '../../firebase';

class changePassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      values: {
        password: '',
        rematch: ''
      },
      touched: {
        password: false,
        rematch: false
      },
      errors: {
        password: null,
        rematch: null
      },
      isValid: false,
      data: ''
    };

    _.bindAll(this, [
      'submit',
      'validateForm',
      'handleFieldChange',
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
    const { rematch, password } = this.state.values;
    if (rematch === password) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          axios.post('http://localhost:3000/user/edit', {
            email: user.email, password
          })
            .then((res) => {
              let pathName = window.location.pathname;
              pathName = '';
              this.props.history.push({
                pathname: `${pathName}login`,
              });
              alert('Password Updated');
            })
            .catch((err) => {
              // alert(err)
            })
        } else {
          alert("Token expired")
        }
      });
    } else {
      const newState = { ...this.state };
      newState.errors['rematch'] = ["Password Not Matching"];
      this.setState(newState);
    }
  }

  render() {
    const { classes } = this.props;
    const { values, isValid, touched, errors } = this.state;
    const showPasswordError = touched.password && errors.password;
    const showRePasswordError = touched.rematch && errors.rematch;

    return (
      <Paper className={classes.padding} style={{ width: 500, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', boxShadow: '0px 1px 5px 0 rgba(0, 0, 0, 0.16)' }}>
        <div style={{ textAlign: 'center', color: '#686868', fontWeight: 'bold' }}>Password Change</div>
        <div className={classes.margin}>
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
            <Button variant='contained' color="primary" style={{ textTransform: "none" }} onClick={this.submit} disabled={!isValid}>Update</Button>
          </Grid>
        </div>
      </Paper >
    );
  }
}

export default withStyles(styles)(changePassword);