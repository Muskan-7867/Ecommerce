import { IoIosMail } from "react-icons/io";
import { MdLocalPhone, MdLocationOn } from "react-icons/md";
import ContactMap from "./ContactMap";

const ContactInfo = () => {
  return (
    <div className="w-full lg:w-1/2 flex flex-col gap-6">
      {/* Contact Info */}
      <div className="bg-primary p-6 md:p-8 rounded-lg shadow-lg text-white">
        <h1 className="text-2xl md:text-3xl text-center font-bold mb-8">
          OUR ADDRESS
        </h1>
        <div className="space-y-6">
          <h3 className="text-lg font-semibold uppercase tracking-wider">
            Contact Us
          </h3>
          <p className="text-sm leading-relaxed">
            Have questions or need help? Reach out to our customer support team
            anytime.
          </p>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <MdLocationOn className="mt-1 flex-shrink-0" size={18} />
              <span className="text-sm">
                123 Business Ave, Suite 456
                <br />
                New York, NY 10001
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <MdLocalPhone size={18} />
              <a
                href="tel:+14578986546"
                className="hover:text-gray-300 transition text-sm"
              >
                +1 (457) 898-6546
              </a>
            </div>
            <div className="flex items-center space-x-3">
              <IoIosMail size={18} />
              <a
                href="mailto:info@example.com"
                className="hover:text-gray-300 transition text-sm"
              >
                info@example.com
              </a>
            </div>
          </div>
        </div>
      </div>

         <div>
          <ContactMap  />
         </div>
    </div>
  );
};

export default ContactInfo;
