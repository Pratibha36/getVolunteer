import React, { useState, useEffect, useRef } from 'react';
import './login.css';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { useStateValue } from './StatePovider';
import { useAuthStateValue } from '../context/AuthStateProvider';

const Login = () => {

  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [{openloginmodal},dipatch]=useStateValue();
  const loginContainerRef = useRef(null);
  const [{user},dispatch]=useAuthStateValue();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    e.preventDefault();
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
      } else {
        const errorData = await response.json();
        setError(errorData.error);
        setLoading(false);
      }
    } catch (error) {
      setError('An error occurred while processing your request.');
      setLoading(false);
    }

  };

  return (
    <div className={`offcanvas-login ${openloginmodal    ? 'open' : ''} `}>
        <div className='overlay'>
      <div className="offcanvas-content" ref={loginContainerRef}>
        <button className="close-button" onClick={onClose}>
        <CloseTwoToneIcon fontSize='large'/>
        </button>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={useremail}
          onChange={(e) => setUseremail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      </div>
    </div>
  );
};

export default Login;
