import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import VerifyOtpForm from "./VerifyOtpForm";


const VerifyEmailScreen = () => {
  const [isVerified, setIsVerified] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get userId and email from location state or redirect
  const { userId, email } = location.state || {};

  useEffect(() => {
    if (!userId || !email) {
      navigate("/register");
    }
  }, [userId, email, navigate]);

  if (!userId || !email) {
    return null; // Or a loading spinner while redirect happens
  }

  if (isVerified) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="flex justify-center mb-6">
            <MdVerified className="text-6xl text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Email Verified Successfully!
          </h2>
          <p className="text-gray-600 mb-6">
            Your email has been verified. You can now login to your account.
          </p>
          <p className="text-gray-500 mt-6">
            Redirecting to login page...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <VerifyOtpForm
        userId={userId}
        email={email}
        onVerificationSuccess={() => {
          setIsVerified(true);
          setTimeout(() => {
            navigate("/login", {
              state: { message: "Email verified successfully! Please login." },
            });
          }, 2000);
        }}
        onBackToRegister={() => navigate("/register")}
      />
    </div>
  );
};

export default VerifyEmailScreen;