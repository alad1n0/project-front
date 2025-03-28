import axios from 'axios'

import {API_URL} from "@/config/api/api.config";
import {tostik} from "@/utils/tostik/tostik";

const instance = axios.create({
    baseURL: API_URL,
})

instance.interceptors.request.use(async config => {
    console.log(
        '< REQUEST >',
        config.url,
        config.params,
        config.data,
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
        tostik.error(error?.response?.data?.message || error.message)

        if (error.response?.status === 401)
            localStorage.removeItem('auth-storage');

        throw error?.response?.data || error.message;
    },
);

export default instance