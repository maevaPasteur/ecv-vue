<template>
    <section class="artists section-item" v-if="artists && artists.length">
        <h2>Tous nos artistes du moment</h2>
        <flickity class="slider" :class="{'is-dragging': isDragging}" :options="flickityOptions" ref="flickity" @init="initSlider">
            <Artist v-for="(artist, index) in artists" :key="index + artist.name" class="slide" :artist="artist">
                <p>
                    {{ artist.likes | splitNumber }}
                    <icon-heart @click.native.prevent="like(artist.id)" :like="isLiked(artist.id)"/>
                </p>
            </Artist>
        </flickity>
    </section>
</template>

<script>

    import {mapState, mapActions, mapMutations} from 'vuex';
    import Flickity from 'vue-flickity'
    import IconHeart from "@/components/Icons/IconHeart";
    import Artist from "@/components/Home/Artist";

    export default {
        name: 'ArtistsRoute',
        components: {
            Artist,
            Flickity,
            IconHeart
        },
        data() {
            return {
                isDragging: false,
                flickityOptions: {
                    prevNextButtons: true,
                    pageDots: false,
                    contain: true,
                    cellAlign: 'left',
                    wrapAround: true
                }
            }
        },
        computed: {
            ...mapState({
                artists: state => state.artists,
                session: state => state.session
            })
        },
        methods: {
            ...mapMutations(['UPDATE_SESSION_FIELDS']),
            ...mapActions(['getArtists', 'likeArtist']),
            isLiked(id) {
                return !!(this.session && this.session.artistLiked && this.session.artistLiked.includes(id));
            },
            like(id) {
                if(this.session) {
                    this.likeArtist({id: id, isLiked: this.isLiked(id)})
                        .then(res => this.UPDATE_SESSION_FIELDS({artistLiked: res.data.newArtistLiked}))
                } else {
                    this.$router.push({name: 'login'})
                }
            },
            initSlider() {
                this.$refs.flickity.on('dragStart', () => this.isDragging = true);
                this.$refs.flickity.on('dragEnd', () => this.isDragging = false);
            }
        },
        mounted() {
            if(!this.artists.length) {
                this.getArtists()
            }
        }
    }
</script>

<style lang="scss">

    .artists {

        .is-dragging {
            pointer-events: none;
        }

        .slider {
            outline: 0;
            position: relative;
        }

        .slide {
            width: calc((100% - 30px) / 4);
            margin-right: 10px;
            overflow: hidden;

            @media screen and (max-width: 1024px) {
                width: calc((100% - 20px) / 3);
            }

            @media screen and (max-width: 700px) {
                width: calc((100% - 10px) / 2);
            }

            @media screen and (max-width: 520px) {
                width: 100%;
            }
        }

        a:hover img {
            transform: scale(1.05);
        }

        img {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            object-fit: cover;
            transition: transform ease-out .5s;
        }

        .img {
            position: relative;
            padding-bottom: 150%;
        }

        h3 {
            font-size: 40px;
        }

        .content {
            position: absolute;
            bottom: 10px;
            left: 20px;
            width: calc(100% - 40px);
            text-shadow: 0 0 20px #424242;
        }

        svg {
            width: 15px;
            margin-left: 5px;
        }
    }

</style>