import { Link } from "react-router-dom"
import Logo from "@/assets/images/Logo.png"

const Header = () => {
  return (
    <div className="relative bg-white shadow-sm top-0 z-50">
      <div className="flex items-center justify-between mx-auto py-4 px-8 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} className="w-110" alt="Logo SIMS PPOB" />
          <h4 className="text-md font-semibold">
            SIMS PPOB
          </h4>
        </Link>
        <div>
          <ul className="flex gap-6">
            <li className="text-sm font-medium">
              <Link to="/top-up">Top Up</Link>
            </li>
            <li className="text-sm font-medium">
              <Link to="/transaction">Transaction</Link>
            </li>
            <li className="text-sm font-medium">
              <Link to="/account">Account</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
