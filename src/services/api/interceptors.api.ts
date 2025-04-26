import axios from 'axios'

import { API_URL } from "@/config/api/api.config";
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: API_URL,
})

instance.interceptors.request.use(async config => {
    if (typeof window !== "undefined") {
        const accessToken = localStorage.getItem('access_token');
        const sessionId = Cookies.get('session');

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        if (sessionId) {
            config.params = { ...config.params, sessionId };
        }
    }

    console.log(
        '< REQUEST >',
        config.method,
        config.url,
        config.params,
        config.data,
        config.headers,
        API_URL
    )
    return config
})

instance.interceptors.response.use(
    config => {
        console.log('< RESPONSE >', config.data.data)
        return config
    },
    async error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('access_token');

            const refreshToken = Cookies.get('refresh_token');

            if (refreshToken) {
                try {
                    const response = await axios.post(`http://localhost:4044/api/auth/refresh`, { refreshToken });
                    const { access_token } = response.data.data;

                    localStorage.setItem('access_token', access_token);

                    error.config.headers['Authorization'] = `Bearer ${access_token}`;
                    return axios(error.config);
                } catch (refreshError) {
                    Cookies.remove('refresh_token');
                    throw refreshError;
                }
            } else {
                window.location.href = '/';
            }
        }

        throw error?.response?.data || error.message;
    },
);

export default instance