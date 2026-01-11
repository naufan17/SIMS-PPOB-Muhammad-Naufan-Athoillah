import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import useAuth from "@/api/auth"
import { registerSchema, type RegisterFormValues } from "@/schemas/auth"

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
            {registerMutation.isPending ? (
              <svg className="inline w-7 h-7 text-slate-200 animate-spin dark:text-slate-300 fill-slate-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            ) : "Registrasi"}
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