import React, { useState, useEffect, useRef } from 'react';
import './login.css';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import { useStateValue } from './StatePovider';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [{openloginmodal},dipatch]=useStateValue();
  const loginContainerRef = useRef(null);
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

  const handleLogin = () => {
    // Implement your login logic here.
  };

  return (
    <div className={`offcanvas-login ${openloginmodal ? 'open' : ''}`}>
      <div className="offcanvas-content" ref={loginContainerRef}>
        <button className="close-button" onClick={onClose}>
        <CloseTwoToneIcon fontSize='large'/>
        </button>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
  );
};

export default Login;
