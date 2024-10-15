import React, { useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import millify from "millify";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import { AiFillPlusCircle } from "react-icons/ai";
import { cryptoCurrencyQuery } from "../state/selectors/CryptoCurrency";
import { useRecoilValueLoadable } from "recoil";
import { motion, useInView } from "framer-motion";

// Asset Import
import hero from "../assets/hero.png";

const AnimatedSection = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Homepage = () => {
  const cryptoStatsSectionRef = useRef(null);
  const topCryptoSectionRef = useRef(null);
  const count = 10;
  const cryptoCurrencyLoadable = useRecoilValueLoadable(
    cryptoCurrencyQuery(count)
  );

  if (cryptoCurrencyLoadable.state === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#00df9a]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>
      </div>
    );
  }

  if (cryptoCurrencyLoadable.state === "hasError") {
    return <div>Error fetching data</div>;
  }

  const cryptoCurrency = cryptoCurrencyLoadable.contents;
  const cryptoGlobalStats = cryptoCurrency?.data?.stats;

  const handleScrollToCryptoStats = (event) => {
    event.preventDefault();
    const section = cryptoStatsSectionRef.current;
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleScrollToTopCrypto = (event) => {
    event.preventDefault();
    const section = topCryptoSectionRef.current;
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div>
      <AnimatedSection className="relative z-0 isolate px-4 md:px-24 lg:px-8">
        <div className="mx-auto grid py-20 sm:max-w-xl sm:py-28 md:max-w-full lg:max-w-screen-xl lg:grid-cols-2 lg:py-20 xl:py-32">
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-4xl font-bold tracking-tight text-[#00df9a] sm:text-6xl lg:text-5xl xl:text-7xl">
              Exploring Cryptoverse: Your Daily Dose of<br></br>
              <TypeAnimation
                sequence={[
                  "Digital Finance",
                  1000,
                  "Blockchain Yield",
                  1000,
                  "Virtual Money",
                  1000,
                  "Crypto Economics",
                  1000,
                ]}
                speed={30}
                style={{
                  fontSize:
                    window.innerWidth >= 1024 && window.innerWidth < 1440
                      ? "3rem"
                      : window.innerWidth < 768
                      ? "2.25rem"
                      : "4.5rem",
                }}
                repeat={Infinity}
              />
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-100">
              Your daily guide to the ever-changing world of cryptocurrencies -
              Exploring Crypto, where digital finance comes to life.
            </p>
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
              <motion.a
                href="#global-crypto-stats"
                className="relative inline-block text-lg group"
                onClick={handleScrollToCryptoStats}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-[#00df9a]"></span>
                  <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-green-950 group-hover:-rotate-180 ease"></span>
                  <span className="relative text-white">Get Started</span>
                </span>
                <span
                  className="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-green-950 rounded-lg group-hover:mb-0 group-hover:mr-0"
                  data-rounded="rounded-lg"
                ></span>
              </motion.a>
              <motion.a
                href="#top-crypto-currency"
                className="text-sm font-semibold leading-6 text-slate-100"
                onClick={handleScrollToTopCrypto}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Learn More <span aria-hidden="true">→</span>
              </motion.a>
            </div>
          </div>
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img className="w-full object-cover" src={hero} alt="hero-img" />
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div
          className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 min-h-screen flex items-center mt-16 md:mt-0"
          id="global-crypto-stats"
          ref={cryptoStatsSectionRef}
        >
          <div className="grid gap-24 row-gap-8 lg:grid-cols-5 items-center">
            <div className="grid gap-8 lg:col-span-2">
              <div className="text-center md:text-left">
                <p className="mb-2 text-3xl font-bold text-[#00df9a]">
                  Global Crypto Stats
                </p>
                <p className="text-slate-100 text-lg">
                  Global Crypto Stats is your gateway to comprehensive and
                  up-to-the-minute statistics on the world of cryptocurrencies.
                  From market capitalization and trading volume to price trends
                  and adoption rates, we provide a centralized platform to
                  empower your crypto-related decisions with data-driven
                  insights.
                </p>
              </div>
            </div>
            <div className="grid border divide-y rounded lg:col-span-3 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
              <div className="flex flex-col justify-between p-10 space-y-6">
                {[
                  {
                    label: "Total CryptoCurrencies",
                    value: cryptoGlobalStats.total,
                  },
                  {
                    label: "Total Exchanges",
                    value: millify(cryptoGlobalStats.totalExchanges),
                  },
                  {
                    label: "Total Market Cap",
                    value: millify(cryptoGlobalStats.totalMarketCap),
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <p className="text-xl font-semibold text-slate-100 sm:text-base">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold text-[#00df9a] sm:text-xl">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-start p-10 space-y-6">
                {[
                  {
                    label: "Total 24h Volume",
                    value: millify(cryptoGlobalStats.total24hVolume),
                  },
                  {
                    label: "Total Markets",
                    value: millify(cryptoGlobalStats.totalMarkets),
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <p className="text-xl font-semibold text-slate-100 sm:text-base">
                      {item.label}
                    </p>
                    <p className="text-2xl font-bold text-[#00df9a] sm:text-xl">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div
          className="px-4 mt-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 flex flex-col items-center justify-center"
          ref={topCryptoSectionRef}
        >
          <div className="flex items-center justify-between w-full mb-4">
            <h1 className="text-2xl font-bold tracking-tight text-[#00df9a] sm:text-3xl md:text-3xl lg:text-3xl">
              Top 10 Cryptocurrencies
            </h1>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                to="/cryptocurrencies"
                className="text-xl font-bold tracking-tight text-[#00df9a] hover:text-[#1E6649] sm:text-xl"
              >
                <span className="hidden sm:inline">Show More</span>
                <span className="sm:hidden">
                  <AiFillPlusCircle size={24} />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>
      <Cryptocurrencies simplified />

      <AnimatedSection
        className="px-4 mt-20 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 flex flex-col items-center justify-center"
        id="top-crypto-currency"
      >
        <div className="flex items-center justify-between w-full mb-4">
          <h1 className="text-2xl font-bold tracking-tight text-[#00df9a] sm:text-3xl md:text-3xl lg:text-3xl">
            Latest Crypto News
          </h1>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Link
              to="/news"
              className="text-xl font-bold tracking-tight text-[#00df9a] hover:text-[#1E6649] sm:text-xl"
            >
              <span className="hidden sm:inline">Show More</span>
              <span className="sm:hidden">
                <AiFillPlusCircle size={24} />
              </span>
            </Link>
          </motion.div>
        </div>
      </AnimatedSection>
      <News simplified />
    </div>
  );
};

export default Homepage;
