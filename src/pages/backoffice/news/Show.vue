<template>
    <show :editRouteName="editRouteName" :id="id" :confirmSentence="confirmSentence" @remove="remove">

        <div class="breadcrumb">
            <router-link :to="{ name: 'admin' }">Admin</router-link>
            <router-link :to="{ name: 'news.index' }">Tous les articles</router-link>
            <a href="#">Voir l'article</a>
        </div>

        <div v-if="article" class="details">
            <p class="id">#{{ article.id }}</p>
            <h1>{{ article.title }}</h1>
            <p>{{ article.published | date }}</p>
            <p class="text">{{ article.content }}</p>
            <img :src="article.image" :alt="article.title">
            <div v-if="artists && artists.length">
                <h2>Les artistes</h2>
                <ul>
                    <li v-for="(artist, index) in artists" :key="'artist-show-'+index">
                        <router-link :to="{name: 'artists.show', params: { id: artist.id }}">
                            <img class="avatar" :src="artist.avatar" :alt="artist.name">
                            <span>{{ artist.name }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <table v-if="article.comments && article.comments.length">
                <tr>
                    <th>Utilisateur</th>
                    <th>Commentaire</th>
                </tr>
                <tr v-for="(comment, index) in article.comments" :key="'com-'+index">
                    <td>
                        <a href="#">
                            <img class="avatar" :src="comment.avatar" :alt="comment.username">
                            <span class="small-id">#{{ comment.userId }}</span>
                            <span>{{ comment.username }}</span>
                        </a>
                    </td>
                    <td>{{ comment.message }}</td>
                </tr>
            </table>
            <router-link :to="{name: 'article', params: { id: article.id }}" class="button">Voir la page de l'article</router-link>
        </div>
    </show>
</template>

<script>

    import {mapState, mapActions} from 'vuex';
    import Show from "@/components/Backoffice/Show";

    export default {
        components: {
            Show
        },
        data() {
            return {
                id: this.$route.params.id,
                editRouteName: 'news.edit',
                confirmSentence: 'Êtes-vous certain de vouloir supprimer cet article ?'
            }
        },
        computed: {
            ...mapState({
                article(state) {
                    if (state.news.length === 0) return {};
                    return state.news.find(n => n.id === this.id);
                },
                artists(state) {
                    if (this.article && this.article.artistesId && this.article.artistesId.length && state.artists) {
                        return state.artists.filter(e => this.article.artistesId.includes(e.id))
                    }
                    return {}
                }
            })
        },
        methods: {
            ...mapActions(['getNews', 'getArtists', 'deleteNew']),
            remove() {
                this.deleteNew(this.id);
                this.$router.push({name: 'news.index'})
            }
        },
        mounted() {
            if(!Object.keys(this.article).length) {
                this.getNews()
            }
            if(!this.artists.length) {
                this.getArtists()
            }
        }
    }

</script>
