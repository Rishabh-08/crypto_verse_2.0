import React from 'react';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

const Footer = () => {
    return (

        <footer className="bg-white rounded-lg shadow dark:bg-gray-950 m-4">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between mb-4">
                    <Link to="/home" className="flex justify-center items-center mb-4 sm:mb-0">
                        <img src={Logo} className="h-8 mr-3" alt="Logo" />
                    </Link>
                    <ul className="flex flex-wrap items-center justify-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <Link to="/home" className="flex items-center">
                                <span className='text-gray-300 mr-4 hover:underline md:mr-6'>Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cryptocurrencies" className="flex items-center">
                                <span className='text-gray-300 mr-4 hover:underline md:mr-6'>CryptoCurrencies</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/news" className="flex items-center">
                                <span className='text-gray-300 mr-4 hover:underline md:mr-6'>News</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/exchanges" className="flex items-center">
                                <span className='text-gray-300 mr-4 hover:underline md:mr-6'>Exchanges</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex justify-center items-center">
                    <div className="max-w-full text-center border border-dashed border-[#00df9a] rounded-lg p-4">
                        <p className="italic text-[#00df9a] text-lg font-semibold mb-4">
                            "Unlocking the Future: Embrace Crypto, Empower Digital Finance."
                        </p>
                        <p className="text-gray-300 italic">- Rishabh Jamnal</p>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-100 sm:text-center mb-4 text-center">© {new Date().getFullYear()} All Rights Reserved. Created By: Rishabh Jamnal</span>
                <div className="flex justify-center items-center mt-4 space-x-4 sm:mt-0">
                    <Link
                        to="https://www.linkedin.com/in/jamnal-rishabh/"
                        target="_blank" rel="noopener noreferrer"
                        className="text-[#00df9a] transition-colors duration-300 hover:text-teal-accent-400"
                    >
                        <FaLinkedin size={22} />
                    </Link>
                    <Link
                        to="mailto:rishabhjamnal97@gmail.com"
                        className="text-[#00df9a] transition-colors duration-300 hover:text-teal-accent-400"
                    >
                        <BiLogoGmail size={22} />
                    </Link>
                    <Link
                        to="https://github.com/Rishabh-08"
                        target="_blank" rel="noopener noreferrer"
                        className="text-[#00df9a] transition-colors duration-300 hover:text-teal-accent-400"
                    >
                        <FaGithubSquare size={22} />
                    </Link>
                </div>
            </div>
        </footer>


    );
};

export default Footer;