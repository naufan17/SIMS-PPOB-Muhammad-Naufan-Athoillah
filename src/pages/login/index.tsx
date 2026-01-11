import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import useAuth from "@/api/auth"
import type { AppDispatch } from "@/store/store"
import { loginSchema, type LoginFormValues } from "@/schemas/auth"
import { setCredentials } from "@/store/slices/authSlice"

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
            {login.isPending ? (
              <svg className="inline w-7 h-7 text-slate-200 animate-spin dark:text-slate-300 fill-slate-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            ) : "Masuk"}
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