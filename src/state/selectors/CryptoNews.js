import axios from "axios";
import { selectorFamily } from "recoil";

const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
    'x-rapidapi-host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
};

const baseUrl = process.env.REACT_APP_NEWS_API_URL;

const createRequest = (endpoint) => ({ url: `${baseUrl}${endpoint}`, headers: cryptoNewsHeaders });

export const cryptoNewsQuery = selectorFamily({
    key: 'cryptoNewsQuery',
    get: ({ newsCategory, newsCount }) => async () => {
        try {
            const requestConfig = createRequest(`/news/search?q=${newsCategory.value !== undefined ? newsCategory.value: 'Cryptocurency'}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${newsCount}`);
            const res = await axios(requestConfig);
            return res.data || [];
        } catch (error) {
            console.error(`Error fetching data: \n${error}`);
            throw error;
        }
    },
});
