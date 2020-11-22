<template>
    <router-link :to="{ name: 'artist', params: { id: concert.artistId } }" class="slide">
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
            count: Number,
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

