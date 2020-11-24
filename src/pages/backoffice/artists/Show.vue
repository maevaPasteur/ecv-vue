<template>
    <show :editRouteName="editRouteName" :id="id" :confirmSentence="confirmSentence" @remove="remove">

        <div class="breadcrumb">
            <router-link :to="{ name: 'admin' }">Admin</router-link>
            <router-link :to="{ name: 'artists.index' }">Tous les artistes</router-link>
            <a href="#">Voir l'artiste</a>
        </div>

        <div v-if="artist" class="details">
            <p class="id">#{{ artist.id }}</p>
            <h1>{{ artist.name }}</h1>
            <p class="text">{{ artist.description }}</p>
            <img :src="artist.avatar" :alt="artist.name">
            <table>
                <tr>
                    <th colspan="2">Informations</th>
                </tr>
                <tr>
                    <td>Likes</td>
                    <td>{{ artist.likes | splitNumber }}
                        <icon-heart/>
                    </td>
                </tr>
                <tr>
                    <td>Pays</td>
                    <td>{{ artist.origin }}</td>
                </tr>
                <tr v-if="genre">
                    <td>Genre</td>
                    <td>{{ genre.name | capitalize }}</td>
                </tr>
                <tr v-if="albums && albums.length">
                    <th colspan="2">Albums</th>
                </tr>
                <tr v-for="(album, index) in albums" :key="'artist-alb'+index">
                    <td>
                        <router-link :to="{ name: 'albums.show', params: { id: album.id }}">
                            <img class="avatar" :src="album.cover" :alt="album.name"/>
                            <span>{{ album.name }}</span>
                        </router-link>
                    </td>
                    <td>{{ album.released }}</td>
                </tr>
                <tr v-if="articles && articles.length">
                    <th colspan="2">Articles</th>
                </tr>
                <tr v-for="(article, index) in articles" :key="'artist-article'+index">
                    <td><router-link :to="{ name: 'news.show', params: { id: article.id }}">{{ article.title }}</router-link></td>
                    <td>{{ article.published | date }}</td>
                </tr>
                <tr v-if="concerts && concerts.length">
                    <th colspan="2">Concerts</th>
                </tr>
                <tr v-for="(concert, index) in concerts" :key="'artist-concert'+index">
                    <td><router-link :to="{ name: 'concerts.show', params: { id: concert.id }}">{{ concert.name }}</router-link></td>
                    <td>{{ concert.date | date }}</td>
                </tr>
            </table>
            <router-link :to="{name: 'artist', params: { id: artist.id }}" class="button">Voir la page de l'artiste</router-link>
        </div>
    </show>
</template>

<script>

    import {mapState, mapActions} from 'vuex';
    import Show from "@/components/Backoffice/Show";
    import IconHeart from "@/components/icons/IconHeart";

    export default {
        components: {
            Show,
            IconHeart
        },
        data() {
            return {
                id: this.$route.params.id,
                editRouteName: 'artists.edit',
                confirmSentence: 'Êtes-vous certain de vouloir supprimer cet artiste ?'
            }
        },
        computed: {
            ...mapState({
                artist(state) {
                    const artist = state.artists.find(item => item.id === this.id);
                    return artist ? artist : {}
                },
                genre(state) {
                    return this.artist && this.artist.genreId ? state.genres.find(n => n.id === this.artist.genreId) : {}
                },
                articles(state) {
                    return state.news.filter(n => n.artistesId.includes(this.artist.id));
                },
                albums(state) {
                    return state.albums.filter(n => n.artistId === this.id)
                },
                concerts(state) {
                    const concerts = state.concerts.filter(n => n.artistId === this.id);
                    if (!concerts) return {};
                    return concerts.sort((a, b) => {
                        return new Date(b.date) - new Date(a.date)
                    });
                }
            })
        },
        methods: {
            ...mapActions(['getGenres', 'getArtists', 'deleteArtist', 'getNews', 'getConcerts', 'getAlbums']),
            remove() {
                this.deleteArtist(this.id);
                this.$router.push({name: 'artists.index'})
            }
        },
        mounted() {
            if (!Object.keys(this.artist).length) {
                this.getArtists()
            }
            if (!this.genre || !Object.keys(this.genre).length) {
                this.getGenres()
            }
            if (!Object.keys(this.articles).length) {
                this.getNews();
            }
            if (!Object.keys(this.albums).length) {
                this.getAlbums();
            }
            if (!Object.keys(this.concerts).length) {
                this.getConcerts();
            }
        }
    }

</script>
