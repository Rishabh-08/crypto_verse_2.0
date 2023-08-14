import React, { useState } from 'react'
import millify from 'millify';
import { useRecoilValueLoadable } from 'recoil';

import { cryptoExchangeQuery } from '../state/selectors/CrytpoExchange';
import { CgWebsite } from 'react-icons/cg';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import twitterLogo from '../assets/twitter-logo.png';


const Exchange = () => {
    const ITEMS_PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedRows, setExpandedRows] = useState([]);

    const toggleRowExpansion = (index) => {
        if (expandedRows.includes(index)) {
            setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
        } else {
            setExpandedRows([index]);
        }
        // else {
        //     setExpandedRows([...expandedRows, index]);
        // }
    };

    const cryptoExchangeLoadable = useRecoilValueLoadable(cryptoExchangeQuery());

    if (cryptoExchangeLoadable.state === 'loading') {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#00df9a]"></div>
            </div>
        );
    }

    if (cryptoExchangeLoadable.state === 'hasError') {
        return <div>Error fetching data</div>;
    }
    if (cryptoExchangeLoadable.state === 'hasValue') {
        const cryptoExchangeInfo = cryptoExchangeLoadable.contents;
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedData = cryptoExchangeInfo.slice(startIndex, endIndex);

        return (
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="max-w-2xl mx-auto sm:max-w-xl md:max-w-2xl mb-12">
                    <div className="text-center">
                        <p className="mb-2 text-3xl font-bold text-[#00df9a]">Exchange Rates</p>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 min-w-max relative">
                        <thead className="text-xs text-[#00df9a] uppercase bg-gray-50 dark:bg-gray-800 dark:text-[#00df9a]">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    S.No.
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Reported Rank
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    24h Trade Volume
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Markets
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Links
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((exchangeInfo, i) => (
                                <React.Fragment key={i}>
                                    <tr className="bg-white dark:bg-gray-900 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer" onClick={() => toggleRowExpansion(i)}>
                                        <td className="px-6 py-4 text-gray-50">
                                            {i + 1}
                                        </td>
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <div>
                                                <div className="text-base font-semibold text-[#00df9a] flex items-center">
                                                    {exchangeInfo.name}
                                                    {expandedRows.includes(i) ? (
                                                        <IoIosArrowUp className="ml-1 text-[#00df9a]" size={18} />
                                                    ) : (
                                                        <IoIosArrowDown className="ml-1 text-[#00df9a]" size={18} />
                                                    )}
                                                </div>
                                                <div className="font-normal">
                                                    Status :
                                                    <span className="ml-2" style={{
                                                        padding: '1px 4px',
                                                        backgroundColor: exchangeInfo.active === true ? '#299875' : '#a72323',
                                                        borderRadius: '4px',
                                                        fontSize: '0.7rem',
                                                        fontWeight: 600,
                                                        color: exchangeInfo.active === true ? '#fff' : '#fff'
                                                    }}>
                                                        {exchangeInfo.active === true ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4 text-gray-50 text-center">
                                            {exchangeInfo.reported_rank != null ? exchangeInfo.reported_rank : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-50 text-center">
                                            {exchangeInfo.quotes != null ? '$' + millify(exchangeInfo.quotes.USD.reported_volume_24h) : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {exchangeInfo.markets != null ? exchangeInfo.markets : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 text-gray-50">
                                            {exchangeInfo.links !== null ? (
                                                <div className="flex flex-col">
                                                    {exchangeInfo.links.twitter && (
                                                        <a
                                                            href={exchangeInfo.links.twitter[0]}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            title="Twitter"
                                                            className="text-[#ffffff] hover:text-[#a4a5a6] transition-colors duration-300 flex items-center space-x-1 text-xs md:text-base"
                                                        >
                                                            Twitter <img
                                                                className="w-4 h-4 object-cover p-0.5 rounded-md ml-4 mr-1 bg-gray-200"
                                                                src={twitterLogo}
                                                                alt=""
                                                            /> : {exchangeInfo.links.twitter[0]}
                                                        </a>
                                                    )}

                                                    {exchangeInfo.links.website && (
                                                        <a
                                                            href={exchangeInfo.links.website[0]}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            title="Website"
                                                            className="text-[#00df9a] hover:text-[#00bf87] transition-colors duration-300 flex items-center space-x-1 text-xs md:text-base"
                                                        >
                                                            Website <CgWebsite className="ml-2 mr-1" size={18} /> : {exchangeInfo.links.website[0]}
                                                        </a>
                                                    )}
                                                </div>
                                            ) : (
                                                'N/A'
                                            )}
                                        </td>
                                    </tr>
                                    {expandedRows.includes(i) && (
                                        <tr
                                            className={`bg-gray-50 border-4 border-double border-[#00df9a] dark:bg-gray-950 transform transition-transform ${
                                                expandedRows.includes(i) ? 'scale-y-100' : 'scale-y-0'
                                            }`}
                                        >
                                            <td colSpan={6} className="p-6">
                                                <p className="text-left text-lg text-[#00df9a] font-medium break-words">
                                                    {exchangeInfo.name} Description :
                                                </p>
                                                <p className="text-gray-700 dark:text-gray-300">
                                                    {exchangeInfo.description !==  '' ? exchangeInfo.description: 'Not Available'}
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                    <nav className="sticky bottom-0 left-0 z-10 flex items-center justify-between pt-4 dark:bg-gray-800 p-3" aria-label="Table navigation">
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                            Showing <span className="font-semibold text-gray-900 dark:text-white">
                                {startIndex + 1}-{Math.min(endIndex, cryptoExchangeInfo.length)}
                            </span> of <span className="font-semibold text-gray-900 dark:text-white">{cryptoExchangeInfo.length}</span>
                        </span>
                        <ul className="inline-flex -space-x-px text-sm h-8">
                            <li>
                                <button
                                    className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-[#00df9a] dark:hover:bg-gray-700 dark:hover:text-white"
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    Previous
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-[#00df9a] dark:hover:bg-gray-700 dark:hover:text-white"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={paginatedData.length < ITEMS_PER_PAGE}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
    return null;
}

export default Exchange