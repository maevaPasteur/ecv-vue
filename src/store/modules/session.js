const state = {
    session: null
};

const mutations = {
    POPULATE_SESSION_DATA(state, sessionData) {
        state.session = { ...sessionData };
    },
    UNPOPULATE_SESSION_DATA(state) {
        state.session = null;
    }
};

const actions = {

};

const getters = {};

const session = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

export default session