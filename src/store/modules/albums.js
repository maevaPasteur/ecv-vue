import API from "../../api/config";

const state = {
    albums: []
};

const mutations = {
    SET_ALBUMS(state, albums) {
        state.albums = albums
    }
};

const actions = {

    getAlbums({commit}) {
        API.get('albums').then(response => {
            commit('SET_ALBUMS', response.data);
        })
    },

    // eslint-disable-next-line no-unused-vars
    geAlbumsByArtist({commit}, id) {
        return new Promise(resolve => {
            API.get('albums')
                .then(response => {
                    resolve(response.data.filter(e => e.artistId === id))
                })
        })
    }
};

const getters = {
    albums: state => state.albums
};

const albums = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

export default albums