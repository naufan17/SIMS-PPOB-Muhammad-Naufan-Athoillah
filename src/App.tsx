import { Route, Routes } from 'react-router-dom'
import IndexPage from '@/pages'
import MainLayout from '@/layouts/MainLayout'

import AuthLayout from '@/layouts/AuthLayout'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'
import ProfilePage from './pages/profile'

import './index.css';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <IndexPage />
          </MainLayout>
        }
      />
      <Route
        path="/login"
        element={
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        }
      />
      <Route
        path="/register"
        element={
          <AuthLayout>
            <RegisterPage />
          </AuthLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <MainLayout>
            <ProfilePage />
          </MainLayout>
        }
      />
    </Routes>
  )
}

export default App
