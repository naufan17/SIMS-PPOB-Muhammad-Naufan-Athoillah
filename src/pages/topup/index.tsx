import { useState, type ReactNode } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import Profile from "@/components/Profile"
import Balance from "@/components/Balance"
import useTransaction from "@/api/transaction"
import Modal from "@/components/Modal"
import { formatCurrency } from "@/utils/format"
import { topUpSchema, type TopUpFormValues } from "@/schemas/transaction"
import { LoadingSkeleton } from "@/components/Skeleton"

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
              {formatCurrency(data.amount)}
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
    <div className="w-full flex flex-col gap-12 p-6 lg:p-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
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
                className={`w-full h-12 inline-flex items-center justify-center font-semibold text-white  rounded shadow-sm transition-all duration-200
                  ${(!isValid || createTopUp.isPending) ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 active:scale-[0.98]'}`}
              >
                {createTopUp.isPending ? <LoadingSkeleton /> : "Top Up"}
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
                {formatCurrency(amount)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopUpPage