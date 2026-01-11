import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { useState, type ReactNode } from "react"
import Profile from "@/components/Profile"
import Balance from "@/components/Balance"
import useTransaction from "@/api/transaction"
import Modal from "@/components/Modal"

const topUpSchema = z.object({
  amount: z.number({ error: "Nominal harus berupa angka" })
    .min(10000, "Minimal Top Up adalah Rp 10.000")
    .max(1000000, "Maksimal Top Up adalah Rp 1.000.000"),
})

type TopUpFormValues = z.infer<typeof topUpSchema>

const PREDEFINED_AMOUNTS = [10000, 20000, 50000, 100000, 250000, 500000]

const TopUpPage = () => {
  const { createTopUp } = useTransaction()
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid }
  } = useForm<TopUpFormValues>({
    resolver: zodResolver(topUpSchema),
    mode: "onChange"
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'success' | 'error'>('success')
  const [modalMessage, setModalMessage] = useState<ReactNode>('')

  const currentAmount = watch("amount")

  const onSubmit = (data: TopUpFormValues) => {
    createTopUp.mutate({ top_up_amount: data.amount }, {
      onSuccess: () => {
        setModalType('success')
        setModalMessage(
          <div className="flex flex-col gap-1">
            <span>Top Up sebesar</span>
            <span className="text-xl font-bold text-gray-900">
              Rp {data.amount.toLocaleString('id-ID')}
            </span>
            <span>berhasil!</span>
          </div>
        )
        setIsModalOpen(true)
        reset({ amount: 0 })
      },
      onError: (error) => {
        setModalType('error')
        setModalMessage(error?.response?.data?.message || "Gagal melakukan Top Up")
        setIsModalOpen(true)
      }
    })
  }

  const handlePredefinedClick = (amount: number) => {
    setValue("amount", amount, { shouldValidate: true })
  }

  return (
    <div className="w-full flex flex-col gap-12 p-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
      {/* Profile & Balance Section */}
      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/5">
          <Profile />
        </div>
        <div className="lg:w-3/5">
          <Balance />
        </div>
      </div>

      {/* Top Up Form Section */}
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h5 className="text-lg font-medium text-gray-500">
            Silakan masukan
          </h5>
          <h3 className="text-2xl font-bold text-gray-800">
            Nominal Top Up
          </h3>
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 relative">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-lg">
                    💵
                  </span>
                  <input 
                    {...register("amount", { valueAsNumber: true })}
                    type="number" 
                    placeholder="masukan nominal Top Up" 
                    className={`w-full h-12 pl-12 pr-4 text-sm font-medium border rounded transition-all duration-200 outline-none
                      ${errors.amount ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:border-red-600 focus:ring-1 focus:ring-red-600'}`}
                  />
                </div>
                {errors.amount && (
                  <p className="text-red-500 text-xs font-medium">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={!isValid || createTopUp.isPending}
                className={`w-full h-12 inline-flex items-center justify-center font-semibold text-white bg-red-600 hover:bg-red-700 rounded shadow-sm transition-all duration-200
                  ${(!isValid || createTopUp.isPending) ? 'bg-gray-300 cursor-not-allowed' : 'active:scale-[0.98]'}`}
              >
                {createTopUp.isPending ? (
                  <svg className="inline w-7 h-7 text-slate-200 animate-spin dark:text-slate-300 fill-slate-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                ) : "Top Up"}
              </button>
            </form>

            {createTopUp.isError && !isModalOpen && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-medium text-center shadow-sm">
                {createTopUp.error?.response?.data?.message || "Gagal melakukan Top Up"}
              </div>
            )}

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              status={modalType}
              title={modalType === 'success' ? 'Top Up Berhasil' : 'Top Up Gagal'}
              icon={
                modalType === 'success' ? (
                  <div className="bg-green-500 rounded-full p-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="bg-red-500 rounded-full p-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                )
              }
            >
              {modalMessage}
            </Modal>
          </div>

          {/* Predefined Nominal Sidebar */}
          <div className="lg:col-span-1 grid grid-cols-3 gap-4 h-fit">
            {PREDEFINED_AMOUNTS.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handlePredefinedClick(amount)}
                className={`py-3 px-2 border rounded text-sm font-medium transition-all duration-200
                  ${currentAmount === amount ? 'border-red-600 bg-red-50 text-red-600' : 'border-gray-300 text-gray-700 hover:border-red-500 hover:bg-red-50'}`}
              >
                Rp {amount.toLocaleString('id-ID')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopUpPage