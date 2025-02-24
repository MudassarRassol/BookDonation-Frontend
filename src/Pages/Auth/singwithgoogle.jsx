import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const Singupwithgoogle = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  // ✅ Google Signup Handler
  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/auth/signupWithGoogle`, // ✅ Use environment variable
        { token: credentialResponse.credential }
      );

      if (response.status === 200) {
        toast.success("Google Signup Successful!");
        navigate("/"); // ✅ Navigate after successful login
      }
    } catch (error) {
        console.log(error);
      toast.error(error.response?.data?.message || "Google Signup Failed!"); // ✅ Show backend error if available
    }
  };

  return (
    <GoogleOAuthProvider clientId="810114787909-ehi3vntv5mdp0orovldnt8i9k261t0c1.apps.googleusercontent.com">
      <Toaster position='top-right' />
      <GoogleLogin onSuccess={handleGoogleSignup} onError={() => toast.error("Google Login Failed!")} />
    </GoogleOAuthProvider>
  );
};

export default Singupwithgoogle;
