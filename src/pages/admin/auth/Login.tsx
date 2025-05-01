import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/common/admin/Input";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberme: false
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen  px-4">
      <div className="w-full max-w-[546px]  rounded-lg p-8 sm:p-10 ">
        {/* Heading */}
        <h1 className="text-4xl font-semibold text-center text-primary mb-4">
          Login
        </h1>
        <h2 className="text-xl text-center text-black font-semibold mb-8">
          Welcome back
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <InputField
            type="text"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email ID/Phone No."
            label="Email ID/Phone No."
          />

          <InputField
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            label="Password"
          />

          <div className="flex justify-start">
            <label className="flex items-center text-sm">
              <input
                type="checkbox"
                id="rememberme"
                checked={formData.rememberme}
                onChange={handleChange}
                className="border-primary border-2 mr-2"
              />
              <span className="text-[#1F4062] text-[16px]">Remember me</span>
            </label>
          </div>

          <div className="flex justify-end ">
            <Link to="#" className="text-[16px] ">
              Forgot Password?
            </Link>
          </div>
     
            <button
              type="submit"
              className="lg:w-[35rem] w-full text-[12px] bg-primary text-white py-[9.5px] px-[12px] rounded-full mt-2 transition"
            >
              LOGIN
            </button>
         
        

          {/* Register Link */}
          <div className="flex justify-center space-x-2 mt-4">
            <p className="text-[16px] text-primary">Don't have an account?</p>
            <Link to="/adminregister" className="text-[16px] text-custom-red">
              Register here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
