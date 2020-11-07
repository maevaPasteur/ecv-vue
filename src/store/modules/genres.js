import API from '../../api/config';

const state = {
    genres: []
};

const mutations = {};

const actions = {
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