import React, { useState, useEffect } from "react";
import Pageroutes from "./Theme/Pageroutes";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
const App = () => {
  const { theme,varify } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 300); // Delay scroll slightly after fade
          }, 500); // Delay before hiding loader
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center  bg-[url('../src/assets/pexels-pixabay-531844.jpg')] text-amber-950 transition-all duration-200 text-5xl font-extrabold tracking-widest"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeIn"  }}
          >
            {progress}%
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div
          className={`h-screen overflow-hidden overflow-y-scroll ${
            theme === "light" ? "light" : "dark"
          }`}
        >
          <BrowserRouter>
          <Pageroutes />
          </BrowserRouter>
        </div>
      )}
    </>
  );
};

export default App;
