import BeautyProducts from "../products/BeautyProducts/BeautyProducts";
import CategorySection from "./components/CategorySection";
import Count from "./components/Count";
import ElectronicsProducts from "../products/ElectronicsProducts/ElectronicsProducts";
import Hero from "./components/Hero";
import HeroSection from "./components/HeroSection";
import KitchenProducts from "../products/KitchenProducts/KitchenProducts";
import React, { useEffect } from "react";
// import useCurrentUserStore from "../../../store/User/user.store";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { fetchCurrentUser } from "../../../services/fetchers";
import Cookies from "js-cookie";
import { CurrentUser } from "../../../types/auth";
import OurApp from "./components/OurApp";

 const Home: React.FC = () => {
  const { currentUserFromStore, allocateCurrentUser} = useCurrentUser();


  useEffect(() => {
    console.log("in home.tsx", Cookies.get("authToken"));
    const fetchUser = async () => {
      const user = await fetchCurrentUser(Cookies.get("authToken"));
      allocateCurrentUser(user as CurrentUser);
      console.log(user);
    };
    fetchUser();

    if (currentUserFromStore) {
      console.log(currentUserFromStore);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen  ">
        <Hero />
        <HeroSection />

        <CategorySection />
        <BeautyProducts />
        <ElectronicsProducts />
        <KitchenProducts />
        <Count from={0} to={50} duration={3} />
        <OurApp />
      </div>
    </>
  );
};

export default Home;
