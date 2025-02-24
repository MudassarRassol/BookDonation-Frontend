import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { ArrowBigLeftDash } from 'lucide-react';
import Button from '../../../Components/Button';
import Loading from '../../../Components/Loading';
const UserDetailsById = () => {
    const {id} = useParams();
    const [profileData, setProfileData] = useState(null);   
     const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/api/admin/getUserDetailsById/${id}`, {
                    withCredentials: true,
                });
                setProfileData(response.data.user);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }

        };
        fetchProfileData();
    }, [profileData]);

    const handleBlockUser = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/admin/blockuser/${id}`, {
                withCredentials: true,
            });
            console.log(response)
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    }

    const handleUnblockUser = async () => {
        try {
            const response = await axios.delete(`http://localhost:3000/api/admin/unblockuser/${id}`, {
                withCredentials: true,
            });
            console.log(response)
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    }


    
    if (!profileData) return <Loading/>;

    return ( 
        <div className="bg-gradient-to-b from-brown-900 to-brown-800 p-2  flex flex-col md:flex-row md:items-center  mt-4 ">
            <div className='flex items-center cursor-pointer'   onClick={() => navigate(-1)} >
            <ArrowBigLeftDash className='  scale-150 ml-10 cursor-pointer '  />
            <p className='text-2xl font-bold ml-10'>Go Back</p>
            </div>
            <div className="mx-auto w-[95%] md:w-[80%]">
                <div className="backdrop-blur-sm border-none p-4 shadow-2xl rounded-2xl">
                    <div className='flex flex-col md:flex-row justify-between items-center mb-3 ' >
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">User Information</h1>
                        <p>Detailed information about your profile</p>
                    </div>
                    <div className='flex gap-4 justify-center' >
                     {
                        profileData.account === 'active' ? <Button text={'Block User'} func={handleBlockUser} /> : <Button text={'Unblock User'} func={handleUnblockUser} />
                     }
                    </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div className="w-32 h-32 md:w-52 md:h-52 rounded-md shadow-2xs overflow-hidden flex-shrink-0">
                            <img
                                src={profileData.imageUrl || "https://example.com/default-profile.png"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex-1 w-full border-l-2 p-2">
                            <div className="w-full mb-6">
                                <div className="flex justify-between items-center mb-4 border-b-2 space-y-2 text-2xl">
                                    <span>Profile Data</span>
                                    <span>+</span>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between mb-4">
                                    <span>Name:</span>
                                    <span>{profileData.name}</span>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between  mb-4">
                                    <span className="">Email:</span>
                                    <span className="break-all">{profileData.email}</span>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between  mb-4">
                                    <span className="">Phone:</span>
                                    <span>{profileData.phone}</span>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between  mb-4">
                                    <span className="">Address:</span>
                                    <span>{profileData.address}</span>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between  mb-4">
                                    <span className="">City:</span>
                                    <span>{profileData.city}</span>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between  mb-4">
                                    <span className="">Report by :</span>
                                    <span className={`
                                        ${profileData.report === 0 ? 'text-green-400' : 'text-red-400'}
                                        `} >{profileData.report} User</span>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between  mb-4">   
                                    <span className="">Account Status:</span>
                                    <span className={`
                                        ${profileData.account === 'active' ? 'text-green-400' : 'text-red-400'}
                                        `} >{profileData.account}</span>
                                </div>
                            </div>

                            <div className="w-full mb-6">
                                <div className="flex justify-between items-center mb-4 border-b-2 space-y-2 text-2xl">
                                    <span>Role & Status</span>
                                    <span>+</span>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between mb-4">
                                    <span>Role:</span>
                                    <span>{profileData.role}</span>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between mb-4">
                                    <span>Status:</span>
                                    <span className={profileData.status === 'verified' ? 'text-green-400' : 'text-red-400'}>
                                        {profileData.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex flex-col md:flex-row gap-8 items-center md:items-start'></div>
        </div>
    );
};

export default UserDetailsById;
