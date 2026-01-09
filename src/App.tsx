import { Route, Routes } from 'react-router-dom'
import IndexPage from '@/pages'
import MainLayout from '@/layouts/MainLayout'

import './App.css'

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
    </Routes>
  )
}

export default App
