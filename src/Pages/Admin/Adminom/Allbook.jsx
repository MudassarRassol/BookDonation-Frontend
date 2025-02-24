import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Button from '../../../Components/Button';
import { Link } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BookCard from '../../../Components/Bookcard';
import Loading from '../../../Components/Loading';
import Nobookmsg from '../../../Components/Nobookmsg'
import nobook from '../../../assets/9269766.png'
const Allbooks = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const searchRef = useRef(null);
    const [status, setStatus] = useState("");
    const [condition, setCondition] = useState("");
    const [noBooksMessage, setNoBooksMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { theme, city,login } = useSelector((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            let response;

                response = await axios.get(`http://localhost:3000/api/user/getallbooks`, {
                    withCredentials: true
                });
            if (response.status === 200) {
                setBooks(response.data.books);
                setFilteredBooks(response.data.books);
                setNoBooksMessage("");
            } else {
                console.error("Failed to fetch books:", response);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    const searchBook = async (searchValue) => {

        // trim
        searchValue = searchValue.trim();
        if (!searchValue) return;
        setLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/api/admin/searchbook`,
                { name: searchValue },
                { withCredentials: true }
            );
            if (response.status === 200 && response.data.books.length > 0) {
                setFilteredBooks(response.data.books);
                setNoBooksMessage("");
            } else {
                setFilteredBooks([]);
                setNoBooksMessage(`No books found with name "${searchValue}".`);
            }
        } catch (err) {
            console.error("Error searching books:", err);
            if (err.response && err.response.status === 404) {
                setFilteredBooks([]);
                setNoBooksMessage(err.response.data.message);
            } else {
                setNoBooksMessage("An error occurred while fetching books.");
            }
        } finally {
            setLoading(false);
        }

        if(searchValue === ""){
            fetchBooks();
        }
            

    };

    const fetchBooksByStatus = async (selectedStatus) => {
        setStatus(selectedStatus);
        if (!selectedStatus) {
            setFilteredBooks(books);
            setNoBooksMessage("");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/admin/getbookbyavailability/${selectedStatus}`, {
                withCredentials: true
            });

            if(response.status === 404){
                setNoBooksMessage(response.data.message);
            }

            if (response.status === 200 && response.data.books.length > 0) {
                setFilteredBooks(response.data.books);
                setNoBooksMessage("");
            } else {
                setFilteredBooks([]);
                setNoBooksMessage(`No books found with status "${selectedStatus}".`);
            }
        } catch (error) {
            console.error("Error fetching books by status:", error);
            if (error.response && error.response.status === 404) {
                setFilteredBooks([]);
                setNoBooksMessage(error.response.data.message);
            } else {
                setNoBooksMessage("An error occurred while fetching books.");
            }

        } finally {
            setLoading(false);
        }
    };

    const fetchBooksByCondition = async (selectedCondition) => {
        setCondition(selectedCondition);
    
        // If no condition is selected, reset the book list
        if (!selectedCondition) {
            setFilteredBooks(books);
            setNoBooksMessage("");
            return;
        }
    
        setLoading(true);
        try {
            // ✅ Corrected GET request with both condition and city in the URL
            const response = await axios.get(
                `http://localhost:3000/api/admin/getbookbycondition/${selectedCondition.toLowerCase()}`,
                { withCredentials: true }
            );


            if(response.status === 404){
                setNoBooksMessage(response.data.message);
            }
    
            if (response.status === 200 && response.data.books.length > 0) {
                setFilteredBooks(response.data.books);
                setNoBooksMessage("");
            } else {
                setFilteredBooks([]);
            }
        } catch (error) {
            console.error("Error fetching books by condition:", error);
    
            if (error.response && error.response.status === 404) {
                setFilteredBooks([]);
                setNoBooksMessage(error.response.data.message);
            } else {
                setNoBooksMessage("An error occurred while fetching books.");
            }
        } finally {
            setLoading(false);
        }
    };
    

    const fetchBooksByCategory = async (selectedCondition) => {
        setCondition(selectedCondition);
        if (!selectedCondition) {
            setFilteredBooks(books);
            setNoBooksMessage("");
            return;
        }
        setLoading(true);
        try {
            let category = selectedCondition.toLowerCase();
            const response = await axios.get(`http://localhost:3000/api/admin/getbooksbycategory/${category}`, {
                withCredentials: true
            });
            
            if (response.status === 200 && response.data.books.length > 0) {
                setFilteredBooks(response.data.books);
                setNoBooksMessage("");
            } else {
                setFilteredBooks([]);
                setNoBooksMessage(`No books found with condition `);
            }
        } catch (error) {
            console.error("Error fetching books by condition:", error);
            if (error.response && error.response.status === 404) {
                setFilteredBooks([]);
            } else {
                setNoBooksMessage("An error occurred while fetching books.");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="  h-screen m-4 ">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4  p-4">
                <div className='text-center md:text-left ' >
                <div className='flex items-center gap-2'>
                    <ArrowBigLeft className='w-10 h-10 cursor-pointer' onClick={() => navigate(-1)}/>
                    <h2 className="text-3xl font-bold">All Books</h2>
                </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search books..."
                        ref={searchRef}
                        onChange={(e) => searchBook(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && searchBook()}
                        className={`border-b-2 outline-none p-2 w-full sm:w-64 `}
                    />
                </div>
            </div>
            {
                login && (
                    <div className='flex gap-2 p-2 overflow-x-auto'>
                    <select
                        value={status}
                        onChange={(e) => fetchBooksByStatus(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md outline-none cursor-pointer"
                    >
                        <option value="">All Books</option>
                        <option value="available">Available</option>
                        <option value="requested">Requested</option>
                        <option value="donated">Donated</option>
                    </select>
                    <select
                        value={condition}
                        onChange={(e) => fetchBooksByCondition(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md outline-none cursor-pointer"
                    >
                        <option value="">All Conditions</option>
                        {['new', 'good', 'fair', 'poor'].map((cond) => (
                            <option key={cond} value={cond}>{cond}</option>
                        ))}
                    </select>
                    <select
                        value={condition}
                        onChange={(e) => fetchBooksByCategory(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md outline-none cursor-pointer"
                    >
                        <option value="">All Category</option>
                        {['fiction', 'non-fiction', 'academic', 'children'].map((cond) => (
                            <option key={cond} value={cond}>{cond}</option>
                        ))}
                    </select>
    
                </div>
                )
            }
            {loading ? (
                <Loading/>
            ) : noBooksMessage ? (
                <p className="text-center text-gray-500 w-full">
                   <Nobookmsg img={nobook} Nobookmsg={Nobookmsg} />
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-2 mt-4">
                    {filteredBooks.map((book) => (
                        <BookCard book={book} />
                    ))}
                </div>
            )}




        </div>
    );
};

export default Allbooks;
