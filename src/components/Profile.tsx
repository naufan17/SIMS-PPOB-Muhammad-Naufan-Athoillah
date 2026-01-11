import useProfile from "@/api/profile"

const Profile = () => {
  const { getProfile } = useProfile()
  const profile = getProfile.data?.data

  if (getProfile.isLoading) {
    return (
      <div className="w-full flex flex-col gap-4 animate-pulse">
        <div className="w-24 h-24 rounded-full bg-gray-200"></div>
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
          <div className="h-6 w-48 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
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