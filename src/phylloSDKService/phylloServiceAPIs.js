import axios from 'axios';

const PHYLLO_BASE_URL = 'https://api.sandbox.insightiq.ai';
const URL_CREATE_USER = '/v1/users';
const URL_CREATE_USER_TOKEN = '/v1/sdk-tokens';
const URL_GET_ACCOUNT = '/v1/social/creators/contents/fetch';

const PHYLLO_CLIENT_ID = 'd631ffa6-0516-48b6-8325-ddaed27bcc7e';
const PHYLLO_SECRET_ID = '3ec6be54-c23d-4424-924f-192ff8f23c22';

const Platform_Linkedin_Url = 'https://www.linkedin.com/in/abhijsagar';
const Platform_Instagram_Url = 'http://instagram.com/abhijsagar';
const Platform_Facebook_Url = 'https://www.facebook.com/abhisagarj';
const Platform_Youtube_Url = 'https://www.youtube.com/channel/UClaNldXykcXHadeWFFdKHng';
const Platform_Twitter_Url = 'https://twitter.com/abhijsagar';
const Platform_Tiktok_Url = 'https://www.tiktok.com/@tiktok';
const Platform_Twitch_Url = 'https://www.twitch.com/@twitch';

const PLATFORM_Linkedin = '36410629-f907-43ba-aa0d-434ca9c0501a'; // 500 Internal Server Error
const PLATFORM_Instagram = '9bb8913b-ddd9-430b-a66a-d74d846e6c66'; // data
const PLATFORM_facebook = 'ad2fec62-2987-40a0-89fb-23485972598c'; // incorrect_work_platform_id
const PLATFORM_Youtube = '14d9ddf5-51c6-415e-bde6-f8ed36ad7054'; // data
const PLATFORM_Twitter = '7645460a-96e0-4192-a3ce-a1fc30641f72'; // incorrect_work_platform_id
const PLATFORM_Tiktok = 'de55aeec-0dc8-4119-bf90-16b3d1f0c987'; 
const PLATFORM_Twitch = 'e4de6c01-5b78-4fc0-a651-24f44134457b'; // incorrect_work_platform_id

const getProfiles = async (userId) => {
    try {
        const api = getAxiosInstance();
        let response = await api.post(`${URL_GET_ACCOUNT}`, {
            profile_url: 'http://instagram.com/abhijsagar',
            content_type: 'REELS',
            work_platform_id: PLATFORM_Instagram,
        });
        return response;
    } catch (err) {
        return err.body;
    }
};

const getAxiosInstance = () => {
    const api = axios.create({
        baseURL: PHYLLO_BASE_URL,
        auth: {
            username: PHYLLO_CLIENT_ID,
            password: PHYLLO_SECRET_ID,
        },
    });
    return api;
};

const createUser = async (username, externalId) => {
    try {
        const userId = localStorage.getItem('PHYLLO_USER_ID');
        if (Boolean(userId)) {
            return userId;
        }
        const api = getAxiosInstance();
        let response = await api.post(URL_CREATE_USER, {
            name: username,
            external_id: externalId,
        });
        localStorage.setItem('PHYLLO_USER_ID', response.data.id);
        return response.data.id;
    } catch (err) {
        return err.body;
    }
};

const createUserToken = async (userId) => {
    try {
        const token = localStorage.getItem('PHYLLO_SDK_TOKEN');
        if (Boolean(token)) {
            return token;
        }
        const api = getAxiosInstance();
        let response = await api.post(URL_CREATE_USER_TOKEN, {
            user_id: userId,
            products: ['IDENTITY', 'ENGAGEMENT'],
        });
        localStorage.setItem('PHYLLO_SDK_TOKEN', response.data.sdk_token);
        return response.data.sdk_token;
    } catch (err) {
        return err.body;
    }
};

export { createUser, createUserToken, getProfiles };
