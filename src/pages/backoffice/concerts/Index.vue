<template>
    <div class="backoffice">
        <div class="breadcrumb">
            <router-link :to="{ name: 'admin' }">Admin</router-link>
            <a href="#">Tous les concerts</a>
        </div>
        <h1>Les concerts</h1>
        <table>
            <tr>
                <th>ID</th>
                <th>Lieu</th>
                <th>Date</th>
                <th>Artiste</th>
                <th></th>
                <th></th>
            </tr>
            <tr v-for="concert in concerts" :key="'concert-' + concert.id">
                <td>
                    <router-link class="id" :to="{ name: 'concerts.show', params: { id: concert.id } }">{{ concert.id }}</router-link>
                </td>
                <td>{{ concert.name }}</td>
                <td>{{ concert.date }}</td>
                <td :set="concert.artist = getArtist(concert.artistId)">
                    <router-link v-if="concert.artist" :to="{ name: 'artists.show', params: { id: concert.artist.id } }">
                        <img class="avatar" :src="concert.artist.avatar" :alt="concert.artist.name">
                        <span>{{ concert.artist.name }}</span>
                    </router-link>
                </td>
                <td>
                    <router-link class="edit" :to="{ name: 'concerts.edit', params: { id: concert.id } }"><img src="@/assets/images/pen.svg" alt="modifier le concert"></router-link>
                </td>
                <td>
                    <router-link class="delete" :to="{ name: 'concerts.delete', params: { id: concert.id } }"><img src="@/assets/images/delete.svg" alt="supprimer le concert"></router-link>
                </td>
            </tr>
        </table>
        <div class="btn-actions">
            <router-link :to="{ name: 'concerts.create' }" class="create">Créer un concert</router-link>
        </div>
    </div>
</template>

<script>

    export default {
        computed: {
            concerts() {
                return this.$store.state.concerts
            },
            artists() {
                return this.$store.state.artists
            }
        },
        methods: {
            getArtist(id) {
                return this.artists.find(e => e.id === id)
            }
        },
        mounted() {
            this.$store.dispatch('getConcerts');
            this.$store.dispatch('getArtists');
        }
    }
</script>
