import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ArrowBigLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Components/Loading'
import Nobookmsg from '../../../Components/Nobookmsg'
import nouser from '../../../assets/3024051.jpg'
const ReportedUsers = () => {
    const { theme } = useSelector((state) => state.user);
    const [reportedUsers, setReportedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const fetchReportedUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3000/api/admin/getReportedUsers', {
                withCredentials: true
            });

            if (response.data.success && response.data.reportedUsers.length > 0) {
                setReportedUsers(response.data.reportedUsers);
            }   
        } catch (error) {
            console.error("Error fetching reported users:", error);
            setErrorMessage("Failed to fetch reported users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReportedUsers();
    }, []);

    return (
        <div className=' w-[95%] m-auto h-[80vh] '>
            <div className='flex items-center gap-2  mt-10'>
                 <ArrowBigLeft className='w-10 h-10 cursor-pointer' onClick={() => navigate(-1)}/>
                <h2 className='text-2xl font-bold text-center'>Reported Users</h2>
            </div>

            {loading ? (
                <Loading />
            ) : errorMessage ? (
                <p style={{ color: "red" }}>{errorMessage}</p>
            ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10'>
                    {
                    reportedUsers.map((user) => (
                        <div
                        key={user._id}
                        className="relative p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.05] "
                      >
                        {/* Glow Effect */}
                        <div className="absolute -top-6 -right-6 w-16 h-16  rounded-full opacity-20 blur-2xl"></div>
                        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-pink-500 rounded-full opacity-20 blur-2xl"></div>
                      
                        {/* User Header */}
                        <div className="flex items-center gap-4 mb-5">
                          <img
                            src={user.imageUrl || "https://via.placeholder.com/50"}
                            alt="User"
                            className="w-16 h-16 object-cover rounded-full shadow-md border-2 border-white/50 dark:border-gray-700/50"
                          />
                          <div>
                            <h2 className="text-xl font-semibold ">{user.name}</h2>
                            <span className="text-sm px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-800/50 text-blue-600 dark:text-white">
                              {user.role === "donor" ? "📚 Donor" : "🎁 Recipient"}
                            </span>
                          </div>
                        </div>
                      
                        {/* User Details */}
                        <div className="space-y-2  text-[0.95rem]">
                          <p>
                            <strong >📧 Email:</strong> {user.email}
                          </p>
                          <p>
                            <strong >📞 Phone:</strong> {user.phone}
                          </p>
                          <p>
                            <strong>🏡 Address:</strong> {user.address}
                          </p>
                          <p>
                            <strong >🌆 City:</strong> {user.city}
                          </p>
                        </div>
                      
                        {/* Action Button */}
                        <button
                          className="mt-5 w-full py-2 rounded-lg font-semibold transition-all duration-300 bg-gradient-to-r from-amber-950 to-amber-600 dark:shadow-none animate-pulse text-white"
                          onClick={() => navigate(`/admin/userdetails/${user._id}`)}
                        >
                          View Profile
                        </button>
                      </div>
                      
                      
                    ))}
                </div>
            )}

            {
                reportedUsers.length === 0 && !loading && !errorMessage && <Nobookmsg img={nouser} Nobookmsg={"No Reported User"} />
            }
        </div>
    );
};

export default ReportedUsers;
