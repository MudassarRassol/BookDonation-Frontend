import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../../Components/Button';
import { useSelector } from 'react-redux';
const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const { theme } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/auth/getprofiledata', {
                    withCredentials: true,
                });
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchProfileData();
    }, []);

    // const handleSendVerificationEmail = async () => {
    //     try {
    //         await axios.post('http://localhost:3000/api/auth/sendVerificationEmailCode',{},{ withCredentials: true });
    //         setIsModalOpen(true);
    //     } catch (error) {
    //         console.error('Error sending verification email:', error);
    //     }
    // };

    // const handleVerifyCode = async () => {
    //     console.log(verificationCode)
    //     try {
    //         const response = await axios.post(
    //             'http://localhost:3000/api/auth/varifyemailcode',
    //             { verificationcode: verificationCode },
    //             { withCredentials: true }
    //         );

    //         alert(response.data.message);
    //         setIsModalOpen(false);
    //         window.location.reload();
    //     } catch (error) {
    //         console.error('Error verifying email:', error);
    //         alert(error.response?.data?.message || 'Verification failed');
    //     }
    // };

    if (!profileData) return <div>Loading...</div>;

    return (
        <div className="bg-gradient-to-b from-brown-900 to-brown-800 p-4">
            <div className="mx-auto w-[95%] md:w-[80%]">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Profile Information</h1>
                    <p>Detailed information about your profile</p>
                </div>

                <div className="backdrop-blur-sm border-none p-4 shadow-2xl rounded-2xl">
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

                <div className="mt-2 flex justify-center">
                    {profileData.status === 'verified' ? (
                        <Button text="Change Password" />
                    ) : (
                        <Button text="Verify Email for More Settings" handleSendVerificationEmail={handleSendVerificationEmail} />
                    )}
                </div>
{/* 
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50  ">
                        <div className={`p-6 rounded-md shadow-lg m-2 ${theme === 'light' ? 'light' : 'dark'} `}>
                            <h2 className="text-xl font-bold mb-4">Email Verification</h2>
                            <p>A verification code has been sent to your email.</p>
                            <input
                                type="text"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                maxLength={4}
                                className="border border-gray-300 p-2 mt-2 w-full"
                                placeholder="Enter 4-digit code"
                            />
                            <div className="flex justify-end gap-4 mt-4">
                                <button className="bg-red-500 text-white p-2 rounded" onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                                <button className="bg-blue-500 text-white p-2 rounded" onClick={handleVerifyCode}>
                                    Verify
                                </button>
                            </div>
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default Profile;
