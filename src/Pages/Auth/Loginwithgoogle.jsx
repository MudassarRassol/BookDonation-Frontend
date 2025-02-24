import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleLoginComponent = () => {
  const navigate = useNavigate();

  // ✅ Google Login Handler
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/login/google`, // ✅ Use environment variable for API URL
        { token: credentialResponse.credential }
      );

      if (response.status === 200) {
        toast.success("Google Login Successful!");
        localStorage.setItem("token", response.data.token); // Save JWT token
        navigate("/dashboard"); // ✅ Navigate after successful login
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Google Login Failed!"); // ✅ Show backend error if available
    }
  };

  return (
    <GoogleOAuthProvider clientId="810114787909-ehi3vntv5mdp0orovldnt8i9k261t0c1.apps.googleusercontent.com">
      <Toaster position='top-right'/>
      <div className="flex flex-col items-center justify-center mt-2` ">
        <GoogleLogin onSuccess={handleGoogleLogin} onError={() => toast.error("Google Login Failed!")} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginComponent;
