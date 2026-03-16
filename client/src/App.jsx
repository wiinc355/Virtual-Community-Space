import React, { useState } from 'react'
import { useRoutes, Link, Navigate, useNavigate } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
import Events from './pages/Events'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

const AdminRoute = () => {
  const token = localStorage.getItem('adminToken')

  if (!token) {
    return <Navigate to='/admin/login' replace />
  }

  return <AdminDashboard />
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('adminToken'))
  const navigate = useNavigate()

  const handleAuthBtn = () => {
    if (isLoggedIn) {
      localStorage.removeItem('adminToken')
      setIsLoggedIn(false)
      navigate('/admin/login')
    } else {
      navigate('/admin/login')
    }
  }

  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/echolounge',
      element: <LocationEvents index={1} />
    },
    {
      path: '/houseofblues',
      element: <LocationEvents index={2} />
    },
    {
      path: '/pavilion',
      element: <LocationEvents index={3} />
    },
    {
      path: '/americanairlines',
      element: <LocationEvents index={4} />
    },
    {
      path: '/events',
      element: <Events />
    },
    {
      path: '/admin/login',
      element: <AdminLogin onLogin={() => setIsLoggedIn(true)} />
    },
    {
      path: '/admin',
      element: <AdminRoute />
    }
  ])

  return (
    <div className='app'>

      <header className='main-header'>
        <h1>UnityGrid Plaza</h1>

        <div className='header-buttons'>
          {!isLoggedIn && (
            <>
              <Link className='header-action' to='/' role='button'>Home</Link>
              <Link className='header-action' to='/events' role='button'>Events</Link>
            </>
          )}
          <button className='header-action' type='button' onClick={handleAuthBtn}>
            {isLoggedIn ? 'Log Out' : 'Login'}
          </button>
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App