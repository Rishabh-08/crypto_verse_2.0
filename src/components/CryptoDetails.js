import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';

import { useRecoilValueLoadable } from 'recoil';
import { cryptoInfoQuery } from '../state/selectors/CryptoCurrency';

import { HiCurrencyDollar, HiOutlineHashtag, HiOutlineRefresh } from 'react-icons/hi';
import { AiTwotoneThunderbolt, AiFillStop } from 'react-icons/ai';
import { SiMarketo } from 'react-icons/si';
import { GiTrophy } from 'react-icons/gi';
import { BsGraphUpArrow, BsFillPatchExclamationFill, BsFillCollectionFill, BsFillPatchCheckFill } from 'react-icons/bs';
import { FaExchangeAlt } from 'react-icons/fa';
import cryptoInfo from '../assets/crypto_info.png';
import LineChart from './LineChart';

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState({value: '7d', label: '7d'});
  const cryptoDetailsLoadable = useRecoilValueLoadable(cryptoInfoQuery(coinId));

  if (cryptoDetailsLoadable.state === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#00df9a]"></div>
      </div>
    );
  }

  if (cryptoDetailsLoadable.state === 'hasError') {
    return <p>Error loading crypto details.</p>;
  }

  if (cryptoDetailsLoadable.state === 'hasValue') {
    const cryptoDetails = cryptoDetailsLoadable.contents?.data?.coin;

    const stats = [
      { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <HiCurrencyDollar size={18} /> },
      { title: 'Rank', value: cryptoDetails?.rank, icon: <HiOutlineHashtag size={18} /> },
      { title: '24h Volume', value: `$ ${cryptoDetails?.["24hVolume"] && millify(cryptoDetails?.["24hVolume"])}`, icon: <AiTwotoneThunderbolt size={18} /> },
      { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <SiMarketo size={18} /> },
      { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <GiTrophy size={18} /> },
    ];

    const genericStats = [
      { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <BsGraphUpArrow size={18} /> },
      { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <FaExchangeAlt size={18} /> },
      { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <BsFillPatchCheckFill size={18} /> : <AiFillStop size={18} />, icon: <BsFillPatchExclamationFill size={18} /> },
      { 
        title: 'Total Supply', 
        value: `${cryptoDetails?.supply?.total ? '$'+(millify(cryptoDetails?.supply?.total)) : 'N/A'}`, 
        icon: <BsFillCollectionFill size={18} />
      },
      { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <HiOutlineRefresh size={18} /> },
    ];

    const time = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];
    const timeOptions = time.map(date => ({ value: date, label: date }));

    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        width: '20%',
        backgroundColor: '#00df9a',
        border: state.isFocused ? '2px solid #00df9a' : '1px solid #00df9a',
        boxShadow: state.isFocused ? '0 0 0 1px #00df9a' : '0 0 0 1px #00df9a',
        borderRadius: '4px',
        '@media (max-width: 768px)': {
          width: '100%',
        }
      }),
      singleValue: (provided) => ({
        ...provided,
        color: 'black',
        fontWeight: 'bold'
      }),
      placeholder: (provided) => ({
        ...provided,
        color: 'black',
        fontWeight: 'bold'
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? '#00df9a' : '#030712',
        color: state.isSelected ? '#030712' : '#fff',
        '&:hover': {
          backgroundColor: state.isSelected ? '#00df9a' : '#00df9a',
        },
        padding: '10px 15px',
      }),
      menu: provided => ({
        ...provided,
        borderLeft: '1px solid white',
        borderRight: '1px solid white',
        borderRadius: '4px',
      })
    };

    return (
      <div className="flex flex-col items-center justify-center px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="w-full mb-4 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-[#00df9a] sm:text-3xl md:text-3xl lg:text-3xl">
            {cryptoDetails.name} ({cryptoDetails.symbol}) Price
          </h1>
        </div>
        <div className="w-full mb-4 text-center">
          <h1 className="text-lg font-bold tracking-tight text-[#00df9a] sm:text-xl md:text-xl lg:text-xl">
            {cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.
          </h1>
        </div>
        <hr className="border-t w-full border-white mt-4 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4 mb-4">
          <div className="col-span-1 flex">
            <div className="flex justify-center items-center">
              <div className="max-w-full text-center border-4 border-double border-[#00df9a] rounded-lg p-4 md:text-left flex-grow h-full">
                <p className="italic text-[#00df9a] text-lg font-semibold mb-4">
                  What is {cryptoDetails.name}?
                </p>
                <p className="text-gray-300">{HTMLReactParser(cryptoDetails.description)}</p>
                <img
                  className="w-45 h-45 object-cover rounded-md"
                  src={cryptoInfo}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="col-span-1 flex">
            <div className="flex justify-center items-center">
              <div className="max-w-full text-center border-4 border-double border-[#00df9a] rounded-lg p-4 md:text-left flex-grow h-full">
                <p className="italic text-[#00df9a] text-lg font-semibold mb-4">
                  {cryptoDetails.name} Links :
                </p>
                <table className="table-fixed w-full">
                  <tbody>
                    {cryptoDetails.links?.map((link, i) => (
                      <tr key={i}>
                        <td width="60%" className="py-2 px-4 text-[#00df9a] text-left break-all">{link.type.toUpperCase()}</td>
                        <td width="40%" className="py-2 px-4 text-gray-300 text-left text-sm lg:text-lg break-all"><a href={link.url} className="hover:text-[#00df9a]" target="_blank" rel="noreferrer">{link.name}</a></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4 mb-4">
          <div className="col-span-1 flex">
            <div className="flex justify-center items-center">
              <div className="max-w-full text-center border-4 border-double border-[#00df9a] rounded-lg p-4 md:text-left flex-grow h-full">
                <p className="italic text-[#00df9a] text-lg font-semibold mb-2">
                  {cryptoDetails.name} Value Statistics :
                </p>
                <p className="italic text-[#00df9a] text-sm font-normal mb-4">
                  An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.
                </p>
                <table className="table-fixed w-full">
                  <tbody>
                    {stats.map(({ icon, title, value }, i) => (
                      <tr key={i} className="border-b border-gray-500 last:border-b-0">
                        <td width="70%" className="py-4 px-4 text-[#00df9a] text-left break-all">
                          <div className="inline-flex items-center">
                            {icon}&nbsp;{title}
                          </div>
                        </td>
                        <td width="30%" className="py-4 px-4 text-gray-300 text-left text-xs lg:text-lg break-all">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-span-1 flex">
            <div className="flex justify-center items-center">
              <div className="max-w-full text-center border-4 border-double border-[#00df9a] rounded-lg p-4 md:text-left flex-grow h-full">
                <p className="italic text-[#00df9a] text-lg font-semibold mb-2">
                  Other Stats Info :
                </p>
                <p className="italic text-[#00df9a] text-sm font-normal mb-4">
                  An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.
                </p>
                <table className="table-fixed w-full">
                  <tbody>
                    {genericStats.map(({ icon, title, value }, i) => (
                      <tr key={i} className="border-b border-gray-500 last:border-b-0">
                        <td width="70%" className="py-4 px-4 text-[#00df9a] text-left break-all">
                          <div className="inline-flex items-center">
                            {icon}&nbsp;{title}
                          </div>
                        </td>
                        <td width="30%" className="py-4 px-4 text-gray-300 text-left text-xs lg:text-lg break-all">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Graphical Representation */}
        <div className="grid grid-cols-1 gap-4 w-full mt-4 mb-4">
          <div className="max-w-full">
            <div className="flex justify-center items-center">
              <div className="text-center md:text-left flex-grow h-full">
                <p className="italic text-[#00df9a] text-lg font-semibold mb-4">
                  Graphical Data for {cryptoDetails.name}
                </p>
                <div className='text-center border-4 border-double border-[#00df9a] rounded-lg p-4 md:text-left flex-grow h-full'>
                  <Select
                    defaultValue={timePeriod}
                    options={timeOptions}
                    placeholder="Select a category"
                    styles={customStyles}
                    onChange={(selectedOption) => setTimePeriod(selectedOption)}
                  />
                  <div className="w-full">
                    <LineChart coinId={coinId} timePeriod={timePeriod} currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export default CryptoDetails;
