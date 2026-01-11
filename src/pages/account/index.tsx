import { z } from "zod"
import { useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import useProfile from "@/api/profile"
import { useAppDispatch } from "@/hooks/redux"
import { deleteCredentials } from "@/store/slices/authSlice"
import ProfilePhoto from "@/assets/images/Profile Photo.png"

// Schema matching the API fields
const accountSchema = z.object({
  email: z.string().email(),
  first_name: z.string().min(1, "Nama depan tidak boleh kosong"),
  last_name: z.string().min(1, "Nama belakang tidak boleh kosong"),
})

type AccountFormValues = z.infer<typeof accountSchema>

const AccountPage = () => {
  const { getProfile, updateProfile, updateImage } = useProfile()

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const fileInputRef = useRef<HTMLInputElement>(null)  
  const profile = getProfile.data?.data

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<AccountFormValues>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
    }
  })

  // Pre-fill form when profile data is loaded
  useEffect(() => {
    if (profile) {
      reset({
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
      })
    }
  }, [profile, reset])

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      updateImage.mutate(file)
    }
  }

  const handleLogout = () => {
    dispatch(deleteCredentials())
    navigate("/login")
  }

  const onSubmit = (data: AccountFormValues) => {
    updateProfile.mutate({
      first_name: data.first_name,
      last_name: data.last_name,
    })
  }

  if (getProfile.isLoading) {
    return (
      <div className="flex flex-col gap-8 justify-center items-center p-8 mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl animate-pulse">
        <div className="w-full flex flex-col items-center gap-6">
          <div className="w-32 h-32 rounded-full bg-gray-200"></div>
          <div className="h-8 w-48 bg-gray-200 rounded"></div>
        </div>

        <div className="w-full flex flex-col gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="h-4 w-20 bg-gray-200 rounded"></div>
              <div className="h-11 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
          <div className="h-11 w-full bg-gray-200 rounded mt-2"></div>
        </div>

        <div className="w-full">
          <div className="h-11 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center p-6 lg:p-8 mx-auto sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      <div className="w-full flex flex-col items-center gap-6">
        <div className="relative group">
          <img 
            src={profile?.profile_image && !profile.profile_image.includes('default') ? profile.profile_image : ProfilePhoto} 
            alt="Profile" 
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
          />
          <button 
            onClick={handleImageClick}
            disabled={updateImage.isPending}
            className="absolute bottom-1 right-1 bg-white border border-gray-300 p-2 rounded-full shadow-md hover:bg-gray-50 transition-all active:scale-90"
            title="Ubah Foto Profil"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </button>
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
            className="hidden"
          />
          {updateImage.isPending && (
            <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center backdrop-blur-[1px]">
               <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <div>
          <h3 className="font-semibold text-2xl">
            {profile?.first_name} {profile?.last_name}
          </h3>
        </div>  
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-medium text-sm text-gray-700">Email</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              @
            </span>
            <input 
              {...register("email")}
              id="email" 
              type="email"  
              disabled
              className="w-full h-11 pl-10 pr-4 border text-sm font-medium border-gray-300 rounded bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="first_name" className="font-medium text-sm text-gray-700">Nama Depan</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              👤
            </span>
            <input 
              {...register("first_name")}
              id="first_name" 
              type="text" 
              placeholder="masukan nama depan anda" 
              className={`w-full h-11 pl-10 pr-4 text-sm font-medium border rounded transition-all duration-200 outline-none
                ${errors.first_name ? 'border-red-500' : 'border-gray-300 focus:border-red-600'}`}
            />
          </div>
          {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="last_name" className="font-medium text-sm text-gray-700">Nama Belakang</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              👤
            </span>
            <input 
              {...register("last_name")}
              id="last_name" 
              type="text" 
              placeholder="masukan nama belakang anda" 
              className={`w-full h-11 pl-10 pr-4 text-sm font-medium border rounded transition-all duration-200 outline-none
                ${errors.last_name ? 'border-red-500' : 'border-gray-300 focus:border-red-600'}`}
            />
          </div>
          {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
        </div>

        <div className="mt-2">
          <button 
            type="submit" 
            disabled={updateProfile.isPending}
            className="w-full h-11 px-2 inline-flex items-center justify-center font-semibold text-white bg-red-600 hover:bg-red-700 rounded transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {updateProfile.isPending ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>

      <div className="w-full">
        <button
          onClick={handleLogout}
          className="w-full h-11 px-2 inline-flex items-center justify-center font-semibold text-red-600 border border-red-600 bg-white hover:bg-red-50 rounded transition-all active:scale-[0.98]"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default AccountPage
