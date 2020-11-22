import API from '../../api/config'

const state = {
    concerts: []
};

const mutations = {
    SET_CONCERTS(state, concerts) {
        concerts.forEach(concert => concert.id = concert._id);
        state.concerts = concerts
    },
    SET_CONCERT(state, concert) {
        const concerts = [...state.concerts];
        concerts.forEach((item, index) => {
            if (item.id === concert.id) concerts[index] = concert;
        });
        state.concerts = [...concerts];
    },
    DELETE_CONCERT(state, id) {
        state.concerts = [...state.concerts].filter(concert => concert.id !== id);
    },
    CREATE_CONCERT(state, concert) {
        concert.id = concert._id;
        state.concerts.push(concert)
    }
};

const actions = {
    getConcerts({commit}) {
        API.get('concerts').then(response => {
            let concerts = response.data.sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            });
            commit('SET_CONCERTS', concerts);
        })
    },
    updateConcert({commit}, concert) {
        API.patch(`concerts/${concert.id}`, {...concert})
            .then(response => commit('SET_CONCERT', response.data))
    },
    createConcert({commit}, concert) {
        return new Promise((resolve, reject) => {
            API.post('concerts', concert)
                .then(res => {
                    commit('CREATE_CONCERT', res.data);
                    resolve(res.data.id)
                })
                .catch(() => reject("Une erreur est survenue lors de la création du concert. Veuillez recommencer"))
        });
    },
    deleteConcert({commit}, id) {
        API.delete(`concerts/${id}`)
            .then(() => commit('DELETE_CONCERT', id))
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