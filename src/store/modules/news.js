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
    }
};

const actions = {
    async updateNew({commit}, news) {
        const newArticle = await API.patch(`news/${news.id}`, { ...news });
        commit('SET_NEW', newArticle.data);
    },
    getNews({commit}) {
        API.get('news')
            .then(response => {
                let articles = response.data;

                // Trier du + au - récent
                articles.sort(function (a, b) {
                    let date = a.published.split('/');
                    const c = new Date(`${date[1]}/${date[0]}/${date[2]}`);
                    date = b.published.split('/');
                    const d = new Date(`${date[1]}/${date[0]}/${date[2]}`);
                    return d - c;
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
    },
    // eslint-disable-next-line no-unused-vars
    getNewsByArtist({commit}, id) {
        return new Promise(resolve => {
            API.get(`news`).then(response => {
                resolve(response.data.filter(e => e.artistesId.includes(id)))
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