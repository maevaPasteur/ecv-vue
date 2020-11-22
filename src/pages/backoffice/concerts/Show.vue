<template>
    <show :editRouteName="editRouteName" :id="id" :confirmSentence="confirmSentence" @remove="remove">
        <div class="breadcrumb">
            <router-link :to="{ name: 'admin' }">Admin</router-link>
            <router-link :to="{ name: 'concerts.index' }">Tous les concerts</router-link>
            <a href="#">Voir le concert</a>
        </div>
        <div v-if="concert" class="details">
            <p class="id">#{{ concert.id }}</p>
            <h1>{{ concert.name }}</h1>
            <p>{{ concert.date }}</p>
            <router-link v-if="artist" :to="{ name: 'artists.show', params: { id: artist.id } }">
                <img class="avatar" :src="artist.avatar" :alt="artist.name">
                <span class="small-id">#{{ artist.id }}</span>
                <span>{{ artist.name }}</span>
            </router-link>
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
                editRouteName: 'concerts.edit',
                confirmSentence: 'Êtes-vous certain de vouloir supprimer ce concert ?'
            }
        },
        computed: {
            ...mapState({
                concert(state) {
                    if (state.concerts.length === 0) return {};
                    return state.concerts.find(n => n.id === this.id);
                },
                artist(state) {
                    if (this.concert && this.concert.artistId && state.artists) {
                        return state.artists.find(e => e.id === this.concert.artistId)
                    }
                    return {}
                }
            })
        },
        methods: {
            ...mapActions(['getConcerts', 'getArtists', 'deleteConcert']),
            remove() {
                this.deleteConcert(this.id);
                this.$router.push({name: 'concerts.index'})
            }
        },
        mounted() {
            if(!Object.keys(this.concert).length) {
                this.getConcerts()
            }
            if(!Object.keys(this.artist).length) {
                this.getArtists()
            }
        }
    }

</script>
