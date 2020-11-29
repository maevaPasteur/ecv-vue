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
    UPDATE_SESSION_FIELDS (state, fieldsToUpdate) {
        const newtState = { ...state.session};
        Object.keys(fieldsToUpdate).forEach(function (key) {
            if (key === '_id' || key === 'password') return;
            newtState[key] = fieldsToUpdate[key];
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
    },
    logout({commit}) {
      API.delete('logout', {withCredentials: true})
          .then(() => {
              localStorage.removeItem('token');
              commit('UNPOPULATE_SESSION_DATA')
          })
    },
    tryLogin({commit}) {
        API.get('/user')
            .then(res => {
                if(res.statusText === 'OK') {
                    commit('POPULATE_SESSION_DATA', res.data);
                } else localStorage.removeItem('token')
            })
            .catch(() => {
                localStorage.removeItem('token')
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