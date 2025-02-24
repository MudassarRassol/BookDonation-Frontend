import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { Trash2 } from "lucide-react"; // Import delete icon
import Button from "../../Components/Button";
import { motion } from "framer-motion"
import Loading from "../../Components/Loading";
import nobook from '../../assets/9269766.png'
import Nobookmsg from '../../Components/Nobookmsg';
const Requestedbook = () => {
    const { theme } = useSelector((state) => state.user);
    const [pendingBooks, setPendingBooks] = useState([]);
    const [approvedBooks, setApprovedBooks] = useState([]);
    const [rejectedBooks, setRejectedBooks] = useState([]);
    const [totalRequests, setTotalRequests] = useState(0);
    const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [noBooksMessage, setNoBooksMessage] = useState("");

    useEffect(() => {
        fetchBooks();
    }, [totalRequests]);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "http://localhost:3000/api/user/getmyrequestforbook",
                { withCredentials: true }
            );

            if (response.status === 200) {
                setPendingBooks(response.data.pendingRequests || []);
                setApprovedBooks(response.data.approvedRequests || []);
                setRejectedBooks(response.data.rejectedRequests || []);
                setTotalRequests(response.data.totalRequests || 0);
                setPendingRequestsCount(response.data.pendingRequestsCount || 0);

                if (
                    response.data.pendingRequests.length === 0 &&
                    response.data.approvedRequests.length === 0 &&
                    response.data.rejectedRequests.length === 0
                ) {
                    setNoBooksMessage("No book requests found.");
                }
            } else {
                setNoBooksMessage("No book requests found.");
            }
        } catch (error) {
            console.error("Error fetching books:", error);
            setNoBooksMessage(error.response?.data?.msg || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelRequest = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/user/cancelrequest/${id}`, {
                withCredentials: true,
            });

            setPendingBooks((prevBooks) => prevBooks.filter((book) => book.book._id !== id));
            setPendingRequestsCount((prevCount) => prevCount - 1);
            setTotalRequests((prevCount) => prevCount - 1);
            toast.success("Request canceled successfully");
        } catch (error) {
            console.error("Error canceling request:", error);
            toast.error("Failed to cancel request");
        }
    };

    // const handleDeleteHistory = async (id) => {
    //     console.log(id)
    //     try {
    //         await axios.delete(`http://localhost:3000/api/user/deletehistory/${id}`, {
    //             withCredentials: true,
    //         });

    //         setApprovedBooks((prevBooks) => prevBooks.filter((book) => book.book._id !== id));
    //         setTotalRequests((prevCount) => prevCount - 1);
    //         toast.success("History deleted successfully");
    //     } catch (error) {
    //         console.error("Error deleting history:", error);
    //         toast.error("Failed to delete history");
    //     }
    // };

    return (
        <div className="p-5 mt-3">
            <Toaster position='top-right' />
            <h1 className="text-2xl font-bold mb-4">My Requested Books</h1>

            {
                totalRequests > 0 && (
                    <>
                                {/* Summary Section */}
            <div className=" p-4 rounded-lg shadow-md mb-6">
                <p className="text-lg font-semibold">Total Requests: {totalRequests}</p>
                <p className="text-yellow-500 font-semibold">Pending Requests: {pendingRequestsCount}</p>
            </div>
                    </>
                )
            }

            {loading ? (
              <Loading />
            ) : (
                <>
                    {noBooksMessage && (
                                 <Nobookmsg img={nobook} Nobookmsg={noBooksMessage} />
                    )}

                    {/* Pending Requests */}
                    {pendingBooks.length > 0 && (
                        <Section title="Pending Requests">
                            {pendingBooks.map((book) => (
                                <BookCard
                                    key={book._id}
                                    book={book.book}
                                    status="pending"
                                    onCancel={() => handleCancelRequest(book.book._id)}
                                />
                            ))}
                        </Section>
                    )}

                    {/* Approved Requests (History) */}
                    {approvedBooks.length > 0 && (
                        <Section title="Approved Requests (History)" >
                            {approvedBooks.map((book) => (
                                <BookCard
                                    key={book._id}
                                    book={book.book}
                                    status="approved"
                                    // onDelete={() => handleDeleteHistory(book._id)}
                                />
                            ))}
                        </Section>
                    )}

                    {/* Rejected Requests */}
                    {rejectedBooks.length > 0 && (
                        <Section title="Rejected Requests">
                            {rejectedBooks.map((book) => (
                                <BookCard key={book._id} book={book.book} status="rejected" />
                            ))}
                        </Section>
                    )}
                </>
            )}
        </div>
    );
};

const Section = ({ title, children }) => (
    <div>
        <h2 className="text-xl font-semibold my-4">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {children}
        </div>
    </div>
);

const BookCard = ({ book, status, onCancel, onDelete }) => {
    return (

        <div className=" shadow-2xl rounded-3xl">
            <motion.div
                className="relative p-5 pl-6  transition-all duration-300 flex flex-col rounded-3xl bg-white 
                     before:absolute before:top-0 before:left-0 before:w-[15px] before:h-full before:bg-amber-950
                     before:rounded-l-lg hover:before:shadow-2xl"
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
                    <motion.img
                        src={book.bookphoto || "default-placeholder.jpg"}
                        alt={book.title}
                        className="aspect-[4/3] object-cover rounded-md shadow-lg transition-all duration-300"
                        whileHover={{
                            rotateY: -10, // Simulate the cover opening slightly
                            scale: 1.1,
                        }}
                        style={{ transformOrigin: "left center" }} // Rotate from the left edge
                    />
                    <div className="absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-md shadow-md bg-white">
                        {book.status}
                    </div>
                </Link>

                {/* Book Spine */}
                <motion.div
                    className="absolute top-0 left-0 w-[15px] h-full bg-amber-950 rounded-l-lg shadow-2xl"
                    whileHover={{
                        rotateY: -5, // Slight spine tilt for realism
                    }}
                    style={{ transformOrigin: "left center" }}
                />


                <div className="mt-3 flex items-center justify-between ">
                    <h3 className="font-semibold text-lg">{book.title}</h3>
                    <p className="text-sm ">{book.author}</p>
                </div>

                <div className="flex justify-between items-center my-2">
                    <p className="text-gray-600">Condition:</p>
                    <p className="font-semibold">{book.condition}</p>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <Link to={`/home/allbooks/${book._id}`}>
                        <Button text="See Details" />
                    </Link>

                    {status === "pending" && onCancel && (
                        <Button text="Cancel Request" func={onCancel} />
                    )}

                    {status === "approved" && onDelete && (
                        <button
                            onClick={onDelete}
                            className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition duration-300"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                </div>
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

export default Requestedbook;
