import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';
import schema from './schema';
import validate from 'validate.js';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function AddressForm({ initialState, isEdit, setOpen, setIsAddress, setInitialState }) {
    console.log(initialState, 'initialState')
    const classes = useStyles();
    const data = isEdit ? initialState : {};
    const { fName, lName, phone, addLine1, addLine2, city, zipcode } = data;
    const formData = {
        values: {
            fName: fName,
            lName: lName,
            phone: phone,
            city: city,
            state: data?.state,
            addLine1: addLine1,
            addLine2: city,
            zipcode: zipcode
        },
        touched: {
            fName: false,
            lName: false,
            phone: false,
            city: false,
            state: false,
            addLine1: false,
            addLine2: false,
            zipcode: false
        },
        errors: {
            fName: null,
            lName: null,
            phone: null,
            city: null,
            state: null,
            addLine1: null,
            addLine2: null,
            zipcode: null
        },
        isValid: initialState ? true : false,
        data: ''
    };
    
    const [state, setState] = React.useState(formData);
    // const { classes } = props;
    const { values, isValid, touched, errors } = state;
    console.log(isValid, 'is valid')
    const showFNameError = touched.fName && errors.fName;
    const showLNameError = touched.lName && errors.lName;
    const showPhoneError = touched.phone && errors.phone;
    const showadd1Error = touched.addLine1 && errors.addLine1;
    const showadd2Error = touched.addLine2 && errors.addLine2;
    const showCityError = touched.city && errors.city;
    const showStateError = touched.state && errors.state;
    const showZipcodeError = touched.zipcode && errors.zipcode;
    const validateForm = () => {
        _.defer(() => {
            const { values } = state;
            const newState = { ...state };
            const errors = validate(values, schema);
            newState.errors = errors || {};
            newState.isValid = errors ? false : true;

            setState(newState);
        });
    }
    const handleFieldChange = (field, value) => {
        console.log(value, 'value')
        const newState = { ...state };

        newState.submitError = null;
        newState.touched[field] = true;
        newState.values[field] = value;

        setState(newState, validateForm());
    };
    const add = (event) => {
        
        const userdata = JSON.parse(localStorage.getItem('userDetails'));
        const data = {
            name: state.values.fName,
            mobileNumber: state.values.phone,
            pincode: state.values.zipcode,
            locality: "",
            address: `${state.values.addLine1}, ${state.values.addLine2}`,
            city: state.values.city,
            addressType: "home",
            landmarl: "",
            alternatePhone: "",
            cityDistrictTown: state.values.state
        }
        const val = JSON.stringify(state.values);
        console.log(state.values, 'valyes...')
        localStorage.setItem('address', val);
        alert('Address added');
          setOpen(false);
          setIsAddress(true);
          setInitialState(state.values);
    }
    return (
        <form className={classes.root} autoComplete="off">
            <div>
                <TextField fullWidth className="input" id="fName" label="First Name" defaultValue={fName} required onChange={event =>
                    handleFieldChange('fName', event.target.value)
                } />
                {showFNameError && (
                    <Typography
                        className={classes.fieldError}
                        variant="body2"
                    >
                        {errors.fName[0]}
                    </Typography>
                )}
            </div>
            <div>
                <TextField fullWidth className="input" id="lName" label="Last Name" defaultValue={lName} required onChange={event =>
                    handleFieldChange('lName', event.target.value)
                } />
                {showLNameError && (
                    <Typography
                        className={classes.fieldError}
                        variant="body2"
                    >
                        {errors.lName[0]}
                    </Typography>
                )}
            </div>
            <div>
                <TextField fullWidth className="input numberValid" id="phone" label="Phone Number" defaultValue={phone} type='number' 
                onInput={(e)=>{ 
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10)
                }}
                required 
                onChange={event =>
                    handleFieldChange('phone', event.target.value)
                } /><br></br>
                {showPhoneError && (
                    <Typography
                        className={classes.fieldError}
                        variant="body2"
                    >
                        {errors.phone[0]}
                    </Typography>
                )}
            </div>
            <div>
                <TextField fullWidth className="input numberValid" id="addLine1" label="Address Line 1" defaultValue={addLine1} required onChange={event =>
                    handleFieldChange('addLine1', event.target.value)
                } /><br></br>
                {showadd1Error && (
                    <Typography
                        className={classes.fieldError}
                        variant="body2"
                    >
                        {errors.addLine1[0]}
                    </Typography>
                )}
            </div>
            <div>
                <TextField fullWidth className="input" id="addLine2" label="Address Line 2" defaultValue={addLine2} onChange={event =>
                    handleFieldChange('addLine2', event.target.value)
                } /><br></br>
                {showadd2Error && (
                    <Typography
                        className={classes.fieldError}
                        variant="body2"
                    >
                        {errors.addLine2[0]}
                    </Typography>
                )}
            </div>
            <div>
                <TextField fullWidth className="input" id="city" label="City" defaultValue={city} required onChange={event =>
                    handleFieldChange('city', event.target.value)
                } /><br></br>
                {showCityError && (
                    <Typography
                        className={classes.fieldError}
                        variant="body2"
                    >
                        {errors.city[0]}
                    </Typography>
                )}
            </div>
            <div>
                <TextField fullWidth className="input" id="state" label="State" defaultValue={data.state} required onChange={event =>
                    handleFieldChange('state', event.target.value)
                } /><br></br>
                {showStateError && (
                    <Typography
                        className={classes.fieldError}
                        variant="body2"
                    >
                        {errors.state[0]}
                    </Typography>
                )}
            </div>
            <div>
                <TextField className="input" id="zipcode" label="Zipcode" defaultValue={zipcode} required type='number' 
                onInput={(e)=>{ 
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
                }}
                onChange={event =>
                    handleFieldChange('zipcode', event.target.value)
                } /><br></br>
                {showZipcodeError && (
                    <Typography
                        className={classes.fieldError}
                        variant="body2"
                    >
                        {errors.zipcode[0]}
                    </Typography>
                )}
            </div>

            <Button variant='contained' color="primary" style={{ textTransform: "none" }} onClick={add} disabled={!isValid}>Add Address</Button>
        </form>
    );
}
