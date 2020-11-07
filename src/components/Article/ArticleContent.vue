<template>
    <section class="section-item detail-article" v-if="article">

        <h1>{{ article.title }}</h1>
        <span class="date">{{ article.published }}</span>
        <div class="image">
            <img :src="article.image" :alt="article.title">
        </div>

        <div class="small-artists" v-if="artistsLoad">
            <ul>
                <li v-for="(artist, index) in artists" :key="'artist' + index">
                    <a :href="'/artists/' + artist.id">
                        <img :src="artist.avatar" :alt="artist.name">
                    </a>
                </li>
            </ul>
        </div>

        <p class="content text">{{article.content}}</p>

        <div class="comments">
            <p>Commentaires</p>
            <ul class="text" v-if="article.comments && article.comments.length">
                <li v-for="(comment, index) in article.comments" :key="'comment-' + index">
                    <img :src="comment.avatar" :alt="comment.username">
                    <div>
                        <p>{{ comment.username }}</p>
                        <p>{{ comment.message }}</p>
                    </div>
                </li>
            </ul>
            <p class="no-comment" v-else>Aucun commentaire pour le moment</p>
            <form>
                <label class="text"><textarea placeholder="Mon commentaire..."></textarea></label>
                <button class="text" type="submit">Publier</button>
            </form>
        </div>

    </section>
</template>

<script>
    export default {
        name: 'ArticleContent',
        data() {
            return {
                id: Number(this.$route.params.id),
                article: null,
                artistsLoad: false,
                artists: []
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

<style lang="scss">

    .detail-article {

        .small-artists {
            margin-bottom: 20px;

            ul {
                display: flex;
                flex-wrap: wrap;
            }

            li {
                &:not(:first-of-type) {
                    margin-left: 10px;
                }
            }

            img {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                object-fit: cover;
                transition: transform ease .15s;

                &:hover {
                    transform: scale(.95);
                }
            }
        }

        button {
            display: block;
            font-size: 12px;
            text-transform: uppercase;
            font-weight: 500;
            cursor: pointer;
            color: #fff;
            margin: 5px 10px 0;

            &:hover {
                border-bottom: solid 1px #fff;
            }
        }

        textarea {
            width: 100%;
            min-width: 100%;
            max-width: 100%;
            border-radius: 10px;
            padding: 10px 20px;
            border: solid 1px #fff;
            color: #fff;
            background: transparent;

            &::placeholder {
                font-size: 14px;
                color: #fff;
                opacity: .5;
            }
        }

        .image {
            position: relative;
            padding-bottom: 40%;
            margin-bottom: 40px;
            flex-shrink: 1;

            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .date {
            -webkit-text-fill-color: transparent;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: #fff;
            color: transparent;
            font-size: 2.5rem;
            margin-bottom: 20px;
            display: block;
        }

        .content {
            white-space: pre-line;
            line-height: 1.5;
        }

        .comments {
            margin-top: 40px;
            padding-top: 20px;
            border-top: solid 1px #444;

            & > p {
                margin-bottom: 20px;
            }

            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 20px;
            }

            li {
                display: flex;
                margin-bottom: 20px;
                width: fit-content;
                background-color: #fff;
                padding: 5px 20px 5px 10px;
                border-radius: 10px;
                color: #333;
                position: relative;
                max-width: 400px;

                &:after {
                    content: '';
                    display: block;
                    background-color: #fff;
                    width: 10px;
                    height: 10px;
                    transform: rotate(45deg);
                    position: absolute;
                    left: 25px;
                    bottom: -5px;
                }

                div > p:first-of-type {
                    opacity: .5;
                    font-size: 14px;
                }
            }
        }
    }

</style>