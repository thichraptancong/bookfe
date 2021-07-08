const axios = require('./apiHandler');

const categoriesApi = {
    paging: (payload) => axios.post('/apis/categories/pagingcate', { condition: payload }),
    findAll: () => axios.post('/apis/categories/search'),
    addcate: (payload) => axios.post(`/apis/categories/`, payload),
    deletecate: (ID) => axios.delete(`/apis/categories/${ID}`),
    update: (ID, payload) => axios.put(`/apis/categories/${ID}`, payload),
    getDetail: (ID) => axios.get(`/apis/categories/${ID}`),
}
module.exports = categoriesApi;