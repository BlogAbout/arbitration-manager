import axios from 'axios'

const SERVER_URL = 'http://localhost:9000/api/v1';

const AXIOS = axios.create({
    baseURL: SERVER_URL,
    timeout: 5000,
    withCredentials: false
})

AXIOS.interceptors.request.use(
    function(config) {
        const typeAuth = localStorage.getItem('AuthType')
        const token = localStorage.getItem('AuthToken')
        if (typeAuth && token) {
            config.headers["Authorization"] = typeAuth + ' ' + token;
        }
        return config;
    }, function(error) {
        console.log(error)
        return Promise.reject(error);
    }
);

export default AXIOS;