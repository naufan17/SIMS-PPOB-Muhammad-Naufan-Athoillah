import { Link } from "react-router-dom"

const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-8 text-center">
        <h3 className="font-semibold text-xl">
          Lengkapi data untuk membuat akun
        </h3>
      </div>
      <form action="" className="w-full flex flex-col gap-6">
        <div>
          <label htmlFor="email" hidden>Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="@ masukan email anda" 
            className="w-full h-10 px-2 border border-gray-300 rounded" 
          />
        </div>
        <div>
          <label htmlFor="firstName" hidden>Nama Depan</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            placeholder="@ masukan nama anda" 
            className="w-full h-10 px-2 border border-gray-300 rounded" 
          />
        </div>
        <div>
          <label htmlFor="lastName" hidden>Nama Belakang</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            placeholder="@ masukan nama anda" 
            className="w-full h-10 px-2 border border-gray-300 rounded" 
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="@ masukan password anda" 
            className="w-full h-10 px-2 border border-gray-300 rounded" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full h-10 px-2 inline-flex items-center justify-center font-medium text-white bg-orange-600 hover:bg-orange-500 rounded"
        >
          Registrasi
        </button>
      </form>
      <div className="text-center mt-6">
        <p>Sudah punya akun? login <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">di sini</Link></p>
      </div>
    </div>
  )
}

export default RegisterPage