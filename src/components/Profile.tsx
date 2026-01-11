import useProfile from "@/api/profile"

const Profile = () => {
  const { getProfile } = useProfile()

  return (
    <div className="w-full flex flex-col gap-4">
      <img 
        src={getProfile.data?.data.profile_image && !getProfile.data?.data.profile_image.includes('default') ? getProfile.data?.data.profile_image : "https://minio.nutech-integrasi.com/take-home-test/profile/default.png"} 
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover"
      />
      <div className="flex flex-col gap-1">
        <h5>
          Selamat datang,
        </h5>
        <h3 className="font-semibold text-xl">
          {getProfile.data?.data.first_name} {getProfile.data?.data.last_name}
        </h3>
      </div>
    </div>
  )
}

export default Profile