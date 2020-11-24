import API from '../../api/config'

const state = {
    artists: []
};

const mutations = {
    SET_ARTISTS(state, artists) {
        artists.forEach(artist => artist.id = artist['_id']);
        state.artists = artists
    },
    SET_ARTIST(state, artist) {
        const artists = [...state.artists];
        artists.forEach((item, index) => {
            if (item.id === artist.id) artists[index] = artist
        });
        state.artists = [...artists];
    },
    DELETE_ARTIST(state, id) {
        state.artists = [...state.artists].filter(artist => artist.id !== id);
    },
    CREATE_ARTIST(state, artist) {
        artist.id = artist._id;
        state.artists.push(artist)
    }
};

const actions = {
    getArtists({commit}) {
        new Promise(resolve => {
            API.get('artists').then(response => {
                const artists = response.data.sort((a, b) => {
                    return b.likes - a.likes
                });
                commit('SET_ARTISTS', artists);
                resolve(artists)
            })
        })
    },
    updateArtist({commit}, artist) {
        return new Promise(resolve => {
            API.patch(`artists/${artist._id}`, artist)
                .then(response => {
                    commit('SET_ARTIST', response.data);
                    resolve(response.data)
                })
        })
    },
    createArtist({commit}, artist) {
        return new Promise((resolve, reject) => {
            API.post('artists', artist)
                .then(res => {
                    commit('CREATE_ARTIST', res.data);
                    resolve(res.data.id)
                })
                .catch(() => reject("Une erreur est survenue lors de la création de l'artiste. Veuillez recommencer"))
        });
    },
    deleteArtist({commit}, id) {
        return new Promise((resolve, reject) => {
            API.delete(`artists/${id}`)
                .then(() => {
                    commit('DELETE_ARTIST', id);
                    resolve()
                })
                .catch(err => reject(err))
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