import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "@/libs/axiosInstance";

const useProfile = () => {
  const getProfile = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await axiosInstance.get('/profile')
      return response.data
    },
  })

  const updateProfile = useMutation({
    mutationFn: async (payload: { 
      email: string; 
      firstName: string;
      lastName: string;
      password: string 
    }) => await axiosInstance.put('/profile', payload),
    onSuccess: (data) => {
      console.log(data)
    }
  })

  return {
    getProfile,
    updateProfile,
  }
}

export default useProfile
