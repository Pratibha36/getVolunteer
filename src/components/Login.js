import React, { useState, useEffect, useRef } from 'react';
import './login.css';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { useStateValue } from './StatePovider';
import { useAuthStateValue } from '../context/AuthStateProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';

const Login = () => {

  const [useremail, setUseremail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [{openloginmodal},dipatch]=useStateValue();
  const loginContainerRef = useRef(null);
  const [{user},dispatch]=useAuthStateValue();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const onClose=()=>{
    if(openloginmodal){
        dipatch({
            type:"CLOSE_LOGIN_MODAL"
          })
    }else{
        dipatch({
            type:"OPEN_LOGIN_MODAL"
          })  
    }
  }

  const handleOutsideClick = (event) => {
    if (loginContainerRef.current && !loginContainerRef.current.contains(event.target)) {
      dipatch({
        type:"CLOSE_LOGIN_MODAL"
      })
    }
  };

  useEffect(() => {

    if (openloginmodal) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [openloginmodal, onClose]);

  const handleLogin = async(e) => {
    if (!useremail) {
      setEmailError('Please enter your email.');
    } else {
      setEmailError('');
    }
    if (!password) {
      setPasswordError('Please enter your password.');
    } else {
      setPasswordError('');
    }
    e.preventDefault();
    if (useremail && password) {
      setLoading(true);
    setError(null);

    const user = {
      email: useremail,
      password:password,
    };
    console.log(JSON.stringify(user))

    try {
      // Send POST request to your server
      const response = await fetch('http://localhost:8000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: 'include'
      });

      if (response.ok) {
        console.log(response)
        const data = await response.json();
        dispatch({type:"LOGIN",payload:data})
        setLoading(false);
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.log(errorData)
        setError(errorData.error);
        setLoading(false);
      }
    } catch (error) {
      setError('An error occurred while processing your request.');
      setLoading(false);
    }

    }
    
  };
  const handleSignup=()=>{
    navigate("/signup")
    dipatch({
      type:"CLOSE_LOGIN_MODAL"
    })

  }

  return (
    <div className={`offcanvas-login ${openloginmodal    ? 'open' : ''} `}>
        <div className='overlay'>
      <div className="offcanvas-content" ref={loginContainerRef}>
        <button className="close-button" onClick={onClose}>
        <CloseTwoToneIcon fontSize='large'/>
        </button>
        <h2 className="login-text">Login</h2>
        <h3>Email ID</h3>
        <input
          type="text"
          placeholder="Email ID"
          value={useremail}
          onChange={(e) => setUseremail(e.target.value)}
        />
        <h3>Password</h3>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
         <button className="login-button" onClick={handleLogin} disabled={loading}>
      {loading ? (
        <div style={{display:"flex",justifyContent:"center"}}>
        <TailSpin type="TailSpin" color="#ffffff" height={20} width={20} /></div>
      ) : (
        <span>Login</span>
      )}
    </button>
        <div class="or-sec"> 
        <span class="or-text">OR</span>
         </div>
        <button className="signup-button" onClick={handleSignup}>Sign Up</button>
      </div>
      </div>
    </div>
  );
};

export default Login;
