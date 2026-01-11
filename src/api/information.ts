import axiosInstance from "@/libs/axiosInstance"
import { useQuery } from "@tanstack/react-query"
import type { ApiResponse } from "./auth";

export interface BannerData {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface ServiceData {
  service_code: string;
  service_name: string;
  service_icon: string
  service_tariff: number;
}

const useInformation = () => {
  const getBanner = useQuery<ApiResponse<BannerData[]>>({
    queryKey: ["banner"],
    queryFn: async () => {
     const response = await axiosInstance.get("/banner")
     return response.data 
    }
  })

  const getServices = useQuery<ApiResponse<ServiceData[]>>({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await axiosInstance.get("/services")
      return response.data
    }
  })

  return {
    getBanner,
    getServices
  }
}

export default useInformation
