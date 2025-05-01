import Lottie from "lottie-react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import LoginAnimation from "../../../public/animations/animation.json";
import { useEffect, useState } from "react";
import { registerUser } from "../../services/authServices";
import SuccessMessage from "../../components/common/SuccessMessage";
import { MdLocalPhone} from "react-icons/md";
import { Link } from "react-router-dom";

const Register = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    const userData = {
      contact: formData.get("contact") as string,
      username: formData.get("username") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string
    };

    try {
      const data = await registerUser(userData);
      setSuccessMessage("User registered successfully! Redirecting...");
      console.log("Registration successful:", data);

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

   useEffect(() => {
      window.scrollTo(0, 0);
    },[])
    
  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white flex flex-col md:flex-row">
        {/* Success message */}
        {successMessage && <SuccessMessage successMessage={successMessage} />}
        <div className="hidden md:block md:w-1/2 bg-red-50 rounded-l-lg p-8 lg:flex items-center justify-center">
          <div className="text-black text-center">
            <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
            <p className="mb-6">
              Create your account and continue your journey with us.
            </p>
            <div className="w-62 h-54 rounded-md flex justify-center items-center mx-auto">
              <Lottie animationData={LoginAnimation} loop={true} />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-8 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <FaUserAlt className="text-gray-500 text-3xl" />
          </div>
          <h3 className="text-primary text-2xl font-semibold mb-8">WELCOME</h3>

          <form onSubmit={handleRegister} className="w-full space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUserAlt className="text-gray-400" />
              </div>
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-2 border-b-2 border-primary focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdLocalPhone className="text-gray-400" size={20} />
              </div>
              <input
                name="contact"
                type="number"
                placeholder="Contact"
                className="w-full pl-10 pr-4 py-2 border-b-2 border-primary focus:outline-none focus:border-primary"
                required
                minLength={6}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaUserAlt className="text-gray-400" />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 border-b-2 border-primary focus:outline-none focus:border-primary"
                required
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 border-b-2 border-primary focus:outline-none focus:border-primary"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary text-white font-medium py-2 px-4 rounded-md transition duration-300"
            >
              {isLoading ? <>Processing...</> : "Register"}
            </button>
          </form>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
