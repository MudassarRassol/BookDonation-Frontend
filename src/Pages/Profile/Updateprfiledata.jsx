import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateProfile = ({ profileData, onClose }) => {
  const { theme } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    address: profileData.address || "",
    phone: profileData.phone || "",
    city: profileData.city || "",
  });


  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.put(
        "http://localhost:3000/api/auth/updateProfileData",
        formData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setMessage("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Update Error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#00000056] bg-opacity-50">
      <div className={`p-6 rounded-md shadow-lg w-96 ${theme === "light" ? "light" : "dark"}`}>
        <h2 className="text-xl font-bold mb-4">Update Profile</h2>
        {message && <p className="text-center text-green-500 mb-2">{message}</p>}

        {/* Update Profile Form */}
        <div className="w-full p-4 border-l-2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
              className="input-field w-full border-b-2 outline-none p-2"
            />
            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => {
                let value = e.target.value;
                if (!value.startsWith("92")) {
                  value = "92" + value.replace(/^92/, "");
                }
                setFormData({ ...formData, phone: value });
              }}
              minLength={12}
              maxLength={12}
              required
              className={`input-field w-full border-b-2 outline-none p-2 ${theme === "light" ? "text-gray-900" : "text-white"}`}
            />
            <input
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
              className={`input-field w-full border-b-2 outline-none p-2 ${theme === "light" ? "text-gray-900" : "text-white"} *`}
            />

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                className={`px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white 
                           ${theme === 'light' ? 'darkbutton' : 'lightbutton'} `}
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 rounded ${loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"} text-white 
                ${theme === 'light' ? 'darkbutton' : 'lightbutton'}
                `}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;