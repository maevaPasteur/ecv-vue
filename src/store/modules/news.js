import API from '../../api/config'

const state = {
    news: []
};

const mutations = {
    SET_NEWS(state, news) {
        news.forEach(article => article.id = article._id);
        state.news = news
    },
    SET_NEW(state, newItem) {
        const newNews = [...state.news];
        newNews.map((item, index) => {
            if (item.id === newItem.id) return newNews[index] = newItem;
            return item;
        });
        state.news = [...newNews];
    },
    DELETE_NEW(state, id) {
        state.news = [...state.news].filter(e => e.id !== id);
    },
    CREATE_NEW(state, article) {
        article.id = article._id;
        state.news.push(article)
    }
};

const actions = {
    getNews({commit}) {
        API.get('news').then(response => {
            let articles = response.data.sort((a, b) => {
                return new Date(b.published) - new Date(a.published)
            });
            commit('SET_NEWS', articles)
        })
    },
    updateNew({commit}, article) {
        API.patch(`news/${article.id}`, {...article})
            .then(response => commit('SET_NEW', response.data))
    },
    createNew({commit}, article) {
        return new Promise((resolve, reject) => {
            API.post('news', article)
                .then(res => {
                    commit('CREATE_NEW', res.data);
                    resolve(res.data.id)
                })
                .catch(() => reject("Une erreur est survenue lors de la création de l'article. Veuillez recommencer"))
        });
    },
    deleteNew({commit}, id) {
        API.delete(`news/${id}`)
            .then(() => commit('DELETE_NEW', id))
    }
};

const getters = {
    news: state => state.news
};

const news = {
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
};

export default news