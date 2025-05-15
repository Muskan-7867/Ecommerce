import { useEffect, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Lottie from "lottie-react";
import LoginAnimation from "../../../public/animations/animation.json";
import ScreenHandler from "../../components/wrappers/ScreenHandler";
import SuccessMessage from "../../components/common/SuccessMessage";
import { loginUser } from "../../services/authServices";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useCurrentUserStore from "../../store/User/user.store";

const Login = () => {
  const { reFetch } = useCurrentUserStore();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string
    };

    try {
      const data = await loginUser(userData);
      setSuccessMessage("Login successful! Redirecting...");

      if (data.token) {

        Cookies.set("authToken", data.token);

      }
      reFetch();
     navigate("/")

    } catch (error) {
      console.error("Login error:", error);
      alert(error instanceof Error ? error.message : "Login failed");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <ScreenHandler>
      <div className="min-h-screen flex justify-center items-center ">
        <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white  flex flex-col md:flex-row relative">
          {/* Success message  */}
          {successMessage && <SuccessMessage successMessage={successMessage} />}

          {/* Left panel with Lottie animation */}
          <div className="hidden md:block md:w-1/2 bg-red-50 rounded-l-lg p-8 lg:flex items-center justify-center">
            <div className="text-black text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
            
              <p className="mb-6">
                Login to access your account and continue your journey with us.
              </p>
              <div className="w-62 h-54 rounded-md flex justify-center items-center mx-auto ">
                <Lottie animationData={LoginAnimation} loop={true} />
              </div>
            </div>
          </div>

          {/* Login form */}
          <div className="w-full md:w-1/2 p-8 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
              <FaUserAlt className="text-gray-500 text-3xl" />
            </div>
            <h3 className="text-primary text-2xl font-semibold mb-8">
              WELCOME
            </h3>

            <form onSubmit={handleLogin} className="w-full space-y-6">
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
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input type="checkbox" id="remember" className="mr-2" />
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? <>Processing...</> : "Login"}
              </button>
            </form>
       
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="text-primary hover:underline">
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScreenHandler>
  );
};

export default Login;
