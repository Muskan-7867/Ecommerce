import { IoMenu } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
import NavLinks from "./NavLinks";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import useCartStore from "../../../store/Cart/Cart.store";
import useCurrentUser from "../../../hooks/useCurrentUser";
import ProfileDropdown from "./ProfileDropdown";
import { CurrentUser } from "../../../types/auth";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { cartCountValue } = useCartStore();
  const { currentUser , setCurrentUser} = useCurrentUser() as {
    currentUser: CurrentUser | null;
    setCurrentUser: (user: CurrentUser | null) => void;
    
  };
  
  useEffect(() => {
    const data = localStorage.getItem("productIds");
    const array = JSON.parse(data || "[]");
    setCartCount(array.length);
  }, [cartCountValue]);
  const getFirstLetter = (email: string) => email?.charAt(0).toUpperCase() || 'm';

  const handleLLogOut = () => {
    Cookies.remove("authToken");
    setCurrentUser(null);
    setIsDropdownVisible(false);

  };

  return (
    <div className="relative">
      <div
        className={`h-14 w-full flex justify-between items-center fixed top-0 left-0 right-0 z-[100] backdrop-blur-lg ${
          isHomePage ? "bg-primary text-white" : "bg-transparent text-primary"
        } md:px-12 px-4`}
      >
        <Link to="/" className="font-serif lg:text-3xl sm:text-2xl">
          OMEG BAZAAR
        </Link>

        <NavLinks />

        <div className="lg:gap-6 gap-4 flex ml-34 sm:ml-[24rem] md:ml-[32rem]">
          <button
            className="hover:opacity-80 transition-opacity relative"
            aria-label="Cart"
            onClick={() => navigate("/cart")}
          >
            <p className="bg-red-600 w-4 h-4 rounded-full flex justify-center items-center text-xs text-white absolute -top-1 left-4">
              {cartCount}
            </p>
            <BsCartPlus size={28} />
          </button>

          {currentUser ? (
            <button
              onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-primary font-semibold text-sm border border-primary"
              title="Profile"
              aria-label="User Profile"
            >
              {getFirstLetter(currentUser.email)}
            </button>
          ) : (
            <Link
              to="/login"
              className="hover:opacity-80 transition-opacity"
              aria-label="Login"
            >
              <FaUserPlus size={32} />
            </Link>
          )}
        </div>
        {currentUser && (
          <ProfileDropdown
            isDropdownVisible={isDropdownVisible}
            setIsDropdownVisible={setIsDropdownVisible}
            userEmail={currentUser.email}
            handleLogOut={handleLLogOut}
          />
        )}
        {/* Mobile menu button */}
        <button
          onClick={() => setIsCardVisible(true)}
          className="lg:hidden flex justify-center items-center text-color w-10 h-10 p-2 rounded-full hover:bg-gray-100"
          aria-label="Open Mobile Menu"
        >
          <IoMenu size={20} />
        </button>
      </div>

      <MobileMenu
        isCardVisible={isCardVisible}
        setIsCardVisible={setIsCardVisible}
      />
    </div>
  );
};

export default Navbar;
