import React, { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../Components/Navber';
import Footer from '../Components/Footer';
import CursorDot from '../Components/Cursordot.jsx';
import { useLocation } from 'react-router-dom';
const Login = lazy(() => import('../Pages/Auth/Login'));
const Register = lazy(() => import('../Pages/Auth/Register'));
const Profile = lazy(() => import('../Pages/Profile/Profile'));
const Addbook = lazy(() => import('../Pages/Books/Addbook'));
const Home = lazy(() => import('../Pages/Home/Home'));
const Allbooks = lazy(() => import('../Pages/Books/Allbook'));
const Getbookdetailsbyid = lazy(() => import('../Components/Getbookdetailsbyid'));
const Getmybooddonor = lazy(() => import('../Pages/Books/Getmybooddonor'));
const Editbook = lazy(() => import('../Components/Editbook'));
const Requestedbook = lazy(() => import('../Pages/Books/Requestedbook'));
const Watchlist = lazy(() => import('../Components/Watchlist'));
const Donorseeuserrequest = lazy(() => import('../Pages/Books/Donorseeuserrequest'));
const Donormangerequest = lazy(() => import('../Components/Donormangerequest'));
const Donorprifile = lazy(() => import('../Components/donorprifile'));
const Aboutus = lazy(() => import('../Pages/Books/Aboutus'));
const AdminDashboard = lazy(() => import('../Pages/Admin/Dashboard'));
const UserDetailsById = lazy(() => import('../Pages/Admin/Adminom/Userdeatilsbyid'));
const Getalluser = lazy(() => import('../Pages/Admin/Adminom/Getalluser'));
const Getalldonor = lazy(() => import('../Pages/Admin/Adminom/Getalldonor'));
const Allbook = lazy(() => import('../Pages/Admin/Adminom/Allbook'));
const Allrequest = lazy(() => import('../Pages/Admin/Adminom/Allrequest'));
const Allreporteduser = lazy(() => import('../Pages/Admin/Adminom/Reporteduser'));
const Statics = lazy(() => import('../Pages/Admin/Adminom/Statics'));
const Chatpage = lazy(() => import('../Pages/Messages/Chatpage'));
import Loading from '../Components/Loading.jsx';
const Contact = lazy(()=>import('../Components/Contactus.jsx'))
import { Link } from 'react-router';
const Pageroutes = () => {
  const location = useLocation();
  console.log(location.pathname)
  const { role,varify } = useSelector(state => state.user);

  return (
   <>
    <CursorDot/>
      <Navbar />
      <Suspense fallback={<Loading/>}>
        <Routes>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/addbook" element={<Addbook />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/home/allbooks" element={<Allbooks />} />
                <Route path="/allbooks" element={<Allbooks />} />
                <Route path="/home/allbooks/:id" element={<Getbookdetailsbyid />} />
                <Route path="/allbooks/:id" element={<Getbookdetailsbyid />} />
                <Route path="/mybooks" element={<Getmybooddonor />} />
                <Route path="/editbook/:id" element={<Editbook />} />
                <Route path="/requests" element={<Requestedbook />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/donorseeuserrequest" element={<Donorseeuserrequest />} />
                <Route path="/request" element={<Donormangerequest />} />
                <Route path="/profile/:id" element={<Donorprifile />} />
                <Route path="/about" element={<Aboutus />} />
                <Route path="/messages" element={<Chatpage />} />
                <Route path='contact' element={<Contact/>}/>

          {
            role === 'admin' && (
              <>
          <Route  path="/dashboard" element={<AdminDashboard />} />
          <Route  path="/" element={<AdminDashboard />} />
          <Route path="/admin/userdetails/:id" element={<UserDetailsById />} />
          <Route path="/admin/getallusers" element={<Getalluser />} />
          <Route path="/admin/getalldonor" element={<Getalldonor />} />
          <Route path="/admin/getallbooks" element={<Allbook />} />
          <Route path="/admin/Allrequest" element={<Allrequest />} />
                <Route path="/admin/Allrequest" element={<Allrequest />} />
                <Route path="/admin/Allreporteduser" element={<Allreporteduser />} />
                <Route path="/admin/statics" element={<Statics />} />

              </>
            )
          }
        </Routes>
      </Suspense>
       {
        location.pathname !== "/messages" && (
          <footer className="w-full bg-amber-950 text-white py-1 text-center">
          <Footer />
        </footer>
        )
       }
</>
  );
};

export default Pageroutes;
