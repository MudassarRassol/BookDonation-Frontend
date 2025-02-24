import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from './Button';
import Loading from './Loading';
import BookCard from './Bookcard';
const DonorProfile = () => {
    const { id } = useParams();
    const [donor, setDonor] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDonorProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/seedonorprofile/${id}`);
                if (response.data.success) {
                    setDonor(response.data.donor);
                    setBooks(response.data.books);
                    console.log(response);
                } else {
                    setError(response.data.message);
                }
            } catch (err) {
                setError("Failed to fetch donor profile");
                console.error("Error fetching donor profile:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDonorProfile();
    }, [id]);

    if (loading) return <div>
        <Loading/>
    </div>;
    if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

    return (
        <div className="p-6 max-w-8xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6 ">Donor Profile</h2>
            <div className=" p-6 rounded-lg shadow-lg flex flex-col sm:flex-row gap-6 items-center">
                <img src={donor.profilephoto} alt={donor.name} className="w-48 h-48 object-cover rounded-full shadow-lg" />
                <div className='flex flex-col gap-3 text-lg'>
                    <p><strong>Name:</strong> {donor.name}</p>
                    <p><strong>Email:</strong> {donor.email}</p>
                    <p><strong>City:</strong> {donor.city}</p>
                </div>
            </div>
            <h3 className="text-3xl font-semibold mt-8 ">Donated Books</h3>
            {books.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
                    {books.map((book) => (
                        <BookCard book={book} />
                    ))}
                </div>
            ) : (
                <p className="mt-6 text-center text-lg text-gray-600">No books donated by this user.</p>
            )}
        </div>
    );
};

export default DonorProfile;