import React from 'react';
import { Avatar, DropdownMenu } from '@radix-ui/themes/dist/cjs/index.js';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { login, image, role, userid, city, varify } from '../Redux/slice';
import { useNavigate } from 'react-router-dom';

const Avatardropmanu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { image, role: userrole, login: userlogin } = useSelector((state) => state.user);

    const donor = ['profile', 'Request'];
    const user = ['profile', 'Watchlist'];
    const guest = ['logout'];
    const admin = [];

    let pages;
    if (!userlogin) {
        pages = guest;
    } else if (userrole === 'donor') {
        pages = donor;
    } else if (userrole === 'admin') {
        pages = admin;
    } else {
        pages = user;
    }

    const handleLogout = async () => {
        try {
            await axios.delete('http://localhost:3000/api/auth/logout', { withCredentials: true });

            // Clear Redux state
            dispatch(login(false));
            dispatch(userid(null));
            dispatch(city(null));
            dispatch(varify(false));
            dispatch(image(''));
            dispatch(role(null));

            // Clear Local Storage
            localStorage.clear();

            toast.success('Logged out successfully');

            // Redirect and force a full page reload to clear everything
        } catch (error) {
            console.error('Logout Error:', error);
        }
        // window.location.href = '/login';
        navigate('/login');
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar size={2} src={image} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                {pages.map((page) => (
                    <DropdownMenu.Item
                        key={page}
                        style={{
                            color: '#5B2333',
                            padding: '10px',
                            cursor: 'pointer',
                            backgroundColor: 'transparent',
                            borderBottom: '1px solid #E2E2E2',
                            fontSize: '16px',
                            fontWeight: '500',
                        }}
                    >
                        <NavLink
                            to={page === 'logout' ? '#' : `/${page}`}
                            onClick={() => {
                                if (page === 'logout') {
                                    handleLogout();
                                }
                            }}
                        >
                            {page}
                        </NavLink>
                    </DropdownMenu.Item>
                ))}
                <DropdownMenu.Item
                    style={{
                        color: '#5B2333',
                        padding: '10px',
                        cursor: 'pointer',
                        backgroundColor: 'transparent',
                        borderBottom: '1px solid #E2E2E2',
                        fontSize: '16px',
                        fontWeight: '500',
                    }}
                >
                    <button className="cursor-pointer" onClick={handleLogout}>
                        Logout
                    </button>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default Avatardropmanu;
