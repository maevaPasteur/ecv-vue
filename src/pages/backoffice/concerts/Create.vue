<template>
    <div class="backoffice">
        <div class="breadcrumb">
            <router-link :to="{ name: 'admin' }">Admin</router-link>
            <router-link :to="{ name: 'concerts.index' }">Tous les concerts</router-link>
            <a href="#">Nouveau</a>
        </div>
        <h1>Créer un concert</h1>
        <form>
            <label>Lieu du concert</label>
            <input required type="text" v-model="name"/>
            <label>Date</label>
            <input required type="text" v-model="date" placeholder="jj/mm/aaaa"/>
            <p class="label">L'artiste</p>
            <div class="list-checkbox">
                <div v-for="(artist, index) in artists" :key="'artis-create-new'+index">
                    <input required type="radio" :id="'artist'+artist.id" :value="artist.id" v-model="artistId"/>
                    <label :for="'artist'+artist.id">{{ artist.name }}</label>
                </div>
            </div>
            <p class="error" v-if="error">{{ error }}</p>
            <button @submit="save">Valider</button>
        </form>
    </div>
</template>

<script>


    export default {
        data() {
            return {
                id: Number(this.$route.params.id),
                error: null,
                name: '',
                date: null,
                artistId: null
            }
        },
        computed: {
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
            this.$store.dispatch('getArtists');
        }
    }
</script>
