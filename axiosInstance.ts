import axios from "axios";
import Cookies from 'js-cookies';

const axiosInstance = axios.create();


axiosInstance.interceptors.request.use((config) => {
    const { toHeader } = useSessionCookie();
    config.headers = {
        ...config.headers,"Authorization": Cookies.get('token'),
        ...toHeader()
    }

    return config
})

export default axiosInstance
