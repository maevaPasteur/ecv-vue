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
            <p>{{ article.published }}</p>
            <p class="text">{{ article.content }}</p>
            <img :src="article.image" :alt="article.title">
            <div v-if="artistsLoad">
                <h2>Les artistes</h2>
                <ul>
                    <li v-for="(artist, index) in artists" :key="'artist-show-'+index">
                        <router-link :to="{ name: '' }">
                            <img class="avatar" :src="artist.avatar" :alt="artist.name">
                            <span class="small-id">#{{ artist.id }}</span>
                            <span>{{ artist.name }}</span>
                        </router-link>
                    </li>
                </ul>
            </div>
            <table>
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
        </div>
    </show>
</template>

<script>

    import Show from "@/components/Backoffice/Show";

    export default {
        components: {
            Show
        },
        data() {
            return {
                id: Number(this.$route.params.id),
                article: null,
                artistsLoad: false,
                artists: [],
                editRouteName: 'news.edit',
                confirmSentence: 'Êtes-vous certain de vouloir supprimer cet article ?'
            }
        },
        methods: {
            getArtists(ids) {
                ids.forEach(async (id, index) => {
                    this.artists[index] = await this.$store.dispatch('getArtist', id);
                    if (index === ids.length - 1) {
                        this.artistsLoad = true
                    }
                })
            },
            remove() {
                console.log('supp')
            }
        },
        mounted() {
            this.$store.dispatch('getNew', this.id).then(res => {
                this.article = res;
                if (res && res.artistesId) {
                    this.getArtists(res.artistesId)
                }
            });
        }
    }

</script>
