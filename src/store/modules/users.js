import API from '../../api/config'

const state = {};

const mutations = {};

const actions = {

    // eslint-disable-next-line no-unused-vars
    getUser({commit}, id) {
        return new Promise(resolve => {
            API.get(`users/${id}`)
                .then(response => {
                    resolve(response.data)
                })
        })
    }
};

const getters = {};

const users = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

export default users