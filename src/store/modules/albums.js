import API from "../../api/config";

const state = {
    albums: []
};

const mutations = {
    SET_ALBUMS(state, albums) {
        albums.forEach(album => album.id = album._id);
        state.albums = albums
    },
    SET_ALBUM(state, album) {
        const albums = [...state.albums];
        albums.forEach((item, index) => {
            if (item.id === album.id) albums[index] = album
        });
        state.albums = [...albums];
    },
    DELETE_ALBUM(state, id) {
        state.albums = [...state.albums].filter(album => album.id !== id);
    },
    CREATE_ALBUM(state, album) {
        album.id = album._id;
        state.albums.push(album)
    }
};

const actions = {
    getAlbums({commit}) {
        API.get('albums')
            .then(response => commit('SET_ALBUMS', response.data))
    },
    updateAlbum({commit}, album) {
        API.patch(`albums/${album.id}`, {...album})
            .then(response => commit('SET_ALBUM', response.data))
    },
    createAlbum({commit}, album) {
        return new Promise((resolve, reject) => {
            API.post('albums', album)
                .then(res => {
                    commit('CREATE_ALBUM', res.data);
                    resolve(res.data.id)
                })
                .catch(() => reject("Une erreur est survenue lors de la création de l'album. Veuillez recommencer"))
        });
    },
    deleteAlbum({commit}, id) {
        API.delete(`albums/${id}`)
            .then(() => commit('DELETE_ALBUM', id))
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