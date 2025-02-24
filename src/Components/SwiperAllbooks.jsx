import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import axios from "axios";
import { Link } from "react-router-dom"; // ✅ Correct import
import BookCard from "./Bookcard";
import { ArrowBigRightDashIcon } from "lucide-react";
const SwiperAllbooks = () => {
  const [books, setBooks] = useState([]);
  const { theme, login, role, city } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true); // ✅ Start with true

  useEffect(() => {
    fetchBooks();
  }, [login, role, city]); // ✅ Add dependencies to refetch when needed

  const fetchBooks = async () => {
    setLoading(true);
    try {
      let response;
      if (!login || (login && role === "recipient")) {
        response = login
          ? await axios.get(`http://localhost:3000/api/user/getallbooksbycity/${city}`, { withCredentials: true })
          : await axios.get(`http://localhost:3000/api/user/getallbooks`, { withCredentials: true });

        if (response.status === 200) {
          setBooks(response.data.books);
        }
      }
      else{
        response = await axios.get(`http://localhost:3000/api/donor/getmybook`, { withCredentials: true });
        if (response.status === 200) {
          setBooks(response.data.books);
          console.log(books);
        }
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="p-1 mt-4 border-t-2 ">
     
      {
        role === 'donor' ? <h4 className="text-3xl font-bold text-center mb-6 rounded-xl mt-5  ">My Books</h4> : <h2 className="text-3xl font-bold text-center mb-6 rounded-xl mt-5   ">Available Books</h2>
      }
      <h4 className="text-right w-[98%] cursor-pointer">
        <Link to={`${
          role === 'donor' ? '/mybooks' : '"/home/allbooks"'
        }`}
        className=" flex items-center justify-end"
        >See All 
        <ArrowBigRightDashIcon/>
        </Link>
      </h4>

      {loading ? (
        // ✅ Show Loading Spinner
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin h-10 w-10 border-4 border-amber-950 border-t-transparent rounded-full"></div>
        </div>
      ) : books && books.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{ clickable: true }}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 10 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 10 },
            1024: { slidesPerView: 4, spaceBetween: 10 },
          }}
          modules={[Pagination]}
          className="mySwiper py-10 m-2 "
        >
          {books.map((book) => (
            <SwiperSlide key={book._id} className="p-2 mb-10 mt-10">
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center  py-10">
          {
            role === 'donor'? <div className=" flex flex-col items-center justify-center">
            <p className=" flex gap-2 items-center justify-center"  >
            No book added yet   <br />
            </p>
            <Link to={'/addbook'} className="flex" >
             Add a book <ArrowBigRightDashIcon className="fa fa-plus"/>
            </Link>
  
            </div> : 'No books available for donation'
          }
        </p>
      )}
    </div>
  );
};

export default SwiperAllbooks;
