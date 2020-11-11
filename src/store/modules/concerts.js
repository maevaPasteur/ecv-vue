import API from '../../api/config'

const state = {
    concerts: [],
    nextConcerts: []
};

const mutations = {
    SET_CONCERTS(state, concerts) {
        state.concerts = concerts
    },
    SET_NEXT_CONCERTS(state, concerts) {
        state.nextConcerts = concerts
    }
};

const actions = {
    getConcerts({ commit }) {
        API.get('concerts')
            .then(response => {
                let concerts = response.data;

                // Trier du + au - récent
                concerts.sort(function (a, b) {
                    let date = a.date.split('/');
                    const c = new Date(`${date[1]}/${date[0]}/${date[2]}`);
                    date = b.date.split('/');
                    const d = new Date(`${date[1]}/${date[0]}/${date[2]}`);
                    return d - c;
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
    },
    getNextConcerts({ commit }) {
        API.get('concerts')
            .then(response => {

                let concerts = response.data;
                let nextConcerts = [];
                const today = new Date();

                // On récupère les concerts aux dates non passées
                concerts.forEach(concert => {
                    let date = concert.date.split('/');
                    date = new Date(`${date[1]}/${date[0]}/${date[2]}`);
                    if(date >= today) {
                        nextConcerts.push(concert)
                    }
                });

                // Trier par date par ordre croissant
                nextConcerts.sort(function (a, b) {
                    let date = a.date.split('/');
                    const c = new Date(`${date[1]}/${date[0]}/${date[2]}`);
                    date = b.date.split('/');
                    const d = new Date(`${date[1]}/${date[0]}/${date[2]}`);
                    return d - c;
                });

                commit('SET_NEXT_CONCERTS', nextConcerts)
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