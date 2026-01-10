import { useAppDispatch } from "@/hooks/redux"
import { deleteCredentials } from "@/store/slices/authSlice"
import { useNavigate } from "react-router-dom"

const AccountPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(deleteCredentials())
    navigate("/login")
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center py-8 px-4 mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <div className="w-full flex flex-col items-center gap-6">
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <h3 className="font-semibold text-xl">
            Nama Profil
          </h3>
        </div>  
      </div>
      <form action="" className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium text-sm">Email</label>
          <input 
            id="email" 
            type="email"  
            placeholder="@ masukan email anda" 
            className="w-full h-10 px-2 border text-sm font-medium border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="font-medium text-sm">Nama Depan</label>
          <input 
            id="firstName" 
            type="text" 
            placeholder="@ masukan nama depan anda" 
            className="w-full h-10 px-2 border text-sm font-medium border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="font-medium text-sm">Nama Belakang</label>
          <input 
            id="lastName" 
            type="text" 
            placeholder="@ masukan nama belakang anda" 
            className="w-full h-10 px-2 text-sm font-medium border border-gray-300 rounded"
          />
        </div>
        <div>
          <button 
            type="submit" 
            className="w-full h-10 px-2 inline-flex items-center justify-center font-medium text-white bg-red-600 hover:bg-red-500 rounded"
          >
            Edit Profil
          </button>
        </div>
      </form>
      <div className="w-full">
        <button
          onClick={handleLogout}
          className="w-full h-10 px-2 inline-flex items-center justify-center font-medium text-red-600 border border-red-600 bg-white hover:bg-gray-50 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default AccountPage
