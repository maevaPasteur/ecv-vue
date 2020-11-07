<template>
    <a href="#" class="slide">
        <div class="img">
            <img v-if="artist" :src="artist.avatar" :alt="artist.name">
        </div>
        <div class="content">
            <h3 v-if="artist">{{ artist.name }}</h3>
            <p>{{concert.name}}</p>
            <p>{{concert.date}}</p>
        </div>
    </a>
</template>

<script>

    export default {
        name: 'Concert',
        props: {
            concert: Object,
            count: Number,
            index: Number
        },
        data() {
            return {
                artist: null
            }
        },
        mounted() {
            this.$store.dispatch('getArtist', this.concert.artistId).then(res => {
                this.artist = res;
                if(this.index === 0) {
                    this.$emit('ready')
                }

            })
        }
    }
</script>

