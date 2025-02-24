import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react"; // Optional: for a loading spinner
import { useState } from "react";
const BookCard = ({ book }) => {
  const { role,theme } = useSelector((state) => state.user)
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className=" shadow-2xl rounded-3xl">
      <motion.div
        className={
          `
          relative p-5 pl-6  transition-all duration-300 flex flex-col rounded-3xl 
                   before:absolute before:top-0 before:left-0 before:w-[15px] before:h-full before:bg-amber-950
                   before:rounded-l-lg hover:before:shadow-2xl
                   ${
                    theme === "dark" ? ' before:bg-gray-500 shadow-amber-50' : 'before:bg-amber-950 shadow-2xl' 
                   }

          `
        }
        whileHover={{
          rotateY: -20, // Simulate the book opening to the left
          rotateX: 10, // Slight forward tilt
          scale: 1.05, // Slight zoom
          boxShadow: "15px 25px 35px rgba(0, 0, 0, 0.4)", // Deeper shadow for 3D effect
          y: -16, // Lift the book slightly
          x: -8,
          transformStyle: "preserve-3d", // Enable 3D transformations
        }}
        transition={{ duration: 0.2, ease: "easeIn" }}
        style={{ perspective: 1000, transformStyle: "preserve-3d" }} // Add 3D perspective
      >
        {/* Book Cover */}
        <Link
          to={`/home/allbooks/${book._id}`}
          className="relative block overflow-hidden rounded-md"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="relative w-full h-auto">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
                <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
              </div>
            )}

            <motion.img
              src={book.bookphoto || "default-placeholder.jpg"}
              alt={book.title}
              className={`aspect-[4/3] object-cover rounded-md shadow-lg transition-all duration-300 ${isLoading ? "opacity-0" : "opacity-100"
                }`}
              whileHover={{
                rotateY: -10,
                scale: 1.1,
              }}
              style={{ transformOrigin: "left center" }}
              onLoad={() => setIsLoading(false)}
            />
          </div>
          <div className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-md shadow-md bg-white">
            {book.status}
          </div>
        </Link>

        {/* Book Spine */}
        <motion.div
          className="absolute top-0 left-0 w-[15px] h-full rounded-l-lg shadow-2xl"
          whileHover={{
            rotateY: -5, // Slight spine tilt for realism
          }}
          style={{ transformOrigin: "left center" }}
        />

        {/* Book Details */}
        <div className="mt-2 flex flex-col gap-1 text-left">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg line-clamp-1">{book.title}</h3>
            <h2>By {book.author}</h2>
          </div>
          <div className="border-t border-b py-2 flex flex-col gap-1 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Condition:</span>
              <span className="font-semibold">{book.condition}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Genre:</span>
              <span className="font-semibold">{book.genre}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span className="font-semibold">{new Date(book.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        {/* Fixed See Details Button */}
        <Link
          to={`/home/allbooks/${book._id}`}
          className="relative w-fit self-center mt-3 px-4 py-2 font-semibold text-white cursor-pointer bg-amber-950 rounded-full shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          See Details
        </Link>
      </motion.div>

      {/* Back Cover */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gray-200 rounded-3xl shadow-2xl"
        style={{
          zIndex: -1, // Place it behind the main card
          transform: "rotateY(180deg) translateZ(-10px)", // Flip and position it behind
          transformOrigin: "left center",
          backfaceVisibility: "hidden", // Hide the backface
        }}
        whileHover={{
          rotateY: 160, // Match the book's rotation
          rotateX: 10,
          y: -16,
          x: -8,
        }}
        transition={{ duration: 0.2, ease: "easeIn" }}
      />
    </div>
  );
};

export default BookCard;