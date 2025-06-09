import { useState, ChangeEvent, FormEvent } from 'react';
import { FaUserAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";

type FormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

type SubmitStatus = {
  success: boolean;
  message: string;
} | null;

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(`${BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ success: true, message: 'Message sent successfully!' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmitStatus({ success: false, message: data.message || 'Failed to send message' });
      }
    } catch {
      setSubmitStatus({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl text-center font-bold text-primary mb-8">
        CONTACT US
      </h1>
      {submitStatus && (
        <div className={`mb-4 p-4 rounded-md ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {submitStatus.message}
        </div>
      )}
      <form className="w-full space-y-6" onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaUserAlt className="text-gray-400" />
          </div>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full pl-10 pr-4 py-2 border-b-2 border-primary focus:outline-none focus:border-primary"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IoIosMail className="text-gray-400" />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full pl-10 pr-4 py-2 border-b-2 border-primary focus:outline-none focus:border-primary"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MdLocalPhone className="text-gray-400" />
          </div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            className="w-full pl-10 pr-4 py-2 border-b-2 border-primary focus:outline-none focus:border-primary"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <textarea
          name="message"
          placeholder="Your Message"
          className="w-full px-4 py-2 border-2 border-primary focus:outline-none focus:border-primary rounded-md"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark transition duration-300 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;