import React from 'react'
import moment from 'moment'
import { useRecoilValueLoadable } from 'recoil';

import demoImage from '../assets/demo.png';
import { cryptoNewsQuery } from '../state/selectors/CryptoNews';

const NewsList = ({ newsCount, newsCategory }) => {
  const cryptoNewsLoadable = useRecoilValueLoadable(cryptoNewsQuery({ newsCategory, newsCount }));

  if (cryptoNewsLoadable.state === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#00df9a]"></div>
      </div>
    );
  }

  if (cryptoNewsLoadable.state === 'hasError') {
    return <div>Error fetching data</div>;
  }

  if (cryptoNewsLoadable.state === 'hasValue') {
    const cryptoNews = cryptoNewsLoadable.contents;
    return (
      <div className="grid gap-8 row-gap-5 lg:grid-cols-3">
        {cryptoNews.results.map((news, i) => (
          <a href={news.link} target="_blank" rel="noopener noreferrer" className="group" key={i}>
            <div className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl flex flex-col h-full">
              <div className="relative p-5 bg-gray-950 text-gray-50 rounded-sm flex-1">
                <div className="flex ml-1 mb-2 items-center justify-between lg:flex-row">
                  <h6 className="font-semibold text-[#00df9a] text-lg leading-5 mr-4">
                    {news.title}
                  </h6>
                  <img
                    className="w-28 h-20 object-cover rounded-md"
                    src={news?.image_url || demoImage}
                    alt=""
                  />
                </div>
                <div className="mb-2 mt-4 text-sm text-gray-50 space-y-2">
                  <h6 className="font-normal text-sm leading-5">
                    {
                      news.description != null ?
                        JSON.stringify(news.description).length > 100
                          ? `${JSON.stringify(news.description).substring(0, 100)} ...`
                          : JSON.stringify(news.description)
                        : 'Not Available'
                    }
                  </h6>
                </div>
              </div>
              <div className="p-5 bg-gray-950 text-gray-50 rounded-b-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      className="w-10 h-10 rounded-full object-cover mr-2"
                      src={news?.image_url || demoImage}
                      style={{ maxWidth: '40px', maxHeight: '40px' }}
                      alt=""
                    />
                    <div className="flex flex-col">
                      <h6 className="font-normal text-sm leading-5">
                        {news.source_id.toUpperCase()}
                      </h6>
                      <div className="text-xs text-gray-400">
                        Category: {news.category.slice(0, 3).map(category => category.toUpperCase()).join(', ')}
                        {news.category.length > 3 ? '...' : ''}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <h6 className="font-normal text-xs leading-5 mr-4">
                      {moment(news.pubDate).startOf('ss').fromNow()}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    )
  }
  return null;
}

export default NewsList