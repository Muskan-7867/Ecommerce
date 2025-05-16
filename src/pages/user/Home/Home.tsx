import BeautyProducts from "../products/BeautyProducts/BeautyProducts";
import CategorySection from "./components/CategorySection";
import Count from "./components/Count";
import ElectronicsProducts from "../products/ElectronicsProducts/ElectronicsProducts";
import Hero from "./components/Hero";
import HeroSection from "./components/HeroSection";
import KitchenProducts from "../products/KitchenProducts/KitchenProducts";
import { useEffect } from "react";
import useCurrentUserStore from "../../../store/User/user.store";

const Home = () => {
  const { reFetch } = useCurrentUserStore();

  useEffect(() => {
    reFetch();
  }, []);
  return (
    <div className="flex flex-col min-h-screen  ">
      <Hero />
      <HeroSection />

      <CategorySection />
      <BeautyProducts />
      <ElectronicsProducts />
      <KitchenProducts />
      <Count from={0} to={50} duration={3} />
    </div>
  );
};

export default Home;
