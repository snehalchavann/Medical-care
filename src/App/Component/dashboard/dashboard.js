import React, { useState, useEffect } from 'react'
import './styles.less'
import { Grid, TextField, Button } from '@material-ui/core'
import schema from './schema';
import validate from 'validate.js';
import axios from 'axios';

export default function dashboard(props) {
  const [data, setData] = useState(props.history.location.data || {})
  let [error, setError] = useState({})
  let [listData, setListData] = useState([])
  let [isValid, setIsValid] = useState(false)
  const [isEdit, setEdit] = useState(false)

  useEffect(() => {
    axios.get('http://localhost:3000/user/getAll')
      .then((res) => {
        setListData([...res.data])
      })
  }, [])

  const logout = () => {
    let pathName = window.location.pathname;
    pathName = '';
    props.history.push({
      pathname: `${pathName}login`,
    });
  }

  const handleChange = (e) => {
    const { value, name } = e.target
    const newValue = data
    newValue[name] = value
    const errors = validate(newValue, schema);
    const newError = errors || {};
    isValid = errors ? false : true;
    setIsValid(isValid)
    setError({ ...newError })
    setData({ ...newValue })
  }

  const handleClick = () => {
    if (isEdit) {
      let usercount = 0;
      let emailcount = 0;
      if (listData.length) {
        listData.forEach((val, i) => {
          if (val._id !== data._id && val.username === data.username) {
            usercount++;
          } else if (val._id !== data._id && val.email === data.email) {
            emailcount++
          }
        });
      }
      if (!usercount && !emailcount) {
        const { email, password, username, _id } = data
        axios.post('http://localhost:3000/user/edit', {
          email, password, username, _id
        })
          .then((res) => {
            setEdit(!isEdit)
            alert('Data Updated')
          })
          .catch((err) => {
            alert(err.response.data.error)
          })
      } else if (usercount) {
        alert('User already available');
      } else if (emailcount) {
        alert('Email already available');
      }
    } else setEdit(!isEdit)
  }

  const createUser = () => (
    <div className='InfoWrapper'>
      <h3>User Details</h3>
      <Grid container justify='space-between' spacing={2} className='userWrapper'>
        <Grid item xs={6} sm={6} md={6} lg={6}>Username</Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <TextField name='username' id="standard-basic" disabled={!isEdit} value={data ? data.username : 'test'} onChange={(e) => handleChange(e)} />
          {error && error.username && error.username.length ? <div className='fieldError'>{error.username[0]}</div> : null}
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>Email</Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <TextField name='email' id="standard-basic" disabled={!isEdit} value={data ? data.email : 'test'} onChange={(e) => handleChange(e)} />
          {error && error.email && error.email.length ? <div className='fieldError'>{error.email[0]}</div> : null}
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>Password</Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <TextField name='password' id="standard-basic" disabled={!isEdit} value={data ? data.password : 'test'} onChange={(e) => handleChange(e)} />
          {error && error.password && error.password.length ? <div className='fieldError'>{error.password[0]}</div> : null}
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' className='edit' onClick={() => handleClick()} disabled={isEdit && !isValid}>{!isEdit ? 'Edit' : 'Update'}</Button>
          <Button variant='contained' style={{ margin: '0px 10px' }} color='primary' className='edit' onClick={() => deleteData(data._id)}>Delete</Button>
        </Grid>
      </Grid>
    </div>
  )

  const createHeader = () => (
    <Grid className='listHeader' container>
      <Grid className='listHeaderTitle' item xs={3} sm={3} md={3} lg={3}>Username</Grid>
      <Grid className='listHeaderTitle' item xs={3} sm={3} md={3} lg={3}>Email</Grid>
      <Grid className='listHeaderTitle' item xs={3} sm={3} md={3} lg={3}>Password</Grid>
      <Grid className='listHeaderTitle' item xs={3} sm={3} md={3} lg={3}>Delete</Grid>
    </Grid>
  )

  const createBody = (val, i) => (
    <Grid className='listItems' container key={i}>
      <Grid className='listHeaderTitle' item xs={3} sm={3} md={3} lg={3}>{val.username || '-'}</Grid>
      <Grid className='listHeaderTitle' item xs={3} sm={3} md={3} lg={3}>{val.email || '-'}</Grid>
      <Grid className='listHeaderTitle' item xs={3} sm={3} md={3} lg={3}>{val.password || '-'}</Grid>
      <Grid className='listHeaderTitle' item xs={3} sm={3} md={3} lg={3}><Button variant='contained' color='primary' onClick={() => deleteData(val._id, i)}>Delete</Button></Grid>
    </Grid>
  )

  const deleteData = (_id, key = -1) => {
    axios.delete('http://localhost:3000/user/delete', { data: { _id } })
      .then((res) => {
        if (key !== -1) {
          listData.splice(key, 1)
          setListData([...listData])
        } else {
          let pathName = window.location.pathname;
          pathName = '';
          props.history.push({
            pathname: `${pathName}login`,
          });
        }
        alert('Data deleted')
      })
  }
  return (
    <>
      <div className='header'>
        Welcome, {data ? data.username : 'test'}
        <Button variant='contained' color='primary' className='logout' onClick={logout}>LOGOUT</Button>
      </div>
      <div className='ParentWrapper'>
        {createUser()}
        {data.admin && listData.length > 1 ? (
          <div className='ListWrapper'>
            {createHeader()}
            {data.admin && listData.map((val, i) => {
              if (val._id !== data._id) return createBody(val, i)
              return null
            })}
          </div>) : null}
      </div>
    </>
  )
}
