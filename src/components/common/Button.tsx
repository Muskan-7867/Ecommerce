import { Link } from "react-router-dom";
const Button = () => {
  return (
    <button className="bg-primary px-2 lg:px-4 py-2 relative rounded-sm lg:w-24 md:w-22 sm:w-18 group overflow-hidden">
      <Link to="/products" className=" text-white">
        View All
      </Link>
      <div className="absolute   left-0 -top-16 w-12 h-[12rem] bg-gradient-to-r from-transparent via-white/20 to-transparent  -translate-x-16 -rotate-45 group-hover:translate-x-[10rem] transition-all duration-500" />
    </button>
  );
};

export default Button;
