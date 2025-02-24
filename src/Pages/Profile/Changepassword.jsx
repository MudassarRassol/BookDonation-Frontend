import React, { useState } from 'react';
import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react'; // Eye icons for toggle
import { useSelector } from 'react-redux';

const ChangePassword = ({ isOpen, onClose }) => {
    const { theme } = useSelector((state) => state.user);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    // ⏩ Handle Cancel Action
    const handleCancel = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setVerificationCode('');
        setIsForgotPassword(false);
        setEmailSent(false);
        setError('');
        setSuccess('');
        onClose(); // Close the modal
    };

    // ⏩ Change Password with old password
    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.put(
                'http://localhost:3000/api/auth/changedpassword',
                { oldpassword: oldPassword, newpassword: newPassword },
                { withCredentials: true }
            );
            setSuccess(response.data.msg);
            setTimeout(() => handleCancel(), 1500); // Close after success
        } catch (error) {
            setError(error.response?.data?.msg || 'Failed to change password');
        }

        setLoading(false);
    };

    // ⏩ Request Reset Code via Email
    const handleForgotPassword = async () => {
        try {
            await axios.post('http://localhost:3000/api/auth/resetPassword', {}, { withCredentials: true });
            setEmailSent(true);
        } catch (error) {
            setError('Failed to send reset email.');
        }
    };

    // ⏩ Verify Reset Code & Update Password
    const handleVerifyCode = async () => {
        if (!verificationCode || !newPassword) {
            setError('Enter verification code and new password.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.put(
                'http://localhost:3000/api/auth/chackvarificationcode',
                { verificationcode: verificationCode, newpassword: newPassword },
                { withCredentials: true }
            );
            setSuccess(response.data.message);
            setTimeout(() => handleCancel(), 1500); // Close after success
        } catch (error) {
            setError(error.response?.data?.message || 'Verification failed.');
        }

        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000056] bg-opacity-50">
            <div className={`p-6 rounded-md shadow-lg w-96 ${theme === 'light' ? 'light' : 'dark'}`}>
                <h2 className="text-xl font-bold mb-4">{isForgotPassword ? "Forgot Password" : "Change Password"}</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}

                {/* Show Reset Form if "Forgot Password" is clicked */}
                {isForgotPassword ? (
                    <>
                        {emailSent ? (
                            <>
                                {/* Verification Code Input */}
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    className="border p-2 w-full mb-2"
                                    placeholder="Enter 4-digit Code"
                                />
                                {/* New Password Input */}
                                <div className="relative mb-2">
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="border p-2 w-full pr-10"
                                        placeholder="Enter New Password"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-3"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {/* Submit Code & Password */}
                                <button
                                    className={`px-4 py-2 rounded w-full mt-2 ${theme === 'light' ? 'darkbutton' : 'lightbutton'}`}
                                    onClick={handleVerifyCode}
                                    disabled={loading}
                                >
                                    {loading ? 'Verifying...' : 'Reset Password'}
                                </button>
                                <button
                                    className={`px-4 py-2 rounded w-full mt-2 ${theme === 'light' ? 'darkbutton' : 'lightbutton'}`}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <p className="text-sm">A reset code will be sent to your email. <br /></p>

                                <button
                                    className={`px-4 py-2 rounded w-full mt-2 ${theme === 'light' ? 'darkbutton' : 'lightbutton'}`}
                                    onClick={handleForgotPassword}
                                    disabled={loading}
                                >
                                    {loading ? 'Sending...' : 'Send Reset Code'}
                                </button>
                                <button
                                    className={`px-4 py-2 rounded w-full mt-2 ${theme === 'light' ? 'darkbutton' : 'lightbutton'}`}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {/* Old Password Input */}
                        <div className="relative mb-2">
                            <input
                                type={showOldPassword ? 'text' : 'password'}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="border p-2 w-full pr-10"
                                placeholder="Enter Old Password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        {/* New Password Input */}
                        <div className="relative mb-2">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="border p-2 w-full pr-10"
                                placeholder="Enter New Password"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                            >
                                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <div className="text-right cursor-pointer" onClick={() => setIsForgotPassword(true)}>
                            Forgot Password?
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                className={`px-4 py-2 rounded ${theme === 'light' ? 'darkbutton' : 'lightbutton'}`}
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                className={`px-4 py-2 rounded ${theme === 'light' ? 'darkbutton' : 'lightbutton'}`}
                                onClick={handleChangePassword}
                                disabled={loading}
                            >
                                {loading ? 'Changing...' : 'Change Password'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ChangePassword;

