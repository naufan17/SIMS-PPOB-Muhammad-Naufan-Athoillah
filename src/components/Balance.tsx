import { useState } from "react"
import useTransaction from "@/api/transaction"

const Balance = () => {
  const { getBalance } = useTransaction()
  const [showBalance, setShowBalance] = useState(false)

  const balance = getBalance.data?.data.balance ?? 0

  if (getBalance.isLoading) {
    return (
      <div className="w-full h-full p-6 bg-red-600 rounded-xl animate-pulse flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-4 w-20 bg-white/20 rounded"></div>
          <div className="h-9 w-48 bg-white/20 rounded mt-1"></div>
        </div>
        <div className="h-4 w-24 bg-white/20 rounded"></div>
      </div>
    )
  }

  return (
    <div className="w-full h-full p-6 bg-red-600 rounded-xl relative overflow-hidden">
      {/* Decorative Circle */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
      
      <div className="flex flex-col h-full justify-between relative z-10">
        <div className="flex flex-col gap-2">
          <span className="text-white text-sm font-medium opacity-90">
            Saldo anda
          </span>
          <h2 className="text-white text-3xl font-bold tracking-wide">
            Rp {showBalance ? balance.toLocaleString('id-ID') : "••••••••"}
          </h2>
        </div>

        <button 
          onClick={() => setShowBalance(!showBalance)}
          className="flex items-center gap-2 text-white/90 text-xs font-medium mt-4 hover:text-white transition-colors group"
        >
          {showBalance ? (
            <>
              Tutup Saldo
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
            </>
          ) : (
            <>
              Lihat Saldo
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default Balance
