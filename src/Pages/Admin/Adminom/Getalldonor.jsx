import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeft } from 'lucide-react';
import Loading from '../../../Components/Loading'
import Nobookmsg from '../../../Components/Nobookmsg'
import nouser from '../../../assets/836.jpg'
const getalldonor = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useSelector((state) => state.user);
    const navigate = useNavigate();
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/admin/getalldonor', {
        withCredentials: true
      });
      setUsers(response.data.users);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error fetching users');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const [name, setSearch] = useState('');

  const handleSearch = async (name) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/admin/searchdonor/${name}`, {
        withCredentials: true,
      });
      console.log(response)
      setUsers(response.data.users);
      if (response.data.users.length === 0) {
        setError('No users found');
      }
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error searching for user');
    } finally {
      setLoading(false);
    }
    if(name === ''){
      fetchUsers();
    }
  };

  return (
    <div className="p-6 mx-auto mt-3 h-screen ">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 ">
       <div className='flex items-center gap-2'>
       <ArrowBigLeft className='w-10 h-10 cursor-pointer' onClick={() => navigate(-1)}/>
       <h1 className="text-3xl font-bold text-left ">Donor List</h1>
       </div>
        <input 
          type="search"
          placeholder="Search User"
          className="p-2 rounded-lg outline-none border-b-2 mt-10 sm:mt-0"
          onChange={(e) => handleSearch(e.target.value)}
          // value={name}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>
      {loading ? (
       <Loading/>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : users.length === 0 ? (
        <Nobookmsg img={nouser} Nobookmsg={"No Donor"} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {users.map((user) => (
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
    </div>
  );
};

export default getalldonor;
