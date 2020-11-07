import API from '../../api/config'

const state = {
    artists: []
};

const mutations = {
    SET_ARTISTS(state, artists) {
        state.artists = artists
    }
};

const actions = {
    getArtists({commit}) {
        API.get('artists').then(response => {
            const artists = response.data.sort((a, b) => {
                return b.likes - a.likes
            });
            commit('SET_ARTISTS', artists)
        })
    },
    // eslint-disable-next-line no-unused-vars
    getArtist({commit}, id) {
        return new Promise(resolve => {
            API.get(`artists/${id}`).then(response => {
                resolve(response.data)
            })
        })
    }
};

const getters = {
    artists: state => state.artists
};

const artists = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

export default artists