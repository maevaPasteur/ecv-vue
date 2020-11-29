import API from '@/api/config'

const state = {
    session: null
};

const mutations = {
    POPULATE_SESSION_DATA(state, sessionData) {
        state.session = { ...sessionData };
    },
    UNPOPULATE_SESSION_DATA(state) {
        state.session = null;
    },
    UPDATE_SESSION_FIELDS (state, fieldsToupdate) {
        const newtState = { ...state.session};

        Object.keys(fieldsToupdate).forEach(function (key) {
            if (key === '_id' || key === 'password') return;

            newtState[key] = fieldsToupdate[key];
        });

        state.session = { ...newtState };
    }
};

const actions = {
    login({commit}, user) {
        return new Promise((resolve, reject) => {
            API.post('/login', user)
                .then(res => {
                    if(res && res.data && res.data.userData) {
                        commit('POPULATE_SESSION_DATA', res.data.userData);
                        resolve()
                    } else reject()
                })
                .catch(() => reject())
        })
    },
    register({commit}, user) {
        return new Promise((resolve, reject) => {
            API.post('/register', user)
                .then(res => {
                    if(res && res.data && res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        commit('POPULATE_SESSION_DATA', res.data);
                        resolve(res)
                    } else reject()
                })
                .catch(() => reject())
        })
    }
};

const getters = {};

const session = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

export default session