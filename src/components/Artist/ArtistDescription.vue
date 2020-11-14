<template>
    <section v-if="artist" class="section-artist">
        <div class="image">
            <img :src="artist.avatar" :alt="artist.name">
        </div>
        <div class="infos">
            <div>
                <h1>{{ artist.name }}</h1>
                <p class="like">{{ artist.likes | splitNumber }}
                    <icon-heart @click.native.prevent="like"/>
                </p>
                <br><br>
                <h2>Pays d'origine</h2>
                <p class="text">{{ artist.origin }}</p>
                <br><br>
                <h2>Genre</h2>
                <p v-if="genre">{{ genre }}</p>
                <br><br>
                <h2>Biographie</h2>
                <p class="text">{{ artist.description }}</p>
                <div v-if="albums && albums.length">
                    <br><br>
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
                </div>
                <div v-if="articles && articles.length">
                    <br><br>
                    <h2>Articles</h2>
                    <ul class="list-articles">
                        <li v-for="(article, index) in articles" :key="'article-artist-' + index">
                            <router-link :to="{name: 'article', params: { id: article.id }}">
                                <img :src="article.image" :alt="article.title">
                                <p>
                                    {{ article.title }}<br>
                                    <span>{{ article.published }}</span>
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

    import IconHeart from "../../components/Icons/IconHeart";

    export default {
        name: 'ArtistDescription',
        components: { IconHeart },
        data() {
            return {
                id: Number(this.$route.params.id),
                artist: undefined,
                genre: undefined,
                albums: undefined,
                articles: undefined
            }
        },
        mounted() {
            this.getArtist()
        },
        methods: {
            getArtist() {
                this.$store.dispatch('getArtist', this.id).then(res => {
                    this.artist = res;
                    this.getGenre();
                    this.getAlbums();
                    this.getArticles();
                })
            },
            getGenre() {
                this.$store.dispatch('getGenre', this.artist.genreId).then(res => {
                    this.genre = res.name
                })
            },
            getAlbums() {
                this.$store.dispatch('geAlbumsByArtist', this.artist.id).then(res => {
                    this.albums = res
                })
            },
            getArticles() {
                this.$store.dispatch('getNewsByArtist', this.artist.id).then(res => {
                    this.articles = res
                })
            },
            like() {
                console.log('like')
            },
            resetData(id) {
                this.id = id;
                this.artist = undefined;
                this.genre = undefined;
                this.albums = undefined;
                this.articles = undefined;
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
            }
        },
        watch: {
            '$route.params.id'(id) {
                this.resetData(id);
                this.getArtist();
            }
        }
    }

</script>


<style lang="scss">

    .section-artist {
        display: flex;

        h1 {
            font-size: 90px;
        }

        h2 {
            margin-bottom: 5px;
            padding-bottom: 5px;
            border-bottom: solid 1px #444;
        }

        & > div {
            width: 50%;
        }

        .like {
            font-size: 30px;
        }

        svg {
            width: 25px;
            margin-left: 5px;
        }

        .image {
            position: relative;
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            height: 100vh;

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
    }

</style>