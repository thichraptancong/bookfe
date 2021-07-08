const axios = require('./apiHandler');

const usersApi = {
    paging: (payload) => axios.post('/apis/users/paginguser', { condition: payload }),
    update: (userID, payload) => axios.put(`/apis/users/${userID}`, payload),
    adduser: (payload) => axios.post(`/apis/users/`, payload),
    deleteuser: (ID) => axios.delete(`/apis/users/${ID}`),
    findAll: () => axios.get('/apis/users/search'),
    getDetail: (ID) => axios.get(`/apis/users/${ID}`),
}

module.exports = usersApi;