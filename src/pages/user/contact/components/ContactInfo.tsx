import { IoIosMail } from "react-icons/io";
import { MdLocalPhone, MdLocationOn } from "react-icons/md";
import { BsClock } from "react-icons/bs";

const ContactInfo = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Contact Info */}
      <div className=" p-6 md:p-8 rounded-lg  mt-10">
        <h1 className="text-2xl md:text-3xl text-center font-bold  text-gray-800 mb-2">
          Contact Information
        </h1>

        <div className="space-y-2">
          <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
            <div className="bg-primary/10 p-3 rounded-full">
              <MdLocationOn className="text-primary" size={18} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Our Location</h4>
              <p className="text-sm text-gray-600 mt-1">
             23-A, near Lal Chand Shoe Maker, 
             <br />
              Prakash Nagar, Shankar Garden Colony, <br /> Model Town, Jalandhar, Punjab 144003
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
            <div className="bg-primary/10 p-3 rounded-full">
              <MdLocalPhone className="text-primary" size={18} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Phone Number</h4>
              <a
               
                className="text-sm text-gray-600 hover:text-primary transition mt-1 block"
              >
                09872144408
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
            <div className="bg-primary/10 p-3 rounded-full">
              <IoIosMail className="text-primary" size={18} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Email Address</h4>
              <a
                href="mailto:omegbazaar@gmail.com"
                className="text-sm text-gray-600 hover:text-primary transition mt-1 block"
              >
                omegbazaar@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
            <div className="bg-primary/10 p-3 rounded-full">
              <BsClock className="text-primary" size={18} />
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Working Hours</h4>
              <p className="text-sm text-gray-600 mt-1">
                Mon-Sat: 9:30 AM - 6:30 PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
