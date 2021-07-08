const axios = require('./apiHandler');

const authApi = {
    register: (payload) => axios.post('/apis/auth/register', payload),
    getUser: (payload) => axios.get('/apis/auth/getUser', payload),
    login: (payload) => axios.post('/apis/auth/login', payload),
    logout: (payload) => axios.post('/apis/auth/logout', payload),
}

module.exports = authApi;