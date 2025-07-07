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
import Cookies from "js-cookie";
import { motion, useMotionValueEvent } from "framer-motion";
import { useScroll } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { cartCountValue } = useCartStore();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const { currentUserFromStore, allocateCurrentUser } = useCurrentUser();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous! && latest > 800) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const data = localStorage.getItem("productIds");
    const array = data ? JSON.parse(data) : [];
    setCartCount(array.length);
  }, [cartCountValue]);

  const getFirstLetter = (email: string | null | undefined) => {
    if (!email) return '';
    return email.charAt(0).toUpperCase();
  };

  const handleLogOut = () => {
    Cookies.remove("authToken");
    allocateCurrentUser(null);
    localStorage.removeItem("user");
    setIsDropdownVisible(false);
    navigate("/login");
  };

  const hasValidUser = currentUserFromStore?.email;

  return (
    <div className="relative">
      <motion.div
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`h-14 w-full flex justify-between items-center fixed top-0 left-0 right-0 z-[100] backdrop-blur-lg ${
          isHomePage ? "bg-primary text-white" : "bg-transparent text-primary"
        } px-4 sm:px-6 md:px-8 lg:px-12`}
      >
        {/* Logo/Brand */}
        <Link to="/" className="font-serif text-xl sm:text-2xl lg:text-3xl">
          OMEG BAZAAR
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex">
          <NavLinks />
        </div>

        {/* Right side icons with improved spacing */}
        <div className="flex items-center gap-3 xs:gap-4 sm:gap-5 md:gap-6">
          {/* Cart button */}
          <button
            className="hover:opacity-80 transition-opacity relative"
            aria-label="Cart"
            onClick={() => navigate("/cart")}
          >
            <p className="bg-red-600 w-4 h-4 rounded-full flex justify-center items-center text-xs text-white absolute -top-1 left-4">
              {cartCount}
            </p>
            <BsCartPlus className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          {hasValidUser ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white text-primary font-semibold text-sm border border-primary"
                title="Profile"
                aria-label="User Profile"
              >
                {getFirstLetter(currentUserFromStore.email)}
              </button>
              {isDropdownVisible && (
                <ProfileDropdown
                  isDropdownVisible={isDropdownVisible}
                  setIsDropdownVisible={setIsDropdownVisible}
                  userEmail={currentUserFromStore.email}
                  handleLogOut={handleLogOut}
                />
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:opacity-80 transition-opacity"
              aria-label="Login"
            >
              <FaUserPlus className="w-6 h-6 sm:w-7 sm:h-7" />
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            onClick={() => setIsCardVisible(true)}
            className="lg:hidden flex justify-center items-center text-color w-9 h-9 rounded-full hover:bg-white hover:text-primary"
            aria-label="Open Mobile Menu"
          >
            <IoMenu className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <MobileMenu
        isCardVisible={isCardVisible}
        setIsCardVisible={setIsCardVisible}
      />
    </div>
  );
};

export default Navbar;