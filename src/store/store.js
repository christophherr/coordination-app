import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const store = new Vuex.Store({
    state: {
        isLoggedIn: false,
        userID: null
    },
    mutations: {
        [LOGIN](state) {
            state.isLoggedIn = true;
        },
        [LOGOUT](state) {
            state.isLoggedIn = false;
        },
        setUserID(state, user) {
            state.userID = user;
        }
    },
    actions: {
        login({ commit }) {
            commit(LOGIN);
        },
        logout({ commit }) {
            commit(LOGOUT);
        }
    },
    getters: {
        isLoggedIn: state => {
            return state.isLoggedIn;
        },
        userID: state => {
            return state.userID;
        }
    }
});
