import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BookX } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Nobookmsg from './Nobookmsg';
import nobook from '../assets/9269766.png'
import Loading from './Loading';
const Watchlist = () => {
    const { theme } = useSelector((state) => state.user);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/user/getMyWatchlist', {
                withCredentials: true
            });
            console.log(response);
            if (response.status === 200 && Array.isArray(response.data.watchlist)) {
                setBooks(response.data.watchlist);
            } else {
                setBooks([]);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            setBooks([]);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWatchlist = async (id) => {
        setLoading(true);
        try {
            const response = await axios.delete(`http://localhost:3000/api/user/removeFromWatchlist/${id}`, {
                withCredentials: true
            });
            if (response.status === 200) {
                // ✅ Remove the book from the local state instead of fetching all books again
                setBooks((prevBooks) => prevBooks.filter((bookItem) => bookItem._id !== id));

                toast.success("Book removed from watchlist");
            }
        } catch (error) {

            console.error("Error removing book:", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="p-5 h-[90vh]">
            <Toaster position='top-right' />
            <h1 className="text-2xl font-bold mb-4 mt-4 text-center">My Watchlist</h1>

            {loading ? (
                <Loading />
            ) : books.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
                    {books.map((bookItem) => {
                        const book = bookItem.book || {}; // Ensure book exists
                        return (
                            <div key={bookItem._id} className={`p-4 shadow-lg rounded-xl transition duration-300 hover:scale-105 ${theme === 'dark' ? 'dark' : 'light'}`}>

                                <Link to={`/home/allbooks/${book._id}`}>
                                    <img src={book.bookphoto || "default-placeholder.jpg"} alt={book.title || "No title"} className="w-full h-48 object-cover rounded-md" />
                                </Link>
                                <div className="mt-3 flex justify-between items-center">
                                    <h3 className="font-semibold text-lg">{book.title || "Unknown Title"}</h3>
                                    <p>{book.author || "Unknown Author"}</p>
                                </div>
                                <div className="absolute top-4 left-2 px-2 py-1 text-xs font-semibold rounded-md shadow-md bg-white">
                                    {book.genre}
                                </div>
                                {/* <div>
                                    <p className="mt-2">Date: {new Date(book.createdAt).toLocaleDateString() || "N/A"}</p>
                                </div> */}
                                <div className="mt-2">
                                    <p>Condition: {book.condition || "N/A"}</p>
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                    <Link to={`/home/allbooks/${book._id}`}>
                                        <button className="border-2 rounded-md px-4 py-2 hover:bg-amber-950 hover:text-white transition-all duration-150">See details</button>
                                    </Link>
                                    <BookX className="cursor-pointer text-red-500" onClick={() => removeFromWatchlist(bookItem._id)} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <Nobookmsg Nobookmsg={"Your Watchlist is Empty"} img={nobook} />
            )}
        </div>
    );
};

export default Watchlist;
