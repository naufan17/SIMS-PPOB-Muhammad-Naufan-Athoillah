import { useMutation, useQuery } from "@tanstack/react-query"
import axiosInstance from "@/libs/axiosInstance"

const useTransaction = () => {  
  const getBalance = useQuery({
    queryKey: ["balance"],
    queryFn: async () => {
      const response = await axiosInstance.get("/balance")
      return response.data
    },
  })

  const createTopUp = useMutation({
    mutationFn: async (payload: {
      top_up_amount: string;
    }) => {
      const response = await axiosInstance.post("/topup", payload)
      return response.data
    },
  })

  const createTransaction = useMutation({
    mutationFn: async (payload: {
      service_code: string;
    }) => {
      const response = await axiosInstance.post("/transaction", payload)
      return response.data
    },
  })

  const getTransactionHistory = useQuery({
    queryKey: ["transaction-history"],
    queryFn: async () => {
      const response = await axiosInstance.get("/transaction/history")
      return response.data
    },
  })

  return {
    getBalance,
    createTopUp,
    createTransaction,
    getTransactionHistory,
  }
}

export default useTransaction;
