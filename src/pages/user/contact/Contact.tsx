import ContactForm from "./components/ContactForm";
import ContactInfo from "./components/ContactInfo";

const Contact = () => {
  return (
    <div className="w-full mt-20">
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-primary to-red-100 py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            We're Here to Help
          </h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Have questions about our products or services? Reach out to our
            friendly team for assistance.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-12 md:py-16  mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="lg:w-2/3">
            <div className=" p-6 md:p-8 ">
              <ContactForm />
            </div>
          </div>

          <div className="lg:w-1/3">
            <ContactInfo />
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full  py-12 px-4 border-t border-gray-200">
        <div className="max-w-full mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Our Location
          </h2>
          <div className="h-96 w-full bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d426.128021629306!2d75.583209!3d31.303077!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5b3b79997171%3A0x2a17d9f210b903a!2sOm%20Enterprises%20Group!5e0!3m2!1sen!2sin!4v1749018727184!5m2!1sen!2sin"
              width="600"
              height="450"
              loading="lazy"
              allowFullScreen
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
