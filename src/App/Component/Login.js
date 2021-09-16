import React, { Component } from 'react';
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';
import { AlternateEmail, Fingerprint } from '@material-ui/icons';
import _ from 'lodash';
import "./home.css";
import { styles } from './styles';
import axios from 'axios';
class Login extends Component {
  constructor(props) {
    super(props)
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.changePassword = this.changePassword.bind(this)
  }

  login() {
    const data = document.querySelectorAll('.input input');
    let error = [];
    let count = 0;
    _.forEach(data, (val) => {
      let result = {
        'id': val.getAttribute('id'),
        'value': val.value
      }
      error.push(result);
    });
    _.forEach(error, (val) => {
      if (!val.value) {
        alert('Enter ' + val.id);
      } else {
        ++count;
      }
    });
    if (count === data.length) {
      axios.post('http://localhost:3000/user/login', { email: data[0].value, password: data[1].value })
        .then((res) => {
          let pathName = window.location.pathname;
          pathName = '';
          this.props.history.push({
            pathname: `/`,
            data: res.data
          });
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userDetails', JSON.stringify(res.data));
          console.log('res.data', res);
          // authenticateUser();
        })
        .catch((err) => {
          alert(err.response.data.error)
        })
    }
  }

  authenticateUser() {
    axios.get('http://localhost:3000/user/isUserAuthenticated', {
      headers: {
        "x-access-token": localStorage.getItem('token')
      }
    }).then((res) => {
      console.log(res, 'authenticate user')
    })
  }

  register() {
    let pathName = window.location.pathname;
    pathName = '';
    this.props.history.push({
      pathname: `${pathName}Register`
    });
  }

  changePassword() {
    let pathName = window.location.pathname;
    pathName = '';
    this.props.history.push({
      pathname: `${pathName}confirmEmail`
    });
  }
  
  
  render() {
    const { classes } = this.props;
    // const sectionStyle = {
    //   width: "100%",
    //   height: "400px",
    //   backgroundImage: "url(" + { Background } + ")"
    // };
    return (
      <Paper className={classes.padding} style={{ width: 500, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', boxShadow: '0px 1px 5px 0 rgba(0, 0, 0, 0.16)' }}>
        <div style={{ textAlign: 'center', color: '#686868', fontWeight: 'bold' }}>Login Page</div>
        <div className={classes.margin}>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <AlternateEmail />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField className="input" id="email" label="Email" type="email" fullWidth autoFocus required />
            </Grid>
          </Grid>
          <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
              <Fingerprint />
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
              <TextField className="input" id="password" label="Password" type="password" fullWidth required />
            </Grid>
          </Grid>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <FormControlLabel control={
                <Checkbox
                  color="primary"
                />
              } label="Remember me" />
            </Grid>
          </Grid>
          <Grid container justify="center" style={{ marginTop: '10px' }}>
            <Button variant='contained' color="primary" style={{ textTransform: "none" }} onClick={this.login}>Login</Button>
            <Button variant='contained' color="primary" style={{ textTransform: "none", marginLeft: 15 }} onClick={this.register}>Register</Button>
            <Button variant='contained' color="primary" style={{ textTransform: "none", marginLeft: 15 }} onClick={this.changePassword}>Change Password</Button>
          </Grid>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Login);