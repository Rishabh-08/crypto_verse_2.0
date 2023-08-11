import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { cryptoCurrencyQuery } from '../state/selectors/CryptoCurrency';
import millify from 'millify';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10:100;
  const [searchTerm, setSearchTerm] = useState('');
  const cryptoCurrencyLoadable = useRecoilValueLoadable(cryptoCurrencyQuery(count));

  if (cryptoCurrencyLoadable.state === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#00df9a]"></div>
      </div>
    );
  }

  if (cryptoCurrencyLoadable.state === 'hasError') {
    return <div>Error fetching data</div>;
  }

  const cryptoCurrency = cryptoCurrencyLoadable.contents;
  const cryptos = cryptoCurrency?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      {!simplified && (<div className="max-w-2xl mx-auto sm:max-w-xl md:max-w-2xl mb-12">
        <div className="text-center">
          <form className="flex w-full mb-4 md:flex-row md:px-16" onSubmit={(e) => e.preventDefault()}>
            <input
              placeholder="Search your Crypto Currency"
              required=""
              type="text"
              className="flex-grow w-40 h-10 px-2 mb-3 transition duration-200 text-gray-950 bg-[#00df9a] border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline placeholder-black"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>
      </div>)}
      <div className="grid gap-8 row-gap-5 lg:grid-cols-4">
        {cryptos?.map((currency) => (
          <div className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <div className="relative p-5 bg-gray-950 text-gray-50 rounded-sm">
                <div className="flex mb-2 items-center justify-between lg:flex-row">
                  <h6 className="font-semibold text-xl leading-5">{`${currency.rank}. ${currency.name}`}</h6>
                  <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full lg:mb-0">
                    <img className='crypto-image' src={currency.iconUrl} alt="Crypto Icon" />
                  </div>
                </div>
                <ul className="mb-2 text-sm text-gray-50 space-y-2">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-[#00df9a] mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 4a1 1 0 112 0v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p>Price : {millify(currency.price)}</p>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-[#00df9a] mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 4a1 1 0 112 0v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p>Market Cap : {millify(currency.marketCap)}</p>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-[#00df9a] mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 4a1 1 0 112 0v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <p>Daily Change : {millify(currency.change)}%</p>
                  </li>
                </ul>
                <p className="inline-flex items-center text-sm font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800">Learn more</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cryptocurrencies