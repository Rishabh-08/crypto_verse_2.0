import axios from "axios";
import { selectorFamily } from "recoil";

const cryptoApiHeaders = {
    'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
};

const baseUrl = process.env.REACT_APP_CRYPTO_API_URL;

const createRequest = (endpoint) => ({ url: `${baseUrl}${endpoint}`, headers: cryptoApiHeaders });

export const cryptoCurrencyQuery = selectorFamily({
    key: 'cryptoCurrencyQuery',
    get: (count) => async () => {
        try {
            const requestConfig = createRequest(`/coins?limit=${count}`);
            const res = await axios(requestConfig);
            return res.data || [];
        } catch (error) {
            console.error(`Error fetching data: \n${error}`);
            throw error;
        }
    },
});

export const cryptoInfoQuery = selectorFamily({
    key: 'cryptoInfoQuery',
    get: (coinId) => async () => {
        try {
            const requestConfig = createRequest(`/coin/${coinId}`);
            const res = await axios(requestConfig);
            return res.data || [];
        } catch (error) {
            console.error(`Error fetching data: \n${error}`);
            throw error;
        }
    },
});

export const cryptoHistoryQuery = selectorFamily({
    key: 'cryptoHistoryQuery',
    get: ({coinId, timePeriod}) => async () => {
        try {
            const requestConfig = createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod.value}`);
            const res = await axios(requestConfig);
            return res.data || [];
        } catch (error) {
            console.error(`Error fetching data: \n${error}`);
            throw error;
        }
    },
});
