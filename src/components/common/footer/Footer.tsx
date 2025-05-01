import { IoIosMail } from "react-icons/io";
import { MdLocalPhone, MdLocationOn } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const quickLinks = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Catalog", link: "/catalog" },
    { name: "Products", link: "/products" }
  ];

  const shopLinks = [
    { name: "New Arrivals", link: "/new" },
    { name: "Best Sellers", link: "/bestsellers" },
    { name: "Special Offers", link: "/offers" },
    { name: "Gift Cards", link: "/gifts" },
    { name: "My Account", link: "/account" }
  ];

  return (
    <div className="  bg-transparent">
      <div className="bg-primary h-auto min-h-[25rem]  p-6 sm:p-[4rem] flex justify-center items-center flex-wrap gap-6 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              Omeg <br className="hidden sm:block" /> Bazaar
            </h2>
            <p className="text-white text-sm leading-relaxed">
              Your one-stop destination for quality products. We provide the
              best shopping experience with a wide range of items to choose
              from.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-black transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-black transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-black transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-black transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-white hover:text-black transition duration-300 text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Now */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold uppercase tracking-wider">
              Shop Now
            </h3>
            <ul className="space-y-2">
              {shopLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-white hover:text-black transition duration-300 text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold uppercase tracking-wider">
              Contact Us
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Have questions or need help? Reach out to our customer support
              team anytime.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MdLocationOn
                  className="text-white mt-1 flex-shrink-0"
                  size={18}
                />
                <span className="text-white text-sm">
                  123 Business Ave, Suite 456
                  <br />
                  New York, NY 10001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MdLocalPhone className="text-white" size={18} />
                <a
                  href="tel:+14578986546"
                  className="text-white hover:text-black transition text-sm"
                >
                  +1 (457) 898-6546
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <IoIosMail className="text-white" size={18} />
                <a
                  href="mailto:info@example.com"
                  className="text-white hover:text-black transition text-sm"
                >
                  info@example.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-white text-sm">
          <p>
            &copy; {new Date().getFullYear()} Omeg Bazaar. All rights reserved.
            |
            <a href="#" className="hover:text-white ml-2">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="hover:text-white ml-2">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
