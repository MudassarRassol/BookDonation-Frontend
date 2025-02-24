import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/contactus", formData,{
        withCredentials: true
      });
      if (response.status === 200) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.error || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto py-16 px-6">
      <Toaster position='top-right' />
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <p className="text-lg text-center mb-12">
        Have any questions or suggestions? We’d love to hear from you!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <FaPhone className="text-2xl " />
            <span className="text-lg">+92 3110758376</span>
          </div>
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-2xl" />
            <span className="text-lg">BookDonation@gmail.com</span>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-2xl" />
            <span className="text-lg">123 Book Street, Library City</span>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6  p-6 rounded-lg shadow-md">
          <div>
            <label className="block text-lg font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-amber-950 text-white py-3 rounded-lg hover:bg-amber-900"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
