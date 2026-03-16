import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminAPI from '../services/AdminAPI'
import '../css/AdminLogin.css'

const AdminLogin = ({ onLogin }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage('')

    try {
      const data = await AdminAPI.login(username, password)
      localStorage.setItem('adminToken', data.token)
      if (onLogin) onLogin()
      navigate('/admin')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div className='admin-login-page'>
      <article className='admin-login-card'>
        <h2>Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor='admin-username'>Username</label>
          <input
            id='admin-username'
            type='text'
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />

          <label htmlFor='admin-password'>Password</label>
          <input
            id='admin-password'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button type='submit'>Log In</button>
        </form>

        {errorMessage && <small>{errorMessage}</small>}
      </article>
    </div>
  )
}

export default AdminLogin
