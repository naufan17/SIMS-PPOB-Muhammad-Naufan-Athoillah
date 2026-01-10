import { Route, Routes } from 'react-router-dom'

// Layouts
import MainLayout from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'

// Pages
import IndexPage from '@/pages'
import LoginPage from '@/pages/login'
import RegisterPage from '@/pages/register'
import AccountPage from '@/pages/account'
import TopUpPage from '@/pages/top-up'
import TransactionPage from '@/pages/transaction'

import './index.css'

function App() {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Main Routes */}
      <Route element={<MainLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="/top-up" element={<TopUpPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Route>
    </Routes>
  )
}

export default App
