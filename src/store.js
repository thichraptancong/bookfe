import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
    key: 'my-app',
    storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [vuexPersist.plugin],
    state: {
        barColor: 'rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)',
        barImage: 'https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg',
        drawer: null,
        userInfo: null,
        snackBar: null,
        category: null
    },
    getters: {
        GET_USER_INFO(state) {
            return state.userInfo;
        },
        GET_CATEGORY_INFO(state) {
            return state.category;
        },
        categoryList: state => state.categoryList,
        bookList: state => state.bookList,
        GET_TOKEN(state) {
            return state.userInfo && state.userInfo.token;
        }
    },
    mutations: {
        SET_BAR_IMAGE(state, payload) {
            state.barImage = payload
        },
        SET_DRAWER(state, payload) {
            state.drawer = payload
        },
        SET_SCRIM(state, payload) {
            state.barColor = payload
        },
        SET_USER_INFO(state, payload) {
            state.userInfo = payload
        },
        SET_CATEGORYLIST(state, payload) {
            state.categoryList = payload
        },
        SET_BOOKLIST(state, payload) {
            state.bookList = payload
        },
        RESET_USER_INFO(state) {
            state.userInfo = null
        },
        DELETE_TOKEN(state) {
            state.userInfo = null
        },
        SHOW_TOASK(state, payload) {
            state.snackBar = payload
        }
    },
    actions: {

    }
})