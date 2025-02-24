import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowBigRightDash } from "lucide-react";


const fadeInUp = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};
const HomeAboutUs = () => {
    return (
        <div
            className="relative bg-cover bg-center bg-no-repeat  items-center justify-center border-t-2 h-[50vh] md:h-screen   text-amber-950 flex flex-col bg-[url(../../../src/assets/3d.jpg)]  bg-fixed"
        // style={{ backgroundImage: "url('https://images.unsplash.com/photo-1512820790803-83ca734da794')" }}
        >
            <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={fadeInUp}
                        className=" flex flex-col items-center justify-center relative z-10"
            >
                {/* Overlay for better text visibility */}
                <div className="absolute inset-0  bg-opacity-50"></div>

                <div
                    className="relative text-center px-6"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg ">About Us</h2>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto">
                        We connect book donors with those in need, promoting literacy and knowledge-sharing.
                        Every book donated has the power to change a life. Join us in making a difference!
                    </p>
                </div>
                <Link
                    to={
                        '/about'
                    }
                    className="px-6 py-3 w-[50%]  mt-4 text-2xl font-semibold border-2  hover-text-white rounded-lg 
relative overflow-hidden group flex items-center justify-center gap-2 hover:text-white"
                >
                    <span className="relative z-10">
                        Read More
                    </span>
                    <ArrowBigRightDash className="relative z-10" />
                    <span className="absolute inset-0 bg-amber-950 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
            </motion.div>
        </div>
    );
};

export default HomeAboutUs;
