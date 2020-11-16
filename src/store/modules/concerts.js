import API from '../../api/config'

const state = {
    concerts: []
};

const mutations = {
    SET_CONCERTS(state, concerts) {
        state.concerts = concerts
    },
    DELETE_CONCERT(state, id) {
        state.concerts = [...state.concerts].filter(e => e.id !== id);
    },
};

const actions = {
    deleteConcert({commit}, id) {
        API.delete(`concert/${id}`).then(() => {
            commit('DELETE_CONCERT', id);
        })
    },
    getConcerts({ commit }) {
        API.get('concerts')
            .then(response => {
                let concerts = response.data.sort((a,b) => {
                    return new Date(b.date) - new Date(a.date)
                });
                commit('SET_CONCERTS', concerts);
            })
    },
    // eslint-disable-next-line no-unused-vars
    getConcert({commit}, id) {
        return new Promise(resolve => {
            API.get(`concerts/${id}`).then(response => {
                resolve(response.data)
            })
        })
    }
};

const getters = {
    concerts: state => state.concerts
};

const concerts = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

export default concerts