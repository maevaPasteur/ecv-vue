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
    ADD_NEW_COMMENT (state, newComment) {
        const newNews = [ ...state.news ];
        const newsById = newNews.findIndex(item => item._id === newComment.articleId);

        newNews[newsById].comments.push(newComment.commentData);
        state.news = [ ...newNews ];
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
        return new Promise(resolve => {
            API.get('news').then(response => {
                let articles = response.data.sort((a, b) => {
                    return new Date(b.published) - new Date(a.published)
                });
                commit('SET_NEWS', articles);
                resolve(articles)
            })
        })
    },
    updateNew({commit}, article) {
        return new Promise(resolve => {
            API.patch(`news/${article.id}`, {...article})
                .then(response => {
                    commit('SET_NEW', response.data);
                    resolve()
                })
        })
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
        return new Promise(((resolve, reject) => {
            API.delete(`news/${id}`)
                .then(() => {
                    commit('DELETE_NEW', id);
                    resolve()
                })
                .catch(err => reject(err))
        }))
    },
    addComment({commit}, data) {
        API.patch(`news/comment/${data.id}`, {userId: data.userId, content: data.content})
            .then(res => commit('ADD_NEW_COMMENT', {articleId: data.id, commentData: res.data}))

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