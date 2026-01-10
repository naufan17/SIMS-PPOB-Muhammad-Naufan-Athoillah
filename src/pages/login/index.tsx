import { Link } from "react-router-dom"

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="mb-8 text-center">
        <h3 className="font-semibold text-xl">
          Masuk atau buat akun untuk memulai
        </h3>
      </div>
      <form action="" className="w-full flex flex-col gap-6">
        <div>
          <label htmlFor="email" hidden>Email</label>
          <input 
            id="email" 
            type="email" 
            placeholder="@ masukan email anda" 
            className="w-full h-10 px-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="password" hidden>Password</label>
          <input 
            id="password" 
            type="password" 
            placeholder="@ masukan password anda" 
            className="w-full h-10 px-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <button 
            type="submit" 
            className="w-full h-10 px-2 inline-flex items-center justify-center font-medium text-white bg-orange-600 hover:bg-orange-500 rounded"
          >
            Masuk
          </button>
        </div>
      </form>
      <div className="text-center mt-6">
        <p>Belum punya akun? regitrasi <Link to="/register" className="font-medium text-orange-600 hover:text-orange-500">di sini</Link></p>
      </div>
    </div>
  )
}

export default LoginPage