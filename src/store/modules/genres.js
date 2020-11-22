import API from '../../api/config';

const state = {
    genres: []
};

const mutations = {
    SET_GENRES(state, genres) {
        genres.forEach(genre => genre.id = genre._id);
        state.genres = genres
    },
};

const actions = {

    getGenres({commit}) {
        API.get('genres').then(response => {
            commit('SET_GENRES', response.data);
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