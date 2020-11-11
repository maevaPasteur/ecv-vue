<template>
    <div class="backoffice">
        <div class="breadcrumb">
            <router-link :to="{ name: 'admin' }">Admin</router-link>
            <a href="#">Tous les artistes</a>
        </div>
        <h1>Les Artistes</h1>
        <table>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Pays</th>
                <th>Likes</th>
                <th></th>
                <th></th>
            </tr>
            <tr v-for="artist in artists" :key="'new-' + artist.id">
                <td>
                    <router-link class="id" :to="{ name: 'news.show', params: { id: artist.id } }">{{ artist.id }}</router-link>
                </td>
                <td>
                    <img class="avatar" :src="artist.avatar" :alt="artist.name">
                    <span>{{ artist.name }}</span>
                </td>
                <td>{{ artist.origin }}</td>
                <td>{{ artist.likes }}</td>
                <td>
                    <router-link class="edit" :to="{ name: 'artists.edit', params: { id: artist.id } }"><img src="@/assets/images/pen.svg" alt="modifier l'article"></router-link>
                </td>
                <td>
                    <router-link class="delete" :to="{ name: 'artists.delete', params: { id: artist.id } }"><img src="@/assets/images/delete.svg" alt="supprimer l'article"></router-link>
                </td>
            </tr>
        </table>
        <div class="btn-actions">
            <router-link :to="{ name: 'artists.create' }" class="create">Ajouter un artiste</router-link>
        </div>
    </div>
</template>

<script>

    export default {
        computed: {
            artists() {
                return this.$store.state.artists
            }
        },
        mounted() {
            this.$store.dispatch('getArtists')
        }
    }
</script>
