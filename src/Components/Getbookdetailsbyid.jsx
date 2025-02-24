import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { BookHeart, Edit, Trash2, MessageCircle, User } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from './Button';
import Loading from './Loading';

const SeeBookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { userid, role, login, city } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/getbookdetails/${id}`);
                if (response.status === 200) {
                    setBook(response.data.book);
                }
            } catch (err) {
                setError("Failed to fetch book details");
            } finally {
                setLoading(false);
            }
        };
        fetchBookDetails();
    }, [book]);

    if (loading) return <Loading />;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/donor/deletbook/${id}`, { withCredentials: true });
            if (response.status === 200) {
                toast.success("Book deleted successfully");
                navigate("/mybooks");
            } else {
                toast.error("Failed to delete book");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while deleting the book");
        }
    };

    const handleRequest = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/user/requestbook/${id}`, {}, { withCredentials: true });
            if (response.status === 200) {
                toast.success("Book Requested");
            } else {
                toast.error(response.data.msg || "Failed to request book");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response.data.msg || "Failed to request book");
        }
    };

    const handleWatchlist = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/api/user/addwatchlist/${id}`, {}, { withCredentials: true });
            if (response.status === 200) {
                toast.success("Book added to Watchlist");
            } else {
                toast.error("An error occurred while adding to Watchlist");
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while adding to Watchlist");
        }
    };

    const createConversation = async (receiverId) => {
        try {
            const response = await axios.post(`http://localhost:3000/api/messages/createconversation`, { receiverId }, { withCredentials: true });
            if (response.status === 200) {
                navigate(`/messages`);
            } else if (response.status === 404) {
                navigate(`/messages`);
            }
        } catch (err) {
            console.error(err);
            toast.error("An error occurred while creating conversation");
        }
    };

    return (
        <div className=" mx-auto mt-12 mb-10 p-2 sm:mb-2 md:mb-12">
            <Toaster position='top-right' />
            <motion.div
                className="mx-auto shadow-2xl rounded-lg overflow-hidden p-6 "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {book?.donor?._id === userid && role === "donor" &&(
                    <div className='flex justify-end items-center gap-2 mb-2'>
                        {
                            book?.status === "available" ?
                            <>
                         <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Edit onClick={() => navigate(`/editbook/${id}`)} className="cursor-pointer text-blue-500" />
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Trash2 onClick={handleDelete} className="cursor-pointer text-red-500" />
                        </motion.div>
                            </> :  <>
                             You Can Edit only in available condition
                            </> 
                        }
                    </div>
                )}
                {role === "recipient" && login === true && (
                    <motion.div
                        className='flex justify-end items-center gap-2 mb-2 cursor-pointer'
                        onClick={handleWatchlist}
                        // whileHover={{ scale: 1.05 }}
                        // whileTap={{ scale: 0.95 }}
                    >
                        <BookHeart  />
                        <p >Add to Watchlist</p>
                    </motion.div>
                )}

                <div className="flex flex-col md:flex-row gap-6">
                    <motion.div
                        className="md:w-1/3 w-full"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img
                            src={book?.bookphoto || "default-placeholder.jpg"}
                            alt={book?.title}
                            className="aspect-square object-cover rounded-lg shadow-lg"
                        />
                    </motion.div>
                    <div className="w-full flex flex-col justify-center relative">
                        <span className='flex justify-between items-center text-2xl font-bold mb-2'>
                            <p>{book?.title}</p>
                            <p className="text-lg mb-2">by {book?.author}</p>
                        </span>
                        <p className="mb-2"><strong>Description</strong><br />{book?.description}</p>
                        <p className="mb-2"><strong>Genre:</strong> {book?.genre}</p>
                        <p className="mb-2"><strong>Condition:</strong> {book?.condition}</p>
                        {
                            book?.status !== "donated" && (
                                <p className="mb-2 text-green-500"><strong>Status:</strong>  {book?.status}</p>
                            )
                        }
                        {
                            book?.status === "donated" && (
                                <p className={`mb-2 ${book.status === "donated" && "text-red-500"}`}><strong>Status:</strong> Book is already {book?.status}</p>
                            )
                        }
                        <div className='flex justify-between items-center'>
                            <p className="text-sm">Added on: {new Date(book?.createdAt).toLocaleDateString()}</p>
                        </div>
                        {
                            login === true && book?.status === "available" && role === "recipient" && (
                                <div className='flex justify-between items-center w-full mt-2'>
                                    {
                                        book?.donor?.city === city && (
                                            <p className="text-sm">Book is available in {book?.donor?.city}</p>
                                        )
                                    }
                                    <Button text="Request Book" func={handleRequest} />
                                </div>
                            )
                        }
                        {
                            book?.status === "requested" && (
                                <p className="text-sm text-red-500 mt-1">Book is requested</p>
                            )
                        }

                        {book?.donor && (
                            <div className="border-t pt-4 mt-4">
                                <h3 className="text-xl font-semibold mb-2">Donor Information</h3>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={book?.donor?.imageUrl || "default-user.jpg"}
                                        alt={book?.donor?.name}
                                        className="w-16 h-16 rounded-full border object-cover shadow-md"
                                    />
                                    <div>
                                        <p className="text-lg font-medium">{book?.donor?.name}</p>
                                        <p className="text-sm">{book?.donor?.email}</p>
                                        <p className="text-sm">{book?.donor?.city}</p>
                                    </div>
                                </div>
                                <div className='flex gap-2 justify-end w-full mt-4'>
                                    <Button text="View Profile" func={() => navigate(`/profile/${book?.donor?._id}`)} icon={<User size={16} />} />
                                    {role === "recipient" && login === true && (
                                        <Button text="Chat" func={() => createConversation(book?.donor?._id)} icon={<MessageCircle size={16} />} />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default SeeBookDetails;