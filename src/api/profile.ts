import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/libs/axiosInstance";
import type { ApiResponse } from "./auth";
import { AxiosError } from "axios";

export interface ProfileData {
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
}

const useProfile = () => {
  const queryClient = useQueryClient();

  const getProfile = useQuery<ApiResponse<ProfileData>>({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await axiosInstance.get('/profile')
      return response.data
    },
  })

  const updateProfile = useMutation<ApiResponse<ProfileData>, AxiosError<ApiResponse>, {
    first_name: string;
    last_name: string;
  }>({
    mutationFn: async (payload: { 
      first_name: string;
      last_name: string;
    }) => {
      const response = await axiosInstance.put('/profile/update', payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })

  const updateImage = useMutation<ApiResponse<ProfileData>, AxiosError<ApiResponse>, File>({
    mutationFn: async (file: File) => {
      const formData = new FormData()
      formData.append('file', file)
      const response = await axiosInstance.put('/profile/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    }
  })

  return {
    getProfile,
    updateProfile,
    updateImage,
  }
}

export default useProfile
