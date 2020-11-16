import API from '../../api/config'

const state = {
    news: []
};

const mutations = {
    SET_NEWS(state, news) {
        state.news = news
    },
    SET_NEW(state, newItem) {
        const newNews = [ ...state.news];
        newNews.map(function (n, index) {
            if (n.id === newItem.id) return newNews[index] = newItem;
            return n;
        });
        state.news = [ ...newNews ];
    },
    DELETE_NEW(state, id) {
        state.news = [...state.news].filter(e => e.id !== id);
    },
    CREATE_NEW(state, article) {
        state.news.push(article)
    }
};

const actions = {
    async updateNew({commit}, news) {
        const newArticle = await API.patch(`news/${news.id}`, { ...news });
        commit('SET_NEW', newArticle.data);
    },
    deleteNew({commit}, id) {
        API.delete(`news/${id}`).then(() => {
            commit('DELETE_NEW', id);
        })
    },
    createNew({commit}, article) {
        return new Promise((resolve, reject) => {
            API.post('news', article).then(res => {
                commit('CREATE_NEW', res.data);
                resolve(res.data.id)
            }).catch(() => reject("Une erreur est survenue lors de la création de l'article. Veuillez recommencer"))
        });
    },
    getNews({commit}) {
        API.get('news')
            .then(response => {
                let articles = response.data.sort((a,b) => {
                    return new Date(b.published) - new Date(a.published)
                });
                commit('SET_NEWS', articles)
            })
    },
    // eslint-disable-next-line no-unused-vars
    getNew({commit}, id) {
        return new Promise(resolve => {
            API.get(`news/${id}`).then(response => {
                resolve(response.data)
            })
        })
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