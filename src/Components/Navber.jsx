import React, { useEffect, useState } from 'react';
import logo from '../../src/assets/logo.png';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggletheme } from '../Redux/slice';
import { MoonIcon, SunIcon, Cross2Icon, RowsIcon } from '@radix-ui/react-icons';
import Avatardropmanu from './Avatardropmanu';

const Navbar = () => {
    const { theme, login, role } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        console.log(`Login status: ${login}, Role: ${role}`);
    }, [login, role]);
    console.log(role);

    // Define navigation pages based on role
    const guestPages = ['Home','Allbooks','About','Contact','Login'];
    const userPages =  ['Home',, 'Allbooks',  'Requests','Messages','Contact', 'About'];
    const donorPages = ['Home', 'Addbook', 'MyBooks', 'Messages','Contact','About'];
    const adminPages = ['Dashboard'];

    let pages;
    if (!login) {
        pages = guestPages;
    } else if (role === 'donor') {
        pages = donorPages;
    } else if (role === 'admin') {
        pages = adminPages;
    } else {
        pages = userPages;
    }

    return (
        <nav className='w-full flex justify-between items-center px-4 py-2 border-b-2 shadow-2xl nav'>
            {/* Logo */}
            <div className='flex items-center gap-2'>
                <img  width={50} src={logo} alt="Logo" />
            </div>

            {/* Desktop Navigation */}
            <div className='hidden md:flex gap-4'>
                {pages.map((page, index) => (
                    <NavLink key={index} to={`/${page.toLowerCase()}`}>
                        {page}
                    </NavLink>
                ))}
            </div>

            {/* Right Icons */}
            <div className='flex items-center gap-3 '>
                <div
                    onClick={() => dispatch(toggletheme(theme === 'light' ? 'dark' : 'light'))}
                    className="cursor-pointer"
                >
                    {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                </div>
                {login && <Avatardropmanu theme={theme} />}
             {
                role !== 'admin' &&    <RowsIcon className="w-6 h-6 md:hidden cursor-pointer" onClick={() => setMenuOpen(!menuOpen)} />
             }
            </div>

            {/* Mobile Menu */}
            <div className={`fixed w-full h-screen left-0 top-0 z-50 p-4 flex flex-col 
                ${ theme === 'light' ? 'light' : 'dark' }
                
                transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Top Section */}
                <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center'>
                        <img className='w-20' src={logo} alt="Logo" />
                        <span className='font-bold text-lg '>BOOK DONATION</span>
                    </div>
                    <Cross2Icon className='w-6 h-6 cursor-pointer' onClick={() => setMenuOpen(false)} />
                </div>

                {/* Mobile Navigation */}
                <div className='flex flex-col gap-4 text-lg'>
                    {pages.map((page, index) => (
                        <NavLink key={index} to={`/${page.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="hover:text-blue-500">
                            {page}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
