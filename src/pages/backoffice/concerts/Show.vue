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
            <div :set="concert.artist = getArtist(concert.artistId)">
                <router-link v-if="concert.artist" :to="{ name: 'artists.show', params: { id: concert.artist.id } }">
                    <img class="avatar" :src="concert.artist.avatar" :alt="concert.artist.name">
                    <span class="small-id">#{{ concert.artist.id }}</span>
                    <span>{{ concert.artist.name }}</span>
                </router-link>
            </div>
        </div>
    </show>
</template>

<script>

    import Show from "@/components/Backoffice/Show";

    export default {
        components: {
            Show
        },
        data() {
            return {
                id: Number(this.$route.params.id),
                editRouteName: 'concerts.edit',
                confirmSentence: 'Êtes-vous certain de vouloir supprimer ce concert ?'
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
            remove() {
                console.log('supp')
            }
        },
        mounted() {
            this.$store.dispatch('getConcerts');
            this.$store.dispatch('getArtists');
        }
    }

</script>
