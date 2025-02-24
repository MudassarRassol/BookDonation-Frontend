import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { LucideMessageSquareText } from 'lucide-react';
import { Link } from 'react-router';
import Loading from './Loading';
import Nobookmsg from './Nobookmsg';
import nobook from '../assets/9269780.png'
const Donormangerequest = () => {
    const [books, setBooks] = useState([]);
    const [requests, setRequests] = useState({});
    const [loading, setLoading] = useState(false);
    const [updating, setUpdating] = useState(null);
    const [processing,setprocessing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/donor/getallrequestforbook`, { withCredentials: true });
            if (response.status === 200) {
                setBooks(response.data.data);
                setRequests({
                    Totalrequest: response.data.data.totalRequests,
                    pendingRequestsCount: response.data.data.pendingRequestsCount,
                    approvedRequestsCount: response.data.data.approvedRequestsCount,
                    rejectedRequestsCount: response.data.data.rejectedRequestsCount
                });
            }
        } catch (error) {
            toast.error("Error fetching data");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (donationId, newStatus) => {
        setprocessing(true);
        setUpdating(donationId);
        try {
            await axios.post(`http://localhost:3000/api/donor/manageDonationRequest/${donationId}`, { status: newStatus }, { withCredentials: true });
            setprocessing(false);
            fetchRequests();
            toast.success(`Request ${newStatus} successfully!`);
        } catch {
            toast.error("Failed to update request");
        } finally {
            setUpdating(null);
        }
    };

    const createConversation = async (receiverId) => {
        try {
            await axios.post(`http://localhost:3000/api/messages/createconversation`, { receiverId }, { withCredentials: true });
            navigate(`/messages`);
        } catch {
            toast.error("Error creating conversation");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold mb-6">Donor Requests</h1>

            {loading ? <Loading/> : <>
            {
                requests.Totalrequest > 0 ? 
                <div className="shadow-md rounded-lg overflow-hidden">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 text-left text-amber-950">Total</th>
                            <th className="p-3 text-yellow-500">Pending</th>
                            <th className="p-3 text-green-500">Approved</th>
                            <th className="p-3 text-red-500">Rejected</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-3">{requests.Totalrequest}</td>
                            <td className="p-3 text-yellow-500">{requests.pendingRequestsCount}</td>
                            <td className="p-3 text-green-500">{requests.approvedRequestsCount}</td>
                            <td className="p-3 text-red-500">{requests.rejectedRequestsCount}</td>
                        </tr>
                    </tbody>
                </table>
            </div> : <Nobookmsg img={nobook} Nobookmsg={"No Request Yet"} />
            }
            </>}

            {['pendingRequests', 'approvedRequests', 'rejectedRequests'].map((statusKey) => (
                books[statusKey]?.length > 0 && (
                    <div key={statusKey}>
                        <h2 className="text-2xl font-semibold mt-6 capitalize">{statusKey.replace('Requests', '')} Requests</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
                            {books[statusKey].map((book) => (
                                <div key={book._id} className="rounded-lg shadow-md p-4 relative">
                                    
                                    <Link  to={`/home/allbooks/${book.book._id}`}>
                                    <img src={book.book.bookphoto} alt="Book Cover" className="w-full h-48 object-cover rounded-md cursor-pointer" />
                                    </Link>
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold">{book.book.title}</h3>
                                        <p className="text-gray-500">Requested on: {new Date(book.createdAt).toLocaleDateString()}</p>
                                        <div className="mt-4 flex items-center">
                                            
                                            <img src={book.recipient.imageUrl} alt="Recipient" className="w-10 h-10 rounded-full mr-3 object-cover cursor-pointer"  />
                                         

                                            <div>
                                                <p className="font-semibold">{book.recipient.name}</p>
                                                <button onClick={() => createConversation(book.recipient._id)} className="text-blue-500 hover:text-blue-700 flex items-center">
                                                    <LucideMessageSquareText className="w-5 h-5 mr-1" /> Chat
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <p className={`text-sm font-medium ${statusKey.includes('pending') ? 'text-yellow-500' : statusKey.includes('approved') ? 'text-green-500' : 'text-red-500'}`}>
                                                Status: {book.status}
                                            </p>
                                           {
                                             processing ? <p>
                                                 <div className="lds-spinner">
                                                   loading...
                                                   </div>
                                             </p> : 
                                             <>
                                              {statusKey === 'pendingRequests' && (
                                                <select
                                                    className="border px-3 py-1 rounded-md"
                                                    value={book.status}
                                                    onChange={(e) => handleStatusChange(book._id, e.target.value)}
                                                    disabled={updating === book._id}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="approved">Approve</option>
                                                    <option value="rejected">Reject</option>
                                                </select>
                                            )}
                                             </>
                                           }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default Donormangerequest;
