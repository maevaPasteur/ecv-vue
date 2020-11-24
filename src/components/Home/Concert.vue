<template>
    <router-link v-if="concert" :to="{ name: 'artist', params: { id: concert.artistId } }" class="slide concert-item">
        <div class="img">
            <img v-if="artist" :src="artist.avatar" :alt="artist.name">
        </div>
        <div class="content">
            <h3 v-if="artist">{{ artist.name }}</h3>
            <p>{{ concert.name }}</p>
            <p>{{ concert.date | date }}</p>
        </div>
    </router-link>
</template>

<script>

    import { mapState, mapActions } from 'vuex';

    export default {
        name: 'Concert',
        props: {
            concert: Object,
            index: Number
        },
        computed: {
            ...mapState({
                artist(state) {
                    return state.artists.find(n => n.id === this.concert.artistId);
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

    .concert-item {
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

</style>

