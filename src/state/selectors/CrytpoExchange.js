import axios from "axios";
import { selectorFamily } from "recoil";

const cryptoExchangeHeaders = {
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_EXCHANGE_RAPIDAPI_HOST,
};

const baseUrl = process.env.REACT_APP_CRYPTO_EXCHANGE_API_URL;

const createRequest = (endpoint) => ({ url: `${baseUrl}${endpoint}`, headers: cryptoExchangeHeaders });

export const cryptoExchangeQuery = selectorFamily({
    key: 'cryptoExchangeQuery',
    get: () => async () => {
        try {
            const requestConfig = createRequest(`/exchanges`);
            const res = await axios(requestConfig);
            return res.data || [];
        } catch (error) {
            console.error(`Error fetching data: \n${error}`);
            throw error;
        }
    },
});
