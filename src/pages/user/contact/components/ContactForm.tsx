import { FaUserAlt } from "react-icons/fa"
import { IoIosMail } from "react-icons/io"
import { MdLocalPhone } from "react-icons/md"


const ContactForm = () => {
  return (
    <div className="w-full lg:w-1/2 p-4 md:p-8 bg-white rounded-lg shadow-lg ">
    <h1 className="text-2xl md:text-3xl text-center font-bold text-primary mb-8">
      CONTACT US
    </h1>
    <form className="w-full space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FaUserAlt className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Your Name"
          className="w-full pl-10 pr-4 py-2 border-b-2 border-primary focus:outline-none focus:border-primary"
          required
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <IoIosMail className="text-gray-400" />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="w-full pl-10 pr-4 py-2 border-b-2 border-primary focus:outline-none focus:border-primary"
          required
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <MdLocalPhone className="text-gray-400" />
        </div>
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full pl-10 pr-4 py-2 border-b-2 border-primary focus:outline-none focus:border-primary"
          required
        />
      </div>

      <textarea
        placeholder="Your Message"
        className="w-full px-4 py-2 border-2 border-primary focus:outline-none focus:border-primary rounded-md"
        required
      />

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark transition duration-300"
      >
        Send Message
      </button>
    </form>
  </div>
  )
}

export default ContactForm
