import React, { useRef } from 'react'
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom'
import millify from 'millify';
import Cryptocurrencies from './Cryptocurrencies'
import News from './News';
import { AiFillPlusCircle } from 'react-icons/ai';
import { cryptoCurrencyQuery } from '../state/selectors/CryptoCurrency';
import { useRecoilValueLoadable } from 'recoil';

const Homepage = () => {
  const cryptoStatsSectionRef = useRef(null);
  const topCryptoSectionRef = useRef(null);
  const count = 10; 
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
  const cryptoGlobalStats = cryptoCurrency?.data?.stats;

  const handleScrollToCryptoStats = (event) => {
    event.preventDefault();
    const section = cryptoStatsSectionRef.current;
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleScrollToTopCrypto = (event) => {
    event.preventDefault();
    const section = topCryptoSectionRef.current;
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const isMobile = window.innerWidth < 768;
  const fontSize = isMobile ? '2.25rem' : '3.75rem';

  return (
    <>
      <div className="relative z-0 isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-20 sm:py-28 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#00df9a] sm:text-6xl">
              Exploring Cryptoverse: Your Daily Dose of{' '}<br></br>
              <TypeAnimation
                sequence={['Digital Finance', 1000, 'Crypto Monetization', 1000, 'Virtual Money', 1000, 'Crypto Economics', 1000]}
                speed={30}
                style={{ fontSize: fontSize }}
                repeat={Infinity}
              />
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-100">Your daily guide to the ever-changing world of cryptocurrencies - Exploring Crypto, where digital finance comes to life.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a href="#global-crypto-stats" className="rounded-md bg-[#00df9a] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1E6649] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleScrollToCryptoStats}>
                Get started
              </a>
              <a href="#top-crypto-currency" className="text-sm font-semibold leading-6 text-slate-100" onClick={handleScrollToTopCrypto}>Learn more <span aria-hidden="true">→</span></a>
            </div>
          </div>
        </div>
      </div>
      <div id="global-crypto-stats" ref={cryptoStatsSectionRef} className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 h-screen flex items-center mt-16 md:mt-0">
        <div className="grid gap-24 row-gap-8 lg:grid-cols-5 items-center">
          <div className="grid gap-8 lg:col-span-2">
            <div className="text-center md:text-left">
              <p className="mb-2 text-3xl font-bold text-[#00df9a]">Global Crypto Stats</p>
              <p className="text-slate-100 text-lg">
                Global Crypto Stats is your gateway to comprehensive and up-to-the-minute statistics on the world of cryptocurrencies. From market capitalization and trading volume to price trends and adoption rates, we provide a centralized platform to empower your crypto-related decisions with data-driven insights.
              </p>
            </div>
          </div>
          <div className="grid border divide-y rounded lg:col-span-3 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
            <div className="flex flex-col justify-between p-10 space-y-6">
              <div>
                <p className="text-xl font-semibold text-slate-100 sm:text-base">
                  Total CryptoCurrencies
                </p>
                <p className="text-2xl font-bold text-[#00df9a] sm:text-xl">
                  {cryptoGlobalStats.total}
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold text-slate-100 sm:text-base">
                  Total Exchanges
                </p>
                <p className="text-2xl font-bold text-[#00df9a] sm:text-xl">
                  {millify(cryptoGlobalStats.totalExchanges)}
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold text-slate-100 sm:text-base">
                  Total Market Cap
                </p>
                <p className="text-2xl font-bold text-[#00df9a] sm:text-xl">
                  {millify(cryptoGlobalStats.totalMarketCap)}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-start p-10 space-y-6">
              <div>
                <p className="text-xl font-semibold text-slate-100 sm:text-base">
                  Total 24h Volume
                </p>
                <p className="text-2xl font-bold text-[#00df9a] sm:text-xl">
                  {millify(cryptoGlobalStats.total24hVolume)}
                </p>
              </div>
              <div>
                <p className="text-xl font-semibold text-slate-100 sm:text-base">
                  Total Markets
                </p>
                <p className="text-2xl font-bold text-[#00df9a] sm:text-xl">
                  {millify(cryptoGlobalStats.totalMarkets)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 mt-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-[#00df9a] sm:text-3xl md:text-3xl lg:text-3xl">
            Top 10 Cryptocurrencies
          </h1>
          <Link
            to="/cryptocurrencies"
            className="text-xl font-bold tracking-tight text-[#00df9a] hover:text-[#1E6649] sm:text-xl"
          >
            <span className="hidden sm:inline">
              Show More
            </span>
            <span className="sm:hidden">
              <AiFillPlusCircle size={24} />
            </span>
          </Link>
        </div>
      </div>
      <Cryptocurrencies simplified />
      <div id="top-crypto-currency" ref={topCryptoSectionRef} className="px-4 mt-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 flex flex-col items-center justify-center">
        <div className="flex items-center justify-between w-full mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-[#00df9a] sm:text-3xl md:text-3xl lg:text-3xl">
            Latest Crypto News
          </h1>
          <Link
            to="/news"
            className="text-xl font-bold tracking-tight text-[#00df9a] hover:text-[#1E6649] sm:text-xl"
          >
            <span className="hidden sm:inline">
              Show More
            </span>
            <span className="sm:hidden">
              <AiFillPlusCircle size={24} />
            </span>
          </Link>
        </div>
      </div>
      <News simplified />
    </>
  )
}

export default Homepage;