import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { ReactTyped } from "react-typed";


// Image Imports
import slider1 from "../assets/Slider/wallpaperflare.com_wallpaper (1).jpg";
import slider2 from "../assets/Slider/wallpaperflare.com_wallpaper (2).jpg";
import slider3 from "../assets/Slider/wallpaperflare.com_wallpaper (3).jpg";
import slider4 from "../assets/Slider/wallpaperflare.com_wallpaper (4).jpg";
import slider5 from "../assets/Slider/wallpaperflare.com_wallpaper (5).jpg";
import slider6 from "../assets/Slider/wallpaperflare.com_wallpaper (6).jpg";
import slider7 from "../assets/Slider/wallpaperflare.com_wallpaper.jpg";

const slides = [
  { image: slider1, title: "Empower Minds", desc: "Donate books and spread knowledge" },
  { image: slider2, title: "A World of Books", desc: "Give your books a second life" },
  { image: slider3, title: "Make a Difference", desc: "Your old books can change lives" },
  { image: slider4, title: "Inspire Learning", desc: "Help children and students grow" },
  { image: slider5, title: "Join the Movement", desc: "Be part of a global book donation initiative" },
  { image: slider6, title: "Education for All", desc: "Bridging the gap through book donations" },
  { image: slider7, title: "Knowledge is Power", desc: "Every book has a story to tell" }
];

const Slider = () => {
  return (
    <Swiper
    pagination={{ clickable: true, dynamicBullets: true }}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    loop={true}
    modules={[Pagination, Navigation, Autoplay]} // Removed EffectFade
    className="relative w-full h-[500px]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className="relative ">
          <div className="relative w-full h-full">
            {/* Background Image with Dark Overlay */}
            <img
  src={slide.image}
  alt={slide.title}
  className="w-full h-full object-cover brightness-50"
  loading="lazy"
/>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-6 ">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg md:text-xl">{slide.desc}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
