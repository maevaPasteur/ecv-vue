<template>

    <index v-if="artists && artists.length"
           :title="title"
           :link="link"
           :confirmSentence="confirmSentence"
           :cols="cols"
           :items="artists"
           :routes="routes"
           :button="button"
           @remove="remove"
    />

</template>

<script>

    import Index from '@/components/Backoffice/Index';
    import {mapState, mapActions} from 'vuex';

    export default {
        components: {Index},
        data() {
            return {
                title: "Les artistes",
                link: "Tous les artistes",
                confirmSentence: 'Êtes-vous certain de vouloir supprimer cet artiste ?',
                cols: [
                    { title: "Nom", param: "avatar" },
                    { title: "Pays", param: "origin" },
                    { title: "Likes", param: "likes" }
                ],
                routes: { show: 'artists.show', edit: 'artists.edit' },
                button: {
                    title: "Créer un artiste",
                    link: { name: 'artists.create' }
                }
            }
        },
        computed: {
            ...mapState({
                artists: state => state.artists
            })
        },
        methods: {
            ...mapActions(['getArtists', 'deleteArtist']),
            remove(id) {
                this.deleteArtist(id);
            }
        },
        mounted() {
            if(!this.artists.length) {
                this.getArtists()
            }
        }
    }
</script>
