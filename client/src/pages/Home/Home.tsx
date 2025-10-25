import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router';

const Home: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const hardcodedLogin = import.meta.env.VITE_FRONTEND_USERNAME
  const hardcodedPassword = import.meta.env.VITE_FRONTEND_PASSWORD ;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login === hardcodedLogin && password === hardcodedPassword) {
      setError('');
      navigate('/expenses');
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth-form'>
        <h1>Where is my money ?</h1>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='login'
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className='error-message'>{error}</div>}
          <button className='sign-button' type='submit'>Войти</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
