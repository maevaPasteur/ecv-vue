<template>
    <div class="backoffice">

        <div v-if="article" class="details">
            <p class="id">#{{ article.id }}</p>
            <h1>{{ article.title }}</h1>
            <p>{{ article.published }}</p>
            <p class="text">{{ article.content }}</p>
            <img :src="article.image" :alt="article.title">
            <h2>Commentaires</h2>
            <table>
                <tr>
                    <th>Utilisateur</th>
                    <th>Commentaire</th>
                </tr>
                <tr v-for="(comment, index) in article.comments" :key="'com-'+index">
                    <td>
                        <a href="#">
                            <img class="avatar" :src="comment.avatar" :alt="comment.username">
                            <span>#{{ comment.userId }}</span>
                            <span>{{ comment.username }}</span>
                        </a>
                    </td>
                </tr>
            </table>
        </div>

        <button>Edit news</button>
        <button>Delete</button>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {
                id: Number(this.$route.params.id),
                article: null,
                artistsLoad: false,
                artists: []
            }
        },
        computed: {
            ...mapState({
                a (state) {
                    console.log(this.$route, state.news);
                    return state.news;
                }
            })
        },
        methods: {
            getArtists(ids) {
                ids.forEach(async (id, index) => {
                    this.artists[index] = await this.$store.dispatch('getArtist', id);
                    if (index === ids.length - 1) {
                        this.artistsLoad = true
                    }
                })
            }
        },
        mounted() {
            this.$store.dispatch('getNew', this.id).then(res => {
                this.article = res;
                if (res && res.artistesId) {
                    this.getArtists(res.artistesId)
                }
            })

        }
    }

</script>
