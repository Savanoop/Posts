import React, { useEffect, useState } from 'react';
import "./LoginPage.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginCredential } from '../../actions/loginAction';
import { useHistory } from "react-router-dom";
import { fakeAuth } from '../../helper/auth';
import Email from './Email';
import PassWord from './Password';


export default function LoginPage ({props})  {
  const history = useHistory()

  const credentials = useSelector(state => state.loginReducer.items);
  const dispatch = useDispatch();

  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const [emailError,setEmailError] = useState('')
  const [isEmailError,setIsEmailError] = useState(false)
  const [passwordError,setPasswordError] = useState('')
  const [isPasswordError,setIsPasswordError] = useState(false)
  const [redirectToReferrer,setRedirectToReferrer] = useState(false)



  useEffect(() => {
    dispatch(getLoginCredential());
  },[])
  const onCancel = () => {
    setEmail('')
    setEmailError('')
    setIsEmailError(false)
    setPassword('')
    setPasswordError('')
    setIsPasswordError(false)
  }

  const onLogin = () => {
  
    setEmailError('')
    setIsEmailError(false)
    setPasswordError('')
    let isUserInData = credentials.find(loginDetails => loginDetails.password === password && loginDetails.username ===email)

    let reg = new RegExp("^(?=.*[1-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$");
    // let reg = new RegExp("/^(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[^a-zA-Z0-9])(?!.*\s).{8,15}$/");
 
    let testPass = reg.test(password);
    let specialPass = /[^a-zA-Z0-9\-\/]/.test(password)
    
    let lastAtPos = email.lastIndexOf('@');
    let lastDotPos = email.lastIndexOf('.');
    if (email === "") {
      setEmailError('Email is Required')
      setIsEmailError(true)

    }

    else if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
      setEmailError('Email is not valid')
      setIsEmailError(true)
    }
    else if (!testPass || !specialPass) {
      setPasswordError('Password should contain alphabet, numbers,special character and minimum 8 characters')
      setIsPasswordError(true)
    }
    else {
      if(isUserInData && isUserInData){

         fakeAuth.authenticate(() => {
          setRedirectToReferrer(true)
          history.push('/posts')
        })
 
      }
      else if (!isUserInData){
        setPasswordError('InCorrect Credentials')

      }

    }

  }
  const onEmailChange = (e) => {
    setEmail(e.target.value)
  }
 const onPasswordChange = (e) => {
   setPassword(e.target.value)
  }
    return (
      <div className={`pageLayout`}>
        <FormControl>

          <h3>Login</h3>
          <div className={`textbox`}>
            <Email
            email={email}
            onEmailChange={onEmailChange}
            isEmailError={isEmailError}
            emailError={emailError}/>
            {/* <TextField
              required
              id="margin-dense"
              label="Email"
              variant="outlined"
              value={email}
              onChange={onEmailChange}
              error={isEmailError}
              helperText={emailError}
              InputProps={{
                style: {
                    width: 250
                }
            }}
            /> */}
          </div>
          <div className={`textbox`}>
            <PassWord
            password={password}
            onPasswordChange={onPasswordChange}/>
            {/* <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              value={password}
              autoComplete="current-password"
              variant="outlined"
              onChange={onPasswordChange}
              InputProps={{
                style: {
                    width: 250
                }
            }}

            /> */}
            <p className={'error'}>{passwordError}</p>
          </div>
          <div>
            <Button variant="outlined" size='small' color="primary" id='Cancel' onClick={onCancel} style ={{marginRight:'85px'}}>Cancel</Button>
            <Button variant="contained" size="small" color="primary" onClick={onLogin}>
              Login
          </Button>
          </div>
        </FormControl>
      </div>
    )

 
}
