import useProfile from "@/api/profile"
import { ProfileSkeleton } from "./Skeleton"

const Profile = () => {
  const { getProfile } = useProfile()
  const profile = getProfile.data?.data

  if (getProfile.isLoading) {
    return <ProfileSkeleton />
  }

  return (
    <div className="w-full flex flex-col gap-4">
      <img 
        src={profile?.profile_image && !profile.profile_image.includes('default') ? profile.profile_image : "https://minio.nutech-integrasi.com/take-home-test/profile/default.png"} 
        alt="Profile"
        className="w-20 h-20 rounded-full object-cover border-2 border-gray-100"
      />
      <div className="flex flex-col">
        <h5 className="text-gray-500 text-lg">
          Selamat datang,
        </h5>
        <h3 className="font-bold text-2xl text-gray-800">
          {profile?.first_name} {profile?.last_name}
        </h3>
      </div>
    </div>
  )
}

export default Profile