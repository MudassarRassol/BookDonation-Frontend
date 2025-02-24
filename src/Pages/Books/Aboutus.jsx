import React from "react";
import { motion } from "framer-motion";
import img1 from '../../assets/ab1.jpg';
import img2 from '../../assets/ab2.jpg';
import img3 from '../../assets/ab3.jpg';
import img4 from '../../assets/ab4.jpg';

const AboutUs = () => {
    // Animation Variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    };

    const fadeInLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } },
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0, transition: { duration: 1.2, ease: "easeOut" } },
    };

    return (
        <section className=" py-16 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Intro Section */}
                <motion.div
                    className="text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                >
                    <h2 className="text-5xl font-bold  mb-6">About Us</h2>
                    <p className="text-lg  leading-relaxed max-w-3xl mx-auto">
                        Welcome to our book donation platform! Our mission is to connect book donors
                        with those who need them, promoting literacy and knowledge-sharing in communities.
                        We believe books have the power to change lives and should be accessible to everyone.
                    </p>
                </motion.div>

                {/* Alternating Sections */}
                <div className="mt-12 space-y-16">
                    {[
                        {
                            title: "📚 Sustainability",
                            desc: "Every book deserves a second chance! By donating and reusing books, we help reduce waste and minimize environmental impact. Instead of letting books collect dust, we ensure they find new homes where they can be read, shared, and loved.",
                            img: img1
                        },
                        {
                            title: "🌍 Accessibility",
                            desc: "We believe knowledge should be within everyone's reach. Through our platform, books reach libraries, students, and underprivileged communities. By making books accessible, we empower education, curiosity, and lifelong learning.",
                            img: img2
                        },
                        {
                            title: "🤝 Community",
                            desc: "Books bring people together! Our platform is built around the spirit of giving and sharing. Whether you’re donating, receiving, or simply sharing stories, you're contributing to a vibrant, knowledge-driven community where books become bridges between people.",
                            img: img3
                        },
                        {
                            title: "🎁 Giving Back",
                            desc: "A single book can brighten someone’s world. By donating, you’re not just sharing a book—you're sharing knowledge, imagination, and opportunity. Every contribution, big or small, helps someone in need discover the joy of reading.",
                            img: img4
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""} items-center gap-10`}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                        >
                            <div className="w-full md:w-1/2">
                                <img
                                    src={item.img || 'https://images.unsplash.com/photo-1512820790803-83ca734da794'}
                                    alt="Bookshelf"
                                    width={200}
                                     height={200}

                                    className="w-full rounded-lg shadow-lg"
                                />
                            </div>
                            <div className="w-full md:w-1/2 text-center md:text-left">
                                <h3 className="text-2xl font-semibold  mb-3">{item.title}</h3>
                                <p className=" text-lg">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeInUp}
                >
                    <p className="text-xl ">
                        Whether you're donating or receiving books, you're part of a mission to spread knowledge.
                        <br />
                        <span className="font-bold ">Join us today and make a difference!</span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutUs;
