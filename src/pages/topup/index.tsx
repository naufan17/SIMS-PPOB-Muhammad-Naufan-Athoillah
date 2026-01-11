import Profile from "@/components/Profile";
import Balance from "@/components/Balance";

const TopUpPage = () => {
  return (
    <div className="w-full flex flex-col gap-12 justify-center items-center p-8 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
      <div className="w-full flex flex-col sm:flex-row gap-6">
        <Profile />
        <Balance />
      </div>
    </div>
  )
}

export default TopUpPage;