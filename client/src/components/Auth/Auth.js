import React, {useState} from 'react';
import{Avatar, Paper, Grid, Typography,Container, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {AUTH} from '../../constants/actionsTypes'

import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import {signin, signup} from '../../actions/auth.js'


const initialState = {firstName: '' ,lastName:'',email:'', password:'',confirmPassword:'' };
const Auth = () => {
  
  const [ShowPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();


  const handleSubmit = (e)=>{
    e.preventDefault();

    if(isSignup){
        dispatch(signup(formData,navigate));
    }else{
      dispatch(signin(formData,navigate));
    }
   
  };
  const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleShowPassword = ()=>{ setShowPassword((prevShowPassword)=>!prevShowPassword)};

  const switchMode = ()=>{
    setIsSignup(prevIsSignup => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res)=>{
    let decoded = jwt_decode(res?.credential);
    
    const{email ,name,sub,picture,family_name,given_name} = decoded;
  
    
    const result = { email:email,
       name:name, 
       googleId:sub 
       ,picture:picture,
       familyName:family_name,
       givenName:given_name
      };
    const token = res.credential;
    

    try {
      dispatch({ type: AUTH, data: { result,token } });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  
  };

  const googleFailure = (error)=>{
    console.log(error)
    console.log("Google Sign In was unsucessful. Try Again Later")
  };
  


  return (
    <Container component='main' maxWidth='xs'>
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant='h5'>{isSignup? 'Sign Up' : 'Sign In'}</Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                  <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                </>
              )}
              <Input name='email' label='Email Address' handleChange={handleChange} type='email'/>
              <Input name='password' label='Password' handleChange={handleChange} type={ShowPassword? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
              {isSignup && <Input name='comfirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>}
            </Grid>
            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              {isSignup? 'Sign Up' : 'Sign In' }
            </Button>
              <GoogleLogin
                render={(renderProps) => (
                  <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant='contained'>Google Sign In</Button>
                )}
                onSuccess={googleSuccess}
                onError={googleFailure}
              />
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Button onClick={switchMode}>{isSignup? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
    </Container>
  )
}

export default Auth;