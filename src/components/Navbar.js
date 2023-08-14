import React, { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { SiHomeassistant } from 'react-icons/si';
import { BsCurrencyExchange, BsNewspaper } from 'react-icons/bs';
import { PiCoinsFill } from 'react-icons/pi';
import logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const [nav, setNav] = useState(false);
    const handleNav = () => {
        setNav(!nav);
    }
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setNav(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const isActive = (path) => {
        return location.pathname === path;
    };
    return (
        //max-w-[1240px] -> to restrict width like container of bootstrap
        <div className='flex justify-between items-center h-24 mx-auto px-4 text-white'>
            <a href="/" className="flex items-center">
                {!nav ? <img src={logo} className="h-8 mr-3" alt="Crypto Logo"></img> : <></>}
            </a>
            <ul className='hidden md:flex'>
                <li className={`p-4 ${isActive('/home') ? 'text-[#00df9a] font-medium hover:font-bold' : ''}`}>
                    <Link to="/home" className="flex items-center">
                        <SiHomeassistant size={18} />
                        <span className='ml-1'>Home</span>
                    </Link>
                </li>
                <li className={`p-4 ${isActive('/cryptocurrencies') ? 'text-[#00df9a] font-medium hover:font-bold' : ''}`}>
                    <Link to="/cryptocurrencies" className="flex items-center">
                        <PiCoinsFill size={18} />
                        <span className='ml-1'>Cryptocurrencies</span>
                    </Link>
                </li>
                <li className={`p-4 ${isActive('/news') ? 'text-[#00df9a] font-medium hover:font-bold' : ''}`}>
                    <Link to="/news" className="flex items-center">
                        <BsNewspaper size={18} />
                        <span className='ml-1'>News</span>
                    </Link>
                </li>
                <li className={`p-4 ${isActive('/exchanges') ? 'text-[#00df9a] font-medium hover:font-bold' : ''}`}>
                    <Link to="/exchanges" className="flex items-center">
                        <BsCurrencyExchange size={18} />
                        <span className='ml-1'>Exchanges</span>
                    </Link>
                </li>
            </ul>
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
            <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 z-50' : 'ease-in-out duration-500 fixed left-[-100%] z-0'}>
                <img src={logo} className="h-7 m-8" alt="Crypto Logo"></img>
                <li className={`p-4 border-b border-b-gray-600 ${isActive('/home') ? 'text-white bg-[#00df9a] rounded' : ''}`}>
                    <Link to="/home" className="flex items-center">
                        <SiHomeassistant size={18} />
                        <span className='ml-2'>Home</span>
                    </Link>
                </li>
                <li className={`p-4 border-b border-b-gray-600 ${isActive('/cryptocurrencies') ? 'text-white bg-[#00df9a] rounded' : ''}`}>
                    <Link to="/cryptocurrencies" className="flex items-center">
                        <PiCoinsFill size={18} />
                        <span className='ml-2'>Cryptocurrencies</span>
                    </Link>
                </li>
                <li className={`p-4 border-b border-b-gray-600 ${isActive('/news') ? 'text-white bg-[#00df9a] rounded' : ''}`}>
                    <Link to="/news" className="flex items-center">
                        <BsNewspaper size={18} />
                        <span className='ml-2'>News</span>
                    </Link>
                </li>
                <li className={`p-4 border-b border-b-gray-600 ${isActive('/news') ? 'text-white bg-[#00df9a] rounded' : ''}`}>
                    <Link to="/exchanges" className="flex items-center">
                        <BsCurrencyExchange size={18} />
                        <span className='ml-2'>Exchanges</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar