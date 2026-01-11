import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import axiosInstance from "@/libs/axiosInstance"
import type { ApiResponse } from "./auth";

export interface BalanceData {
  balance: number;
}

export interface TransactionItem {
  invoice_number: string;
  transaction_type: 'TOPUP' | 'PAYMENT';
  description: string;
  total_amount: number;
  created_on: string;
}

export interface TransactionHistoryData {
  offset: number;
  limit: number;
  records: TransactionItem[];
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

  const useTransactionHistory = (params?: { offset?: number; limit?: number }) => {
    return useQuery<ApiResponse<TransactionHistoryData>>({
      queryKey: ["transaction-history", params],
      queryFn: async () => {
        const response = await axiosInstance.get("/transaction/history", { params })
        return response.data
      },
    })
  }

  return {
    getBalance,
    createTopUp,
    createTransaction,
    useTransactionHistory,
  }
}

export default useTransaction;
