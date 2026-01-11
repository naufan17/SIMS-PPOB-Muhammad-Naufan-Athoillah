import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "@/libs/axiosInstance"
import type { ApiResponse } from "./auth";
import { AxiosError } from "axios";

export interface BalanceData {
  balance: number;
}

const useTransaction = () => {  
  const queryClient = useQueryClient();

  const getBalance = useQuery<ApiResponse<BalanceData>>({
    queryKey: ["balance"],
    queryFn: async () => {
      const response = await axiosInstance.get("/balance")
      return response.data
    },
  })

  const createTopUp = useMutation<ApiResponse<BalanceData>, AxiosError<ApiResponse>, {
    top_up_amount: number;
  }>({
    mutationFn: async (payload: {
      top_up_amount: number;
    }) => {
      const response = await axiosInstance.post("/topup", payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] })
    }
  })

  const createTransaction = useMutation<ApiResponse<unknown>, AxiosError<ApiResponse>, {
    service_code: string;
  }>({
    mutationFn: async (payload: {
      service_code: string;
    }) => {
      const response = await axiosInstance.post("/transaction", payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["balance"] })
      queryClient.invalidateQueries({ queryKey: ["transaction-history"] })
    }
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
