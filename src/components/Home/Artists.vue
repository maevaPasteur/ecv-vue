<template>
    <section class="artists section-item">
        <h2>Tous nos artistes du moment</h2>
        <flickity v-if="artists && artists.length" :options="flickityOptions" ref="flickity">
            <a :href="'/artists/' + artist.id" v-for="(artist, index) in artists" :key="index + artist.name" class="slide">
                <div class="img">
                    <img :src="artist.avatar" :alt="artist.name">
                </div>
                <div class="content">
                    <h3>{{ artist.name }}</h3>
                </div>
            </a>
        </flickity>
    </section>
</template>

<script>

    import Flickity from 'vue-flickity'

    export default {
        name: 'Artists',
        components: {
            Flickity
        },
        data() {
            return {
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
            artists() {
                return this.$store.state.artists
            }
        },
        mounted() {
            this.$store.dispatch('getArtists')
        }
    }
</script>

<style lang="scss">

    .artists {
        .slide {
            width: calc((100% - 30px) / 4);
            margin-right: 10px;
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
    }

</style>