<template>
    <div class="backoffice">
        <div class="breadcrumb">
            <router-link :to="{ name: 'admin' }">Admin</router-link>
            <router-link :to="{ name: 'concerts.index' }">Tous les concerts</router-link>
            <router-link :to="{ name: 'concerts.show', params: { id: id } }">Voir le concert</router-link>
            <a href="#">Modifier</a>
        </div>
        <h1>Modifier le concert</h1>
        <form v-if="concert">
            <label>Lieu du concert</label>
            <input required type="text" v-model="concert.name"/>
            <label>Date</label>
            <input required type="text" v-model="concert.date"/>
            <p class="label">L'artiste</p>
            <div class="list-checkbox">
                <div v-for="(artist, index) in artists" :key="'artis-create-new'+index">
                    <input required type="radio" :id="'artist'+artist.id" :value="artist.id" v-model="concert.artistId"/>
                    <label :for="'artist'+artist.id">{{ artist.name }}</label>
                </div>
            </div>
            <button @submit="save">Valider</button>
        </form>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                id: Number(this.$route.params.id)
            }
        },
        computed: {
            concert() {
                return this.$store.state.concerts.find(e => e.id === this.id)
            },
            artists() {
                return this.$store.state.artists
            }
        },
        methods: {
            getArtist(id) {
                return this.artists.find(e => e.id === id)
            },
            save() {
                console.log('save')
            }
        },
        mounted() {
            this.$store.dispatch('getConcerts');
            this.$store.dispatch('getArtists');
        }
    }

</script>
