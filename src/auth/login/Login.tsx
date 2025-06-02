import { useEffect, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Lottie from "lottie-react";
import LoginAnimation from "../../../public/animations/animation.json";
import ScreenHandler from "../../components/wrappers/ScreenHandler";
import SuccessMessage from "../../components/common/SuccessMessage";
import { loginUser } from "../../services/authServices";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setErrorMessage(null);
    setShowPasswordHint(newPassword.length > 0);
  };

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string
    };

    // Basic frontend validation
    if (!validatePassword(userData.password)) {
      setErrorMessage("Invalid password format");
      setShowPasswordHint(true);
      setIsLoading(false);
      return;
    }

    try {
      const data = await loginUser(userData);
      setSuccessMessage("Login successful! Redirecting...");
      setErrorMessage(null);

      if (data.token) {
        Cookies.set("authToken", data.token);
      }

      // Check for redirect path from either location state or sessionStorage
      const locationState = location.state as { from?: string };
      const redirectPath =
        locationState?.from || sessionStorage.getItem("prevPath") || "/";

      // Clear the stored path if it exists
      if (sessionStorage.getItem("prevPath")) {
        sessionStorage.removeItem("prevPath");
      }
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setTimeout(() => navigate(redirectPath), 1000);
    } catch (error: any) {
      console.error("Login error:", error);
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";
      setErrorMessage(message);
      setShowPasswordHint(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScreenHandler>
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] bg-white flex flex-col md:flex-row relative  rounded-lg overflow-hidden">
          {/* Success message */}
          {successMessage && <SuccessMessage successMessage={successMessage} />}

          {/* Left panel with Lottie animation */}
          <div className="hidden md:block md:w-1/2 bg-red-50 p-8 lg:flex items-center justify-center">
            <div className="text-black text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
              <p className="mb-6">
                Login to access your account and continue your journey with us.
              </p>
              <div className="w-62 h-54 rounded-md flex justify-center items-center mx-auto">
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

            {/* Error messages */}
            {errorMessage && (
              <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleLogin} className="w-full space-y-4">
              {/* Email field */}
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

              {/* Password field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  className={`w-full pl-10 pr-4 py-2 border-b-2 ${
                    errorMessage ? "border-red-500" : "border-primary"
                  } focus:outline-none focus:border-primary`}
                  required
                  onChange={handlePasswordChange}
                  onFocus={() => setShowPasswordHint(true)}
                  onBlur={() =>
                    setShowPasswordHint(
                      errorMessage !== null || password.length > 0
                    )
                  }
                />
              </div>

              {/* Password requirements hint - shows when relevant */}
              {(showPasswordHint || errorMessage) && (
                <div
                  className={`w-full p-3 text-sm rounded ${
                    errorMessage
                      ? "bg-red-50 text-red-600"
                      : "bg-blue-50 text-gray-600"
                  }`}
                >
                  <p className="font-medium">Password must contain:</p>
                  <ul className="list-disc pl-5">
                    <li
                      className={password.length >= 8 ? "text-green-500" : ""}
                    >
                      At least 8 characters {password.length >= 8 && "✓"}
                    </li>
                    <li
                      className={/[A-Z]/.test(password) ? "text-green-500" : ""}
                    >
                      1 uppercase letter {/[A-Z]/.test(password) && "✓"}
                    </li>
                    <li
                      className={/[a-z]/.test(password) ? "text-green-500" : ""}
                    >
                      1 lowercase letter {/[a-z]/.test(password) && "✓"}
                    </li>
                    <li className={/\d/.test(password) ? "text-green-500" : ""}>
                      1 number {/\d/.test(password) && "✓"}
                    </li>
                    <li
                      className={
                        /[@$!%*?&#^+=]/.test(password) ? "text-green-500" : ""
                      }
                    >
                      1 special character (@$!%*?&#^+=){" "}
                      {/[@$!%*?&#^+=]/.test(password) && "✓"}
                    </li>
                  </ul>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition duration-300 flex justify-center items-center disabled:opacity-70"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Login"}
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
