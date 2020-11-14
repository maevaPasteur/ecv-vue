import API from '../../api/config';

const state = {
    genres: []
};

const mutations = {
    SET_GENRES(state, genres) {
        state.genres = genres
    },
};

const actions = {

    getGenres({commit}) {
        API.get('genres').then(response => {
            commit('SET_GENRES', response.data);
        })
    },

    // eslint-disable-next-line no-unused-vars
    getGenre({commit}, id) {
        return new Promise(resolve => {
            API.get(`genres/${id}`)
                .then(response => {
                    resolve(response.data)
                })
        })
    }
};

const getters = {
    genres: state => state.genres
};

const genres = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

export default genres