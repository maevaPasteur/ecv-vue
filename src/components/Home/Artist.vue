<template>
    <router-link v-if="artist" :to="{ name: 'artist', params: { id: artist.id }}" class="slide artist-item">
        <div class="img">
            <img :src="artist.avatar" :alt="artist.name">
        </div>
        <div class="content">
            <h3>{{ artist.name }}</h3>
            <slot/>
        </div>
    </router-link>
</template>

<script>

    export default {
        name: 'Artist',
        props: {
            artist: Object
        }
    }
</script>