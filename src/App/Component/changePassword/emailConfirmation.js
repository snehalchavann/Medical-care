import React, { Component } from 'react';
import { Paper, withStyles, Grid, TextField, Button, Typography } from '@material-ui/core';
import { Fingerprint, AlternateEmail } from '@material-ui/icons';
import _ from 'lodash';
import { styles } from '../styles';
// import schema from './schema';
import validate from 'validate.js';
import axios from 'axios';
import firebase from '../../firebase';
const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true
  }
}
class emailConfirmation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      values: {
        email: ''
      },
      touched: {
        email: false
      },
      errors: {
        email: null
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
      console.log(newState)
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
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(this.state.values.email).then(() => {
      let pathName = window.location.pathname;
      pathName = '';
      this.props.history.push({
        pathname: `${pathName}login`,
      });
      alert("Email sent ");
    }).catch((error) => {
      alert("Please verify your email ");
    });
  }

  render() {
    const { classes } = this.props;
    const { values, isValid, touched, errors } = this.state;
    const showEmailError = touched.email && errors.email;

    return (
      <Paper className={classes.padding} style={{ width: 500, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', boxShadow: '0px 1px 5px 0 rgba(0, 0, 0, 0.16)' }}>
        <div style={{ textAlign: 'center', color: '#686868', fontWeight: 'bold' }}>Password Change</div>
        <div className={classes.margin}>
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
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button variant='contained' color="primary" style={{ textTransform: "none" }} onClick={this.submit} disabled={!isValid}>Send Email Verification</Button>
          </Grid>
        </div>
      </Paper >
    );
  }
}

export default withStyles(styles)(emailConfirmation);