<template>
    <section v-if="artist" class="section-artist">
        <div class="image">
            <img :src="artist.avatar" :alt="artist.name">
        </div>
        <div class="infos">
            <div>
                <h1>{{ artist.name }}</h1>
                <p class="like">{{ artist.likes | splitNumber }}
                    <icon-heart
                        @click.native.prevent="like" :like="isLiked"/>
                </p>
                <br><br>
                <h2>Pays d'origine</h2>
                <p class="text">{{ artist.origin }}</p>
                <br><br>
                <div v-if="genre">
                    <h2>Genre</h2>
                    <p>{{ genre.name }}</p>
                    <br><br>
                </div>
                <h2>Biographie</h2>
                <p class="text">{{ artist.description }}</p>
                <br><br>
                <div v-if="concerts && concerts.length">
                    <h2>ConcertsRoute</h2>
                    <ul class="list-concerts">
                        <li v-for="(concert, index) in concerts" :key="'concert-artist-' + index">
                            <p>{{ concert.date | date }}</p>
                            <p class="text">{{ concert.name }}</p>
                        </li>
                    </ul>
                    <br><br>
                </div>
                <div v-if="albums && albums.length">
                    <h2>Albums</h2>
                    <ul class="text albums">
                        <li v-for="(album, index) in albums" :key="'album-' + index">
                            <img :src="album.cover" :alt="album.name">
                            <div>
                                <p class="name">{{ album.name }}</p>
                                <p>Date de sortie : {{ album.released }}</p>
                                <p>Tracks : {{ album.tracks }}</p>
                            </div>
                        </li>
                    </ul>
                    <br><br>
                </div>
                <div v-if="articles && articles.length">
                    <h2>Articles</h2>
                    <ul class="list-articles">
                        <li v-for="(article, index) in articles" :key="'article-artist-' + index">
                            <router-link :to="{name: 'article', params: { id: article.id }}">
                                <img :src="article.image" :alt="article.title">
                                <p>
                                    {{ article.title }}<br>
                                    <span>{{ article.published | date }}</span>
                                </p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

    import {mapState, mapActions, mapMutations} from 'vuex';
    import IconHeart from "@/components/Icons/IconHeart";

    export default {
        name: 'ArtistDescription',
        components: { IconHeart },
        data() {
            return {
                id: this.$route.params.id
            }
        },
        computed: {
            ...mapState({
                artist(state) {
                    const artist = state.artists.find(n => n.id === this.id);
                    return artist ? artist : {}
                },
                articles(state) {
                    return state.news.filter(n => n.artistesId.includes(this.artist.id));
                },
                genre(state) {
                    return this.artist && this.artist.genreId ? state.genres.find(n => n.id === this.artist.genreId) : {}
                },
                albums(state) {
                    return state.albums.filter(n => n.artistId === this.id)
                },
                concerts(state) {
                    const concerts = state.concerts.filter(n => n.artistId === this.id);
                    if(!concerts) return {};
                    return concerts.sort((a,b) => {
                        return new Date(b.date) - new Date(a.date)
                    });
                },
                session: state => state.session,
                isLiked(state) {
                    return !!(state.session && state.session.artistLiked && this.session.artistLiked.includes(this.id));
                }
            })
        },
        methods: {
            ...mapMutations(['UPDATE_SESSION_FIELDS']),
            ...mapActions(['getArtists', 'getNews', 'getGenres', 'getAlbums', 'getConcerts', 'likeArtist']),
            like() {
                if(this.session) {
                    this.likeArtist({id: this.id, isLiked: this.isLiked})
                        .then(res => this.UPDATE_SESSION_FIELDS({artistLiked: res.data.newArtistLiked}))
                } else {
                    this.$router.push({name: 'login'})
                }
            }
        },
        mounted() {
            if(!Object.keys(this.artist).length) {
                this.getArtists();
            }
            if(!this.articles.length) {
                this.getNews();
            }
            if(!this.genre || !Object.keys(this.genre).length) {
                this.getGenres();
            }
            if(!this.albums.length) {
                this.getAlbums();
            }
            if(!this.concerts.length) {
                this.getConcerts();
            }
        },
        watch: {
            '$route.params.id'(id) {
                this.id = id;
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        }
    }

</script>


<style lang="scss">

    .section-artist {
        display: flex;

        @media screen and (max-width: 1024px) {
            flex-direction: column;
        }

        h1 {
            font-size: 90px;
            @media screen and (max-width: 1024px) {
                font-size: 70px;
            }
            @media screen and (max-width: 700px) {
                font-size: 40px;
            }
        }

        h2 {
            margin-bottom: 5px;
            padding-bottom: 5px;
            border-bottom: solid 1px #444;
        }

        & > div {
            width: 50%;

            @media screen and (max-width: 1024px) {
                width: 100%;
            }
        }

        .like {
            font-size: 30px;
        }

        svg {
            width: 25px;
            margin-left: 5px;
        }

        .image {
            @media screen and (max-width: 1024px) {
                position: relative;
                height: 70vh;
            }

            @media screen and (min-width: 1025px) {
                width: 100%;
                position: -webkit-sticky;
                position: sticky;
                top: 0;
                height: 100vh;
            }

            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .infos {
            & > div {
                padding: 100px 40px;

                @media screen and (max-width: 1024px) {
                    padding: 20px;
                }
            }
        }

        .albums {
            li {
                display: flex;
                margin-top: 20px;
                align-items: center;
                line-height: 1.5;
            }

            img {
                width: 150px;
                height: 150px;
                object-fit: cover;
                margin-right: 20px;
            }

            .name {
                font-weight: bold;
            }
        }

        .list-articles {
            li {
                display: flex;
                margin-top: 20px;
                align-items: center;
                width: 100%;
                position: relative;
                max-width: 500px;
                overflow: hidden;

                a:hover img {
                    transform: scale(1.05);
                }
            }

            img {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                object-fit: cover;
                margin-right: 20px;
                z-index: 0;
                transition: transform ease-out .5s;
            }

            p {
                padding: 50px 20px;
                position: relative;
                z-index: 2;
                text-shadow: 0 0 10px #5a5a5a;
            }

            span {
                -webkit-text-fill-color: transparent;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #fff;
                color: transparent;
                font-size: 30px;
                margin-top: 10px;
                display: block;
            }
        }

        .list-concerts {
            li {
                display: flex;
                margin-top: 10px;
            }
            p:first-of-type {
                -webkit-text-fill-color: transparent;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: #fff;
                color: transparent;
                margin-right: 10px;
            }
        }
    }

</style>