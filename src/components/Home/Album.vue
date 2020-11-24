<template>
    <router-link v-if="album" :to="{ name: 'album', params: { id: album.artistId } }" class="album-item">
        <div class="img">
            <img :src="album.cover" :alt="album.name">
        </div>
        <div class="content">
            <h3>{{ album.name }}</h3>
            <p>{{ album.released | date }}</p>
        </div>
    </router-link>
</template>

<script>

    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'Album',
        props: {
            album: Object
        },
        computed: {
            ...mapState({
                artist(state) {
                    return this.concert ? state.artists.find(n => n.id === this.concert.artistId) : {};
                }
            })
        },
        methods: {
            ...mapActions(['getArtists']),
        },
        mounted() {
            if(!Object.keys(this.artist).length) {
                this.getArtists();
            }
        }
    }

</script>

<style lang="scss">

    .album-item {
        width: calc((100% - 80px) / 5);
        margin-bottom: 40px;

        &:not(:nth-of-type(5n)) {
            margin-right: 20px;
        }

        p {
            font-size: 16px;
        }

        .img {
            position: relative;
            padding-bottom: 100%;
            margin-bottom: 10px;

            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

</style>

