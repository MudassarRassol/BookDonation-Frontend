import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowBigRightDash, BookOpen, Users, Lightbulb } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {motion} from "framer-motion"
import HomeAboutUs from "./Homeaboutus";

const Welcome = () => {
  const role = useSelector((state) => state.user.role);
  const textRef = useRef(null);
  const [stats, setStats] = useState({ totalDonations: 0, totalDonors: 0 });

  useEffect(() => {
    // Fetch statistics from API
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/count");
        const data = await response.json();
        if (data.success) {
          setStats(data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);


useEffect(()=>{
  gsap.fromTo(
    textRef.current.children,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1, stagger: 0.5, ease: "sine.in" }
  );
},[])


  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const donorData = [
  {
    icon: <BookOpen size={50} className="mb-4" />,
    title: "Spread Knowledge",
    description: "Your books open doors to education and lifelong learning for those in need.",
  },
  {
    icon: <Users size={50} className="mb-4" />,
    title: "Help Communities",
    description: "Your donation supports libraries, schools, and individuals in need.",
  },
  {
    icon: <Lightbulb size={50} className="mb-4" />,
    title: "Inspire Minds",
    description: "Books inspire creativity, imagination, and endless possibilities for learning.",
  },
];

const recipientData = [
  {
    icon: <BookOpen size={50} className="mb-4" />,
    title: "Gain Knowledge",
    description: "Access a variety of books for free and expand your learning.",
  },
  {
    icon: <Users size={50} className="mb-4" />,
    title: "Join a Reading Community",
    description: "Connect with donors and other readers to build a love for books.",
  },
  {
    icon: <Lightbulb size={50} className="mb-4" />,
    title: "Be Inspired",
    description: "Unlock creativity and imagination through the power of reading.",
  },
];

const data = role === "donor" ? donorData : recipientData;

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-[url(../../../src/assets/3d.jpg)] bg-no-repeat bg-center bg-cover bg-fixed flex items-center justify-center">
        <div className="absolute inset-0 bg-opacity-50"></div>

        <div className="w-full flex h-[50vh] md:h-screen justify-center items-center relative border-b-2 p-3  text-amber-950">
          <div ref={textRef} className="flex flex-col text-center max-w-2xl items-center relative z-10">
            <h1 className="text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg text-amber-950 ">Donate Books, Change Lives</h1>
            <h2 className="text-xl md:text-2xl font-semibold mb-2 drop-shadow-md">Give Your Books a Second Life</h2>
            <p className="text-md md:text-lg mb-6 p-3 drop-shadow-sm">
              Millions of people lack access to books. Your donation can inspire a child, help a student, or support a community in need.
              Join us in spreading knowledge and making a difference!
            </p>
                            <Link
                           to={role === "donor" ? "/addbook" : "/allbooks"}
                                className="px-6 py-3 w-[50%]  mt-4 text-2xl font-semibold border-2  hover-text-white rounded-lg 
            relative overflow-hidden group flex items-center justify-center gap-2 hover:text-white"
                            >
                                <span className="relative z-10">
                                {role === "donor" ? "Donate Now" : "Browse Books"}
                                </span>
                                <ArrowBigRightDash className="relative z-10" />
                                <span className="absolute inset-0 bg-amber-950 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                            </Link>
          </div>
        </div>
      </div>



      {/* Why Donate Section */}
      <div className="w-full py-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          {role === "donor" ? "Why Donate Books?" : "How Books Can Change Your Life"}
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
          {role === "donor"
            ? "Your book donations can make a huge impact! Here’s why you should consider giving:"
            : "Books have the power to transform lives! Here’s how they can benefit you and your community:"}
        </p>
        <motion.div
        
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        
        className="flex flex-col md:flex-row justify-center items-center gap-6 px-6 mb-10">
          {/* Total Donated Books */}
          <div className="flex flex-col items-center p-6 shadow-lg rounded-lg w-80 hover:scale-105 transition-transform">
            <BookOpen size={50} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Books Donated</h3>
            <p className="text-lg font-bold">{stats.totalDonations}</p>
          </div>

          {/* Total Donors */}
          <div className="flex flex-col items-center p-6 shadow-lg rounded-lg w-80 hover:scale-105 transition-transform">
            <Users size={50} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">Total Donors</h3>
            <p className="text-lg font-bold">{stats.totalDonors}</p>
          </div>
        </motion.div>

        <motion.div
                
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
        
          className="flex flex-col md:flex-row items-center justify-center gap-6 px-6">
              <div className="flex flex-wrap justify-center gap-6">
    {data.map((item, index) => (
      <div key={index} className="flex flex-col items-center p-6 shadow-lg rounded-lg w-80 hover:scale-105 transition-transform">
        {item.icon}
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-center">{item.description}</p>
      </div>
    ))}
  </div>
          {/* Card 1 */}
          {/* <div className="flex flex-col items-center p-6 shadow-lg rounded-lg w-80 hover:scale-105 transition-transform">
            <BookOpen size={50} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">{role === "donor" ? "Spread Knowledge" : "Gain Knowledge"}</h3>
            <p>Your books open doors to education and lifelong learning for those in need.</p>
          </div> */}

          {/* Card 2 */}
          {/* <div className="flex flex-col items-center p-6 shadow-lg rounded-lg w-80 hover:scale-105 transition-transform">
            <Users size={50} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">{role === "donor" ? "Help Communities" : "Join a Reading Community"}</h3>
            <p>Connect with donors and get access to valuable books for free.</p>
          </div> */}

          {/* Card 3 */}
          {/* <div className="flex flex-col items-center p-6 shadow-lg rounded-lg w-80 hover:scale-105 transition-transform">
            <Lightbulb size={50} className="mb-4" />
            <h3 className="text-xl font-semibold mb-2">{role === "donor" ? "Inspire Minds" : "Be Inspired"}</h3>
            <p>Books inspire creativity, imagination, and endless possibilities for learning.</p>
          </div> */}
        </motion.div>
      </div>

      {/* About Us Section */}
      {/* <HomeAboutUs /> */}
    </div>
  );
};

export default Welcome;
