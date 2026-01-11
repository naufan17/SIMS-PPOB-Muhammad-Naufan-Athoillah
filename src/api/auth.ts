import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/hooks/redux";
import { setCredentials } from "@/store/slices/authSlice";

import axiosInstance from "@/libs/axiosInstance";

export interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data: T;
}

export interface LoginData {
  token: string;
}

const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = useMutation<ApiResponse<LoginData>, AxiosError<ApiResponse>, { 
    email: string; 
    password: string 
  }>({
    mutationFn: async (payload: { 
      email: string; 
      password: string 
    }) => {
      const response = await axiosInstance.post('/login', payload);
      return response.data;
    },
    onSuccess: (response) => {
      if (response.data?.token) {
        dispatch(setCredentials({ token: response.data.token }));
        navigate('/');
      }
    }
  })

  const register = useMutation<ApiResponse<unknown>, AxiosError<ApiResponse>, { 
    email: string; 
    first_name: string; 
    last_name: string; 
    password: string 
  }>({
    mutationFn: async (payload: { 
      email: string; 
      first_name: string;
      last_name: string;
      password: string 
    }) => {
      const response = await axiosInstance.post('/registration', payload);
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data)
    }
  })

  return {
    login,
    register,
  }
}

export default useAuth;
