import { useState } from "react";
import Profile from "@/components/Profile";
import Balance from "@/components/Balance";
import useTransaction from "@/api/transaction";
import { formatDate, formatCurrency } from "@/utils/format";

const TransactionPage = () => {
  const [limit, setLimit] = useState(5);
  const { useTransactionHistory } = useTransaction();
  const { data, isLoading } = useTransactionHistory({ offset: 0, limit });

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

      {/* Transaction history */}
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-bold text-gray-800">
            Semua Transaksi
          </h4>
        </div>

        <div className="flex flex-col gap-6">
          {isLoading && (
            <div className="flex flex-col gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-full h-24 bg-gray-100 animate-pulse rounded-xl" />
              ))}
            </div>
          )}

          {!isLoading && data?.data?.records && data.data.records.length > 0 ? (
            <>
              {data.data.records.map((item) => (
                <div 
                  key={item.invoice_number}
                  className="w-full p-5 border border-gray-200 rounded-xl flex flex-col gap-2 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-xl font-bold ${item.transaction_type === 'TOPUP' ? 'text-green-500' : 'text-red-500'}`}>
                      {formatCurrency(item.total_amount, item.transaction_type === 'TOPUP' ? '+ ' : '- ')}
                    </span>
                    <span className="text-gray-400 text-xs font-medium">
                      {item.description}
                    </span>
                  </div>
                  <span className="text-gray-400 text-xs font-medium">
                    {formatDate(item.created_on)}
                  </span>
                </div>
              ))}
              
              <div className="flex justify-center mt-4">
                {data.data.records.length === limit && (
                  <button 
                    onClick={() => setLimit(prev => prev + 5)}
                    className="text-red-600 font-bold hover:text-red-700 transition-colors text-sm py-2 px-4"
                  >
                    Show More
                  </button>
                )}
              </div>
            </>
          ) : !isLoading && (
            <div className="w-full py-20 text-center text-gray-500 font-medium">
              Maaf tidak ada histori transaksi saat ini
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;