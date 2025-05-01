import ContactInfo from "../../user/contact/components/ContactInfo";
import ContactForm from "./components/ContactForm";

const Contact = () => {
  return (
    <div className="w-full">
      {/* Hero Image Section */}
      <div className="w-full h-64 md:h-[28rem] bg-green-50 relative flex justify-center items-center">
        <img
          src="https://t4.ftcdn.net/jpg/05/53/37/57/360_F_553375789_afGBuBMWWCKUUGXQR2BFuVAvhfJZZQfd.jpg"
          alt="contact"
          className="w-full h-full object-cover hover:opacity-90"
        />
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-8 md:py-12 max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl text-center font-bold text-primary mb-8 md:mb-12">
          Let's Start a conversation
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <ContactForm />

          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default Contact;
