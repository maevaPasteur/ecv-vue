<template>
    <section class="section-item top-artists">
        <h2>Vos chouchous</h2>
        <ul v-if="artists && artists.length">
            <top-artist v-for="(artist, index) in artists" :key="'top-' + index + artist.name" :index="index" :artist="artist"/>
        </ul>
        <ul v-else class="placehodler">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </section>
</template>

<script>

    import {mapState, mapActions} from 'vuex';
    import TopArtist from "./TopArtist";

    export default {
        name: 'TopArtists',
        components: {TopArtist},
        computed: {
            ...mapState({
                artists: state => state.artists.slice(0, 5)
            })
        },
        methods: {
            ...mapActions(['getArtists'])
        },
        mounted() {
            if(!this.artists.length) {
                this.getArtists()
            }
        }
    }

</script>

<style lang="scss">

    .top-artists {
        ul {
            display: flex;
        }

        .placehodler li {
            background-color: #272727;
            border-radius: 50%;
            padding-bottom: 20%;
        }

        li {
            width: 20%;
            font-size: 1.6rem;

            @media screen and (min-width: 1025px) {
                &:not(:first-of-type) {
                    margin-left: 20px;
                }
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

        @media screen and (max-width: 1024px) {
            ul {
                flex-wrap: wrap;
                justify-content: center;
            }
            li {
                width: 180px;
                margin: 0 10px 20px;
            }
        }

        @media screen and (max-width: 520px) {
            li {
                margin: 0 0 20px;
                width: calc((100% - 20px) / 2);
                &:nth-of-type(odd) {
                    margin-right: 20px;
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