import { useState, type ReactNode } from "react"
import { useParams, useNavigate } from "react-router-dom"

import Profile from "@/components/Profile"
import Balance from "@/components/Balance"
import useInformation from "@/api/information"
import useTransaction from "@/api/transaction"
import Modal from "@/components/Modal"
import { formatCurrency } from "@/utils/format"
import { LoadingSkeleton } from "@/components/Skeleton"

const ServicePage = () => {
  const { serviceCode } = useParams()
  const { getServices } = useInformation()
  const { createTransaction } = useTransaction()
  const navigate = useNavigate()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'success' | 'error' | 'confirm'>('confirm')
  const [modalMessage, setModalMessage] = useState<ReactNode>('')

  const service = getServices.data?.data?.find(s => s.service_code === serviceCode)

  if (getServices.isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-20 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Layanan tidak ditemukan
        </h2>
        <button 
          onClick={() => navigate('/')}
          className="text-red-600 font-bold hover:underline"
        >
          Kembali ke Beranda
        </button>
      </div>
    )
  }

  const handlePaymentClick = () => {
    setModalType('confirm')
    setModalMessage(
      <div className="flex flex-col gap-1">
        <span>Beli {service.service_name} senilai</span>
        <span className="text-xl font-bold text-gray-900">
          {formatCurrency(service.service_tariff)} ?
        </span>
      </div>
    )
    setIsModalOpen(true)
  }

  const handleConfirmPayment = () => {
    createTransaction.mutate({ service_code: service.service_code }, {
      onSuccess: () => {
        setModalType('success')
        setModalMessage(
          <div className="flex flex-col gap-1">
            <span>Pembayaran {service.service_name} senilai</span>
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(service.service_tariff)}
            </span>
            <span>berhasil!</span>
          </div>
        )
      },
      onError: (error) => {
        setModalType('error')
        setModalMessage(
          <div className="flex flex-col gap-1">
            <span>Pembayaran {service.service_name} senilai</span>
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(service.service_tariff)}
            </span>
            <span> {error?.response?.data?.message || "Gagal!"} </span>
          </div>
        )
      }
    })
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

      {/* Service Detail Section */}
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h5 className="text-lg font-medium text-gray-500">
            Pembayaran
          </h5>
          <div className="flex items-center gap-3">
            <img src={service.service_icon} alt={service.service_name} className="w-8 h-8 object-contain" />
            <h3 className="text-2xl font-bold text-gray-800">
              {service.service_name}
            </h3>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2 relative">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-lg">
                💵
              </span>
              <input 
                type="text" 
                readOnly
                value={formatCurrency(service.service_tariff)}
                className="w-full h-12 pl-12 pr-4 text-sm font-medium border border-gray-300 rounded bg-gray-50 outline-none"
              />
            </div>
          </div>

          <button 
            onClick={handlePaymentClick}
            disabled={createTransaction.isPending}
            className={`w-full h-12 inline-flex items-center justify-center font-semibold text-white bg-red-600 hover:bg-red-700 rounded shadow-sm transition-all duration-200
              ${createTransaction.isPending ? 'bg-gray-300 cursor-not-allowed' : 'active:scale-[0.98]'}`}
          >
            {createTransaction.isPending ? <LoadingSkeleton /> : "Bayar"}
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          if (modalType === 'success') navigate('/')
        }}
        showCloseButton={modalType !== 'confirm'}
        status={modalType === 'confirm' ? 'info' : modalType}
        title={
          modalType === 'confirm' ? '' : 
          modalType === 'success' ? 'Pembayaran Berhasil' : 'Pembayaran Gagal'
        }
        icon={
          modalType === 'success' ? (
            <div className="bg-green-500 rounded-full p-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : modalType === 'error' ? (
            <div className="bg-red-500 rounded-full p-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          ) : (
            <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center text-white text-3xl font-bold">
              !
            </div>
          )
        }
      >
        <div className="flex flex-col gap-6 items-center w-full">
          {modalMessage}
          {modalType === 'confirm' && (
            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={handleConfirmPayment}
                className="text-red-600 font-bold hover:text-red-700 transition-all text-lg"
              >
                Ya, lanjutkan Bayar
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 font-bold hover:text-gray-600 transition-all text-lg"
              >
                Batalkan
              </button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  )
}

export default ServicePage
