import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import useAuth from "@/api/auth"
import type { AppDispatch } from "@/store/store"
import { loginSchema, type LoginFormValues } from "@/schemas/auth"
import { setCredentials } from "@/store/slices/authSlice"
import { LoadingSkeleton } from "@/components/Skeleton"

const LoginPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (data: LoginFormValues) => {
    login.mutate(data, {
      onSuccess: (response) => {
        dispatch(setCredentials({ token: response.data?.token }))
      },
    })
  }

  return (
    <div className="flex flex-col justify-center">
      <div className="mb-8 text-center">
        <h3 className="font-semibold text-2xl text-gray-800">
          Masuk atau buat akun untuk memulai
        </h3>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
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
              className={`w-full h-12 pl-10 pr-4 text-sm font-medium border rounded transition-all duration-200 outline-none
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
          <label htmlFor="password" hidden>Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-lg">
              🔒
            </span>
            <input 
              {...register("password")}
              id="password" 
              type="password" 
              placeholder="masukan password anda" 
              className={`w-full h-12 pl-10 pr-4 text-sm font-medium border rounded transition-all duration-200 outline-none
                ${errors.password ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-red-600 focus:ring-1 focus:ring-red-600'}`}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1 text-left font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {login.isError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm font-medium text-center">
            {login.error?.response?.data?.message || "Terjadi kesalahan saat masuk"}
          </div>
        )}

        <div className="mt-4">
          <button 
            type="submit" 
            disabled={login.isPending}
            className={`w-full h-12 px-2 inline-flex items-center justify-center font-semibold text-white bg-red-600 hover:bg-red-700 rounded shadow-sm transition-all duration-200
              ${login.isPending ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.98]'}`}
          >
            {login.isPending ? <LoadingSkeleton /> : "Masuk"}
          </button>
        </div>
      </form>

      <div className="text-center mt-8">
        <p className="text-gray-600">
          Belum punya akun? registrasi{" "}
          <Link to="/register" className="font-bold text-red-600 hover:text-red-700 hover:underline underline-offset-4">
            di sini
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage