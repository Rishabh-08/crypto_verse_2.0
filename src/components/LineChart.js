import React, { useEffect, useState } from 'react';
import { cryptoHistoryQuery } from '../state/selectors/CryptoCurrency';
import { useRecoilValueLoadable } from 'recoil';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';

const LineChart = ({ coinId, timePeriod, currentPrice, coinName }) => {
    const cryptoHistoryLoadable = useRecoilValueLoadable(cryptoHistoryQuery({ coinId, timePeriod }));
    
    const [cryptoData, setCryptoData] = useState([]);

    useEffect(() => {
        if (cryptoHistoryLoadable.state === 'hasValue') {
            const cryptoHistory = cryptoHistoryLoadable.contents;

            const data = cryptoHistory?.data?.history?.map(item => ({
                timestamp: new Date(item.timestamp * 1000).toLocaleDateString(),
                price: parseFloat(item.price).toFixed(4)
            }));

            setCryptoData(data);
        }
    }, [cryptoHistoryLoadable]);

    console.log(cryptoData);

    return (
        <div>
            {cryptoHistoryLoadable.state === 'loading' && (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#00df9a]"></div>
                </div>
            )}

            {cryptoHistoryLoadable.state === 'hasError' && <p>Error loading crypto details.</p>}

            {cryptoHistoryLoadable.state === 'hasValue' && (
                <div>
                    <div className="flex justify-between items-center mt-4 w-full">
                        <div>
                            <p className="italic text-[#00df9a] text-base font-semibold mb-4">
                                {coinName} Price Chart :
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <p className="italic text-[#00df9a] text-base font-semibold mb-4">
                                Change: {cryptoHistoryLoadable.contents.data.change}%
                            </p>
                            <p className="italic text-[#00df9a] text-base font-semibold mb-4">
                                Current {coinName} Price: $ {currentPrice}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 w-full">
                        <ResponsiveContainer width="100%" height={400}>
                            <RechartsLineChart data={cryptoData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="timestamp" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="price" name={`${coinName} Price`} stroke="#00df9a" />
                                <Brush dataKey="timestamp" height={30} stroke="#00df9a" startIndex={0} endIndex={30} />
                            </RechartsLineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LineChart;