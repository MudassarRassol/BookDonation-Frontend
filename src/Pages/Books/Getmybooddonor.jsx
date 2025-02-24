import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Button from '../../Components/Button';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading';
import BookCard from '../../Components/Bookcard';
import nobook from '../../../src/assets/9269780.png';
const Getmybooddonor = () => {
    const { theme,varify } = useSelector((state) => state.user);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [noBooksMessage, setNoBooksMessage] = useState("");
    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/donor/getmybook', {
                withCredentials: true
            });
            if (response.status === 200) {
                setBooks(response.data.books);
                setNoBooksMessage("");
                console.log(response.data.books);
            } else {
                setNoBooksMessage("You have not added any books yet");
                console.error("Failed to fetch books:", response);
            }
        } catch (error) {
            setNoBooksMessage("You have not added any books yet");
            console.error("Error fetching books:", error.massage);
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="p-5 w-full">
    {varify ? (
        <>

            {loading ? (
                <div>
                    <Loading />
                </div>
            ) : noBooksMessage ? (
                <div className=' h-[82vh] flex  justify-center items-center text-center  ' >
                    <div>
                        <img src={nobook} className=' w-80 h-80 ' alt="" />
                        <p>{noBooksMessage}</p>
                        <Link to="/addbook" className=' p-2 '>
                            <Button text="Add Book" />
                        </Link>

                    </div>
                </div>
            ) : (
                <>                <h1 className="text-2xl font-bold mb-4 pb-10">My Books</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.length > 0 && (
                        books.map((book) => (
                            <BookCard book={book} />
                        ))
                    )}
                </div>
                </>

            )}
        </>
    ) : (
        <div className='flex justify-center items-center h-[80vh]'>
            <p className="text-center text-gray-500 w-full">Please verify your email to add books</p>
        </div>
    )}



</div>

  )
}

export default Getmybooddonor