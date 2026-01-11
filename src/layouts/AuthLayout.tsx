import { Outlet } from 'react-router-dom'

import IllustrationLogin from '@/assets/images/Illustrasi Login.png'
import Logo from '@/assets/images/Logo.png'

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Form */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <div className="flex justify-center items-center gap-2 mb-8">
            <img src={Logo} alt="Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold">SIMS PPOB</h1>
          </div>
          <Outlet />
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="hidden lg:block">
        <img
          src={IllustrationLogin}
          alt="Login Illustration"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  )
}

export default AuthLayout
