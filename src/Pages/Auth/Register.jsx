import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Singupwithgoogle from "./singwithgoogle";
const Register = () => {
  const { theme } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading,setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    city: "",
    role: "donor",
    image: null,
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Validate Form
  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Email must end with @gmail.com";
    }
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^92\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Phone must start with '92' and have 11 digits";
    }
    if (!formData.city) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formDataToSend.append(key, value);
    });

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formDataToSend,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        setLoading(false);
        toast.success("Registration successful");
        navigate("/login");

      }
    } catch (error) {
              setLoading(false);
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center p-2 mt-11 mb-4">
      <Toaster position='top-right' />
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center md:items-start p-8 rounded-lg shadow-lg">
        {/* Image Upload Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center p-4">
          <label
            htmlFor="imageUpload"
            className="cursor-pointer w-32 h-32 rounded-full overflow-hidden border-2 mb-4 flex items-center justify-center"
          >
            {preview ? (
              <img src={preview} alt="User Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-gray-500 scale-110 text-center">Upload Image</div>
            )}
          </label>
          <input id="imageUpload" type="file" name="image" onChange={handleImageChange} className="hidden" />
          <div className="text-xl font-semibold text-center">Welcome, {formData.name || "User"}!</div>
          <div className=" text-2xl font-semibold text-center mt-2"> Join Our Book Community </div>
        </div>

        {/* Registration Form */}
        <div className="w-full md:w-1/2 p-4 border-l-2">
          <h2 className="text-3xl text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required
              className="w-full border-b-2 outline-none p-2" />
            {errors.name && <p className="text-red-500">{errors.name}</p>}

            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required
              className="w-full border-b-2 outline-none p-2" />
            {errors.email && <p className="text-red-500">{errors.email}</p>}

            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password} onChange={handleChange} required
                className="w-full border-b-2 outline-none p-2" />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-500">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <p className="text-red-500">{errors.password}</p>}

            <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required
              className="w-full border-b-2 outline-none p-2" />
            {errors.address && <p className="text-red-500">{errors.address}</p>}

            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => {
                let value = e.target.value.replace(/\D/g, ""); // Only allow numbers
                if (!value.startsWith("92")) value = "92" + value.replace(/^92/, "");
                setFormData({ ...formData, phone: value });
              }}
              maxLength={11}
              required
              className="w-full border-b-2 outline-none p-2"
            />
            {errors.phone && <p className="text-red-500">{errors.phone}</p>}

            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required
              className="w-full border-b-2 outline-none p-2" />
            {errors.city && <p className="text-red-500">{errors.city}</p>}

            <select name="role" value={formData.role} onChange={handleChange} className="w-full border-b-2 outline-none p-2">
              <option value="donor">Donor</option>
              <option value="recipient">Recipient</option>
            </select>

            <button type="submit" className={
              `w-full py-2 rounded-lg text-white font-semibold transition duration-300 ${theme === 'dark' ? 'lightbutton' : 'darkbutton'
              }`
            }>
              {loading? " Creating Account.... " : "Register"}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account? <NavLink to="/login" className="hover:underline">Login</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
