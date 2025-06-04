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
            {/* Replace with your actual map component */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291661!2d-73.98784492423967!3d40.74844097138959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1689876423584!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
