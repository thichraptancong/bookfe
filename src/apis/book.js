const axios = require('./apiHandler');

const bookApi = {
    paging: (payload) => axios.post('/apis/books/pagingbook', { condition: payload }),
    findAll: () => axios.post('/apis/books/search'),
    addbook: (payload) => axios.post(`/apis/books/`, payload),
    deletebook: (ID) => axios.delete(`/apis/books/${ID}`),
    updatebook: (ID, payload) => axios.put(`/apis/books/${ID}`, payload),
    getDetail: (ID) => axios.get(`/apis/books/${ID}`),
}

module.exports = bookApi;