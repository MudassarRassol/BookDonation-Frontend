  import React, { useState } from "react";
  import { useSelector } from "react-redux";
  import { Link, NavLink } from "react-router";
  import { useDispatch } from "react-redux";
  import { image,login,role,userid,city, varify } from "../../Redux/slice";
  import axios from 'axios';
  import toast, { Toaster } from 'react-hot-toast';
  import { useNavigate } from "react-router";

  const Login = () => {
      const { theme } = useSelector((state) => state.user);
      const dispatch = useDispatch();
      const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: "",
      password: "",
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', formData, {
          withCredentials: true
        });
    
        if (response.status === 200) {
          dispatch(login(true));
          dispatch(image(response.data.data.imageUrl));
          dispatch(role(response.data.data.role));
          dispatch(userid(response.data.data._id));
          dispatch(city(response.data.data.city));
          dispatch(varify(response.data.data.status));
          toast.success('Login successful');
          navigate(
            response.data.data.role === 'admin' ? '/dashboard' :'/home' 
          );

        }
      } catch (error) {
        if (error.response) {
          console.log(error)
          // If the error is from the server
          toast.error(error.response.data.message);
        } else {
          // // If there's a network or other issue
          // toast.error('Something went wrong. Please try again.');
        }
      }
    };
    

    return (
      <div className="flex h-[90vh] items-center justify-center  mx-2  bg  ">
        <Toaster  position='top-right' />
        <div className="w-full max-w-md  p-8 rounded-xl   transition-all duration-200  border-2 backdrop-blur-sm  ">
          <h2 className="text-3xl  text-center mb-6 ">
            Login

          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg outline-none placeholder:basis-lg "
                placeholder="Enter your Email Address"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg outline-none placeholder:basis-lg  "
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 cursor-pointer ${
                  theme === "light"
                  ? 'darkbutton' : 'lightbutton'
                }
              } `}
            >
              Login
            </button>
          </form>
          {/* Signup Link */}
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <NavLink to={'/register'} className=" hover:underline">
              Sign up
            </NavLink>
          </p>
        </div>
      </div>
    );
  };

  export default Login;
