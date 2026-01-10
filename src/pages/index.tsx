import Profile from "@/components/Profile";
import Balance from "@/components/Balance";

const IndexPage = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-12 justify-center items-center py-8 px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
      <Profile />
      <Balance />
    </div>
  )
}

export default IndexPage;