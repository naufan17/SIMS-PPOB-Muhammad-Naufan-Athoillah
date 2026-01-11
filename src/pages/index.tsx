import { Link } from "react-router-dom";

import Profile from "@/components/Profile";
import Balance from "@/components/Balance";
import useInformation, { type BannerData, type ServiceData } from "@/api/information";
import { ServiceSkeleton, BannerSkeleton } from "@/components/Skeleton";

const IndexPage = () => {
  const { getServices, getBanner } = useInformation()

  const services = getServices.data?.data
  const banners = getBanner.data?.data

  return (
    <div className="w-full flex flex-col gap-12 p-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
      {/* Profile & Balance Section */}
      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/5">
          <Profile />
        </div>
        <div className="lg:w-3/5">
          <Balance />
        </div>
      </div>

      {/* Services Section */}
      <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4">
        {getServices.isLoading
          ? [...Array(12)].map((_, i) => <ServiceSkeleton key={i} />)
          : services?.map((service: ServiceData, index: number) => (
              <Link 
                to={`/service/${service.service_code}`}
                key={index} 
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className="w-14 h-14 p-2 bg-gray-50 rounded-xl group-hover:bg-red-50 transition-colors flex items-center justify-center">
                  <img 
                    src={service.service_icon} 
                    alt={service.service_name} 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <h2 className="text-[11px] font-medium text-center leading-tight transition-colors group-hover:text-red-600">
                  {service.service_name}
                </h2>
              </Link>
            ))}
      </div>

      {/* Banner Section */}
      <div className="w-full flex flex-col gap-4">
        <h5 className="text-lg font-bold text-gray-800">
          Temukan promo menarik
        </h5>
        <div className="w-full overflow-x-auto no-scrollbar flex flex-row gap-4 pb-4">
          {getBanner.isLoading
            ? [...Array(4)].map((_, i) => <BannerSkeleton key={i} />)
            : banners?.map((banner: BannerData, index: number) => (
                <div 
                  key={index} 
                  className="min-w-[270px] h-28 rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img 
                    src={banner.banner_image} 
                    alt={banner.banner_name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
              ))}
        </div>
      </div>  
    </div>
  )
}

export default IndexPage;