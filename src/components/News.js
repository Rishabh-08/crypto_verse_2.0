import React, { useState } from 'react';
import Select from 'react-select';
import { useRecoilValueLoadable } from 'recoil';
import { cryptoCurrencyQuery } from '../state/selectors/CryptoCurrency';
import NewsList from './NewsList';

const News = ({ simplified }) => {
  const count = 100;
  //BING SEARCH API
  // const newsCount = simplified ? 6 : 12; 
  const newsCount = simplified ? 6 : 10; 
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

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
  const cryptos = cryptoCurrency?.data?.coins;

  const options = cryptos.map(crypto => ({ value: crypto.name, label: crypto.name }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: '100%',
      backgroundColor: '#00df9a',
      border: state.isFocused ? '2px solid #00df9a' : '1px solid #00df9a',
      boxShadow: state.isFocused ? '0 0 0 1px #00df9a' : '0 0 0 1px #00df9a',
      borderRadius: '4px',
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
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      {!simplified && (
        <div className="max-w-2xl mx-auto sm:max-w-xl md:max-w-2xl mb-12">
          <div className="text-center">
            <Select
              options={options}
              placeholder="Select a category"
              styles={customStyles}
              value={newsCategory}
              onChange={(selectedOption) => setNewsCategory(selectedOption)}
            />
          </div>
        </div>
      )}
      <NewsList newsCount={newsCount} newsCategory={newsCategory} />
    </div>
  );
};

export default News;
