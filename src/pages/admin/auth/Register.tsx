import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../../../components/common/admin/Input";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    gender: "",
    role: "",
    email: "",
    contactNo: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen  px-4 ">
      <div className="w-full max-w-[546px]  rounded-lg  sm:p-10">
        <h1 className="text-4xl font-semibold text-center text-primary mb-16">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <InputField
            type="text"
            id="Name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your Name"
            label="UserName"
          />
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

          <InputField
            type="contact"
            id="contact"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Contact Number"
            label="Contact Number"
          />

          <button
            type="submit"
            className="lg:w-[35rem] w-full text-[12px] bg-primary text-white py-[9.5px] px-[12px] rounded-full mt-2 transition"
          >
            Register
          </button>

          {/* Register Link */}
          <div className="flex justify-center space-x-2 mt-4">
            <p className="text-[16px] text-primary">Already have an account?</p>
            <Link to="/adminlogin" className="text-[16px] text-custom-red">
              Login Here
            </Link>
          </div>
        </form>
        {/* <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1 ">
              <label
                className="block text-[#122539] font-semibold text-[14px] mb-1"
                htmlFor="role"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                className="custom-placeholder text-sm shadow appearance-none border
                  border-primary rounded-full mb-4 w-[288px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-[#122539] font-semibold text-[14px] mb-1"
                htmlFor="role"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
                className="custom-placeholder text-sm shadow appearance-none border border-primary rounded-full
                mb-4 w-[288px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div className="flex-1 ">
            <label
              className="block text-[#122539] font-semibold text-[14px] mb-1"
              htmlFor="role"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email "
              className="custom-placeholder text-sm shadow appearance-none border
                  border-primary rounded-full mb-4 w-[595px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex-1 ">
            <label
              className="block text-[#122539] font-semibold text-[14px] mb-1"
              htmlFor="role"
            >
              Contact No.
            </label>
            <input
              type="number"
              id="contactno"
              value={formData.contactNo}
              onChange={handleChange}
              placeholder="Enter Contact No."
              className="custom-placeholder text-sm shadow appearance-none border
                 border-primary rounded-full mb-4 w-[595px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                className="block text-[#122539] font-semibold text-[14px] mb-1"
                htmlFor="role"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="custom-placeholder text-sm shadow appearance-none border border-primary rounded-full
                mb-4 w-[288px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex-1">
              <label
                className="block text-[#122539] font-semibold text-[14px] mb-1"
                htmlFor="role"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Enter Confirm Password"
                className="custom-placeholder text-sm shadow appearance-none border border-primary rounded-full
                mb-4 w-[288px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-[600px] text-[12px] bg-primary text-[#FFFFFF] py-[9.5px] px-[12px] rounded-full mt-6  transition"
          >
            REGISTER
          </button>
          <div className="flex justify-center mt-4">
            <p className="text-[16px] text-primary font-poppins">
              Already have an account?
            </p>
            <Link
              to="/adminlogin"
              className="text-[16px] font-poppins text-custom-red ml-2"
            >
              Login here
            </Link>
          </div>
        </form> */}
      </div>
    </div>
  );
};

export default Register;
