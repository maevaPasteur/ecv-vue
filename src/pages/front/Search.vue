<template>
    <div class="page-content">
        <section class="section-item search">
            <div>
                <h1>Vous cherchez quelque chose ?</h1>
                <form>
                    <div class="list-checkbox">
                        <div v-for="(field, index) in fields" :key="'field-search-'+index">
                            <input name="search-field" :id="'field-'+index" type="radio" :value="field.value"
                                   v-model="fieldSelected" @click="search">
                            <label :for="'field-'+index">{{ field.title }}</label>
                        </div>
                    </div>
                    <div v-if="fieldSelected">
                        <p class="label">Précisez votre recherche...</p>
                        <input type="text" v-model="words" placeholder="Travis Scott" @keydown="search">
                    </div>
                </form>

                <div class="results">
                    <div v-if="resultType === 'news'">
                        <Article v-for="(result, index) in results" :key="'result-'+index" :article="result" />
                    </div>

                    <div v-else-if="resultType === 'concerts'">
                        <Concert v-for="(result, index) in results" :key="'result-'+index" :concert="result" />
                    </div>

                    <div v-else-if="resultType === 'albums'">
                        <Album v-for="(result, index) in results" :key="'result-'+index" :album="result" />
                    </div>

                    <div v-else-if="resultType === 'artists'">
                        <Artist v-for="(result, index) in results" :key="'result-'+index" :artist="result"/>
                    </div>

                </div>


            </div>
        </section>
    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex';
    import Concert from "@/components/Home/Concert";
    import Article from "@/components/Home/Article";
    import Album from "@/components/Home/Album";
    import Artist from "@/components/Home/Artist";

    export default {
        name: 'Search',
        components: {Artist, Album, Article, Concert},
        data() {
            return {
                words: '',
                fieldSelected: '',
                results: [],
                resultType: '',
                fields: [
                    {value: 'artists', title: "Artistes"},
                    {value: 'albums', title: 'Albums'},
                    {value: 'concerts', title: 'Concerts'},
                    {value: 'news', title: 'Articles'}
                ],
                actions: {
                    'artists': this.getArtists(),
                    'albums': this.getAlbums(),
                    'concerts': this.getConcerts(),
                    'news': this.getNews()
                }
            }
        },
        computed: {
            ...mapState({
                news: state => state.news,
                albums: state => state.albums,
                concerts: state => state.concerts,
                artists: state => state.artists
            }),
            state() {
                return {
                    news: this.news,
                    albums: this.albums,
                    concerts: this.concerts,
                    artists: this.artists
                }
            }
        },
        methods: {
            ...mapActions(['getNews', 'getAlbums', 'getConcerts', 'getArtists']),
            resetResults() {
              this.results = []
            },
            search() {
                setTimeout(async () => {
                    if(this.words === '' || !this.words) {
                        this.results = [];
                    } else {
                        const words = this.words.toLowerCase();
                        let data;
                        switch (this.fieldSelected) {
                            case "news" :
                                data = !Object.keys(this.news).length ? await this.getNews() : this.news;
                                data = data.filter(e => e.title.toLowerCase().includes(words));
                                this.results = data;
                                this.resultType = 'news';
                                break;

                            case "artists":
                                data = !Object.keys(this.artists).length ? await this.getArtists() : this.artists;
                                data = data.filter(e => e.name.toLowerCase().includes(words) || e.origin.toLowerCase().includes(words));
                                this.results = data;
                                this.resultType = 'artists';
                                break;

                            case "albums":
                                data = !Object.keys(this.albums).length ? await this.getAlbums() : this.albums;
                                data = data.filter(e => e.name.toLowerCase().includes(words) || e.released === words);
                                this.results = data;
                                this.resultType = 'albums';
                                break;

                            case "concerts":
                                data = !Object.keys(this.concerts).length ? await this.getConcerts() : this.concerts;
                                data = data.filter(e => e.name.toLowerCase().includes(words) || e.date.includes(words));
                                this.results = data;
                                this.resultType = 'concerts';
                                break;
                        }
                    }
                }, 50)
            }
        }
    }

</script>

<style lang="scss">

    .search {
        min-height: 100vh;

        .label {
            font-size: 30px;
            margin-top: 40px;
        }

        input[type="text"] {
            font-size: 14px;
            font-family: "Roboto", sans-serif;
            font-weight: 100;
            padding: 10px;
            width: calc(100% - 20px);
            margin-top: 10px;
        }

        .results {
            margin-top: 40px;
            & > div {
                display: flex;
                flex-wrap: wrap;
                width: 100%;
            }
        }

        .concert-item {
            width: calc((100% - 60px) / 4);
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
            h3 {
                transition: transform ease-out .3s;
            }
            img {
                transition: transform ease-out .8s;
            }

            &:hover {
                img {
                    transform: scale(1.05);
                }
                h3 {
                    transform: translateY(10px);
                }
            }

            &:not(:nth-of-type(4n)) {
                margin-right: 20px;
            }
        }

        .artist-item {
            width: calc((100% - 60px) / 4);
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;

            &:not(:nth-of-type(4n)) {
                margin-right: 20px;
            }

            img {
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                object-fit: cover;
            }

            .img {
                position: relative;
                padding-bottom: 130%;
            }

            h3 {
                font-size: 40px;
                margin-bottom: 10px;
            }

            .content {
                position: absolute;
                bottom: 10px;
                left: 20px;
                width: calc(100% - 40px);
                text-shadow: 0 0 20px #424242;
            }
        }
    }

</style>