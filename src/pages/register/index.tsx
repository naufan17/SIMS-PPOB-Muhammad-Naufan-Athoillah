import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import useAuth from "@/api/auth"
import { registerSchema, type RegisterFormValues } from "@/schemas/auth"
import { LoadingSkeleton } from "@/components/Skeleton"

const RegisterPage = () => {
  const { register: registerMutation } = useAuth()
  const navigate = useNavigate()
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirm_password: ""
    }
  })

  const onSubmit = (data: RegisterFormValues) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        navigate('/login')
      },
    })
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-8 text-center">
        <h3 className="font-semibold text-2xl text-gray-800">
          Lengkapi data untuk membuat akun
        </h3>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" hidden>Email</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              @
            </span>
            <input 
              {...register("email")}
              id="email" 
              type="email" 
              placeholder="masukan email anda" 
              className={`w-full h-11 pl-10 pr-4 text-sm font-medium border rounded transition-all duration-200 outline-none
                ${errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-red-600 focus:ring-1 focus:ring-red-600'}`}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1 text-left font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="firstName" hidden>Nama Depan</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-lg">
              👤
            </span>
            <input 
              {...register("first_name")}
              id="first_name" 
              type="text" 
              placeholder="nama depan" 
              className={`w-full h-11 pl-10 pr-4 text-sm font-medium border rounded transition-all duration-200 outline-none
                ${errors.first_name ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-red-600 focus:ring-1 focus:ring-red-600'}`}
            />
          </div>
          {errors.first_name && (
            <p className="text-red-500 text-xs mt-1 text-left font-medium">
              {errors.first_name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="lastName" hidden>Nama Belakang</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-lg">
              👤
            </span>
            <input 
              {...register("last_name")}
              id="last_name" 
              type="text" 
              placeholder="nama belakang" 
              className={`w-full h-11 pl-10 pr-4 text-sm font-medium border rounded transition-all duration-200 outline-none
                ${errors.last_name ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-red-600 focus:ring-1 focus:ring-red-600'}`}
            />
          </div>
          {errors.last_name && (
            <p className="text-red-500 text-xs mt-1 text-left font-medium">
              {errors.last_name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" hidden>Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-lg">
              🔒
            </span>
            <input 
              {...register("password")}
              id="password" 
              type="password" 
              placeholder="buat password" 
              className={`w-full h-11 pl-10 pr-4 text-sm font-medium border rounded transition-all duration-200 outline-none
                ${errors.password ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-red-600 focus:ring-1 focus:ring-red-600'}`}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 text-left font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" hidden>Konfirmasi Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-lg">
              🔒
            </span>
            <input 
              {...register("confirm_password")}
              id="confirm_password" 
              type="password" 
              placeholder="konfirmasi password" 
              className={`w-full h-11 pl-10 pr-4 text-sm font-medium border rounded transition-all duration-200 outline-none
                ${errors.confirm_password ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-red-600 focus:ring-1 focus:ring-red-600'}`}
            />
          </div>
          {errors.confirm_password && (
            <p className="text-red-500 text-xs mt-1 text-left font-medium">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        {registerMutation.isError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm font-medium text-center">
            {registerMutation.error?.response?.data?.message || "Terjadi kesalahan saat registrasi"}
          </div>
        )}

        <div className="mt-4 w-full">
          <button 
            type="submit" 
            disabled={registerMutation.isPending}
            className={`w-full h-12 px-2 inline-flex items-center justify-center font-semibold text-white bg-red-600 hover:bg-red-700 rounded shadow-sm transition-all duration-200
              ${registerMutation.isPending ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.98]'}`}
          >
            {registerMutation.isPending ? <LoadingSkeleton /> : "Registrasi"}
          </button>
        </div>
      </form>

      <div className="text-center mt-8">
        <p className="text-gray-600">
          Sudah punya akun? login{" "}
          <Link to="/login" className="font-bold text-red-600 hover:text-red-700 hover:underline underline-offset-4">
            di sini
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage