<template>
    <section class="section-item top-artists">
        <h2>Vos chouchous</h2>
        <ul v-if="artists && artists.length">
            <top-artist v-for="(artist, index) in artists" :key="'top-' + index + artist.name" :index="index"
                        :artist="artist"/>
        </ul>
    </section>
</template>

<script>

    import TopArtist from "./TopArtist";

    export default {
        name: 'TopArtists',
        components: {TopArtist},
        computed: {
            artists() {
                return this.$store.state.artists.slice(0, 5)
            }
        }
    }
</script>

<style lang="scss">

    .top-artists {
        ul {
            display: flex;
        }

        li {
            width: 20%;
            font-size: 1.6rem;

            &:not(:first-of-type) {
                margin-left: 20px;
            }

            &:hover {

                .infos {
                    background-color: rgba(0, 0, 0, .5);
                }

                .name:after {
                    transform: scale(1, 1);
                }
            }
        }

        .image {
            position: relative;
            padding-bottom: 100%;
            border-radius: 50%;
            overflow: hidden;
        }

        img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: 1;
        }

        .infos {
            position: absolute;
            z-index: 2;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-shadow: 0 0 20px #424242;
            transition: background-color ease .3s;
        }

        span {
            font-size: 2.8rem;
            webkit-text-fill-color: transparent;
            -webkit-text-stroke-width: 1px;
            -webkit-text-stroke-color: #fff;
            color: transparent;
        }

        .likes {
            display: flex;
            align-items: center;

        }

        svg {
            width: 20px;
            margin-left: 7px;
        }

        .name {
            position: relative;

            &:after {
                content: '';
                width: 100%;
                height: 2px;
                display: block;
                background-color: #fff;
                position: absolute;
                left: 0;
                bottom: 0;
                transform-origin: center;
                transform: scale(0, 1);
                transition: transform ease-out .3s;
            }
        }
    }

</style>