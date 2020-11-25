const state = {
    session: null
};

const mutations = {
    POPULATE_SESSION_DATA(state, sessionData) {
        state.session = { ...sessionData };
    },
    UNPOPULATE_SESSION_DATA(state) {
        state.session = null;
    },
    UPDATE_SESSION_FIELDS (state, fieldsToupdate) {
        const newtState = { ...state.session};

        Object.keys(fieldsToupdate).forEach(function (key) {
            if (key === '_id' || key === 'password') return;

            newtState[key] = fieldsToupdate[key];
        })

        state.session = { ...newtState };
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