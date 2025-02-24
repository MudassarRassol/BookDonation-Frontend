import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Button from '../../../Components/Button';
import { Link } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';
import { ArrowBigLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Components/Loading'
import Nobookmsg from '../../../Components/Nobookmsg'
import nouser from '../../../assets/3024051.jpg'
const Allrequest = () => {
    const { theme } = useSelector((state) => state.user);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noBooksMessage, setNoBooksMessage] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/admin/getalldonationrequests', {
                withCredentials: true
            });
            console.log(response);
            if (response.status === 200 ) {
                setBooks(response.data.donationRequests);
                setNoBooksMessage("");
            } else {
                setBooks([]);
                setNoBooksMessage("No requested books found.");
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            setNoBooksMessage(error.response.data.msg);
        } finally {
            setLoading(false);
        }
    };


const handleCancelRequest = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/api/user/cancelrequest/${id}`, {
            withCredentials: true
        });
        if (response.status === 200) {
            // ✅ Update state immediately instead of waiting for fetchBooks()
            setBooks((prevBooks) => prevBooks.filter((book) => book.book._id !== id));

            toast.success("Request canceled successfully");
        }
    } catch (error) {
        console.error("Error canceling request:", error);
    }
};



    return (
        <div className="p-5 h-screen">
            <div className='flex items-center gap-2 mt-10 '>
                <ArrowBigLeft className='w-10 h-10 cursor-pointer' onClick={() => navigate(-1)}/>
                <h1 className="text-2xl font-bold ">All Request</h1>
            </div>
            <Toaster position='top-right' />
            {loading ? (
               <Loading/>
            ) : books.length === 0 ? (
                 <Nobookmsg img={nouser} Nobookmsg={"No Requested Yet"} />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                    {books.map((book) => (
                        <div key={book._id} className={`p-4 shadow-lg rounded-xl hover:shadow-xl transition duration-300 ${theme === 'dark' ? 'dark' : 'light'} hover:scale-105 `}>
                            <img src={book.book.bookphoto || "default-placeholder.jpg"} alt={book.book.title} className="w-full h-48 object-cover rounded-md" />
                            <div className="flex justify-between items-center mt-3 border-b pb-2">
                                <h3 className="font-semibold text-lg">{book.book.title}</h3>
                                <h3>by {book.book.author}</h3>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <p>Condition</p>
                                <p>{book.book.condition}</p>
                            </div>

                            <div  className="flex items-center mb-2 border-b pb-2">
                            <img src={book.recipient.imageUrl} alt="Recipient" className="w-10 h-10 rounded-full mr-3 object-cover cursor-pointer"  />
                                         <div>
                                             <p className="font-semibold"> Request by {book.recipient.name}</p>
                                                <p>{book.recipient.email}</p>
                                         </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <Link to={`/home/allbooks/${book.book._id}`}>
                                    <Button text="See Details" />
                                </Link>
                                                            <div className={`flex justify-end items-center mb-2 ${
                                book.status === "approved" && "text-green-500"
                            }`} >
                            {
                                book.status === "approved" && (
                                <p>Request </p>
                                )
                            }
                            <p className=' ml-1 ' > {book.status}</p>
                            </div>


                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Allrequest;
