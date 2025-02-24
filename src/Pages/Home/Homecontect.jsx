import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import contactImg from "../../../src/assets/Contact.jpg"; // Replace with your actual image path
import Button from "../../Components/Button";
const HomeContact = () => {
  return (
    <section className=" py-12 px-6 border-t-2  shadow-t-2xl">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Image */}
        <div className="w-full">
          <img src={contactImg} alt="Contact Us" className="w-full rounded-lg shadow-lg" />
        </div>

        {/* Right Side - Contact Details */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-lg mb-6">
            Have questions? Reach out to us and let's connect!
          </p>
          <div className="space-y-4 text-lg">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <FaPhone /> <span>+92 3110758376</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <FaEnvelope /> <span>bookdonation@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <FaMapMarkerAlt /> <span>123 Book Street, Library City</span>
            </div>
          </div>
          <Link
            to="/contact"
            className="mt-6 inline-block   "
          >
            <Button text={'Contact Us'} /> 
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeContact;
