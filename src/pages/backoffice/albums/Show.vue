<template>
    <show :editRouteName="editRouteName" :id="id" :confirmSentence="confirmSentence" @remove="remove">
        <div class="breadcrumb">
            <router-link :to="{ name: 'admin' }">Admin</router-link>
            <router-link :to="{ name: 'albums.index' }">Tous les albums</router-link>
            <a href="#">Voir l'album</a>
        </div>
        <div v-if="album" class="details">
            <div class="show-album">
                <img :src="album.cover" :alt="album.name"/>
                <div>
                    <p class="id">#{{ album.id }}</p>
                    <h1>{{ album.name }}</h1>
                </div>
            </div>
            <table>
                <tr>
                    <td>Date</td>
                    <td>{{ album.released }}</td>
                </tr>
                <tr>
                    <td>Tracks</td>
                    <td>{{ album.tracks }}</td>
                </tr>
                <tr v-if="artist">
                    <td>Artiste</td>
                    <td>
                        <router-link :to="{ name: 'artists.show', params: { id: artist.id } }">
                            <img class="avatar" :src="artist.avatar" :alt="artist.name">
                            <span>{{ artist.name }}</span>
                        </router-link>
                    </td>
                </tr>
            </table>
        </div>
    </show>
</template>

<script>

    import {mapState, mapActions} from 'vuex';
    import Show from "@/components/Backoffice/Show";

    export default {
        components: {
            Show
        },
        data() {
            return {
                id: this.$route.params.id,
                editRouteName: 'albums.edit',
                confirmSentence: 'Êtes-vous certain de vouloir supprimer ce concert ?'
            }
        },
        computed: {
            ...mapState({
                album(state) {
                    if (state.albums.length === 0) return {};
                    return state.albums.find(n => n.id === this.id);
                },
                artist(state) {
                    if (this.album && this.album.artistId && state.artists) {
                        return state.artists.find(e => e.id === this.album.artistId)
                    }
                    return {}
                }
            })
        },
        methods: {
            ...mapActions(['getAlbums', 'getArtists', 'deleteAlbum']),
            remove() {
                this.deleteAlbum(this.id);
                this.$router.push({name: 'albums.index'})
            }
        },
        mounted() {
            if(!Object.keys(this.album).length) {
                this.getAlbums()
            }
            if(!Object.keys(this.artist).length) {
                this.getArtists()
            }
        }
    }

</script>
