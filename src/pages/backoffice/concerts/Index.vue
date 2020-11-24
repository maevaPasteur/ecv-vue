<template>
    <index v-if="concerts"
           :title="title"
           :link="link"
           :confirmSentence="confirmSentence"
           :cols="cols"
           :items="concerts"
           :routes="routes"
           :button="button"
           :states="states"
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
                title: "Les concerts",
                link: "Tous les concerts",
                confirmSentence: 'Êtes-vous certain de vouloir supprimer ce concert ?',
                cols: [
                    { title: "Lieu", param: "name" },
                    { title: "Date", param: "date" },
                    { title: "Artiste", param: "artistId" }
                ],
                routes: { show: 'concerts.show', edit: 'concerts.edit' },
                button: {
                    title: "Ajouter un concert",
                    link: { name: 'concerts.create' }
                }
            }
        },
        computed: {
            ...mapState({
                concerts: state => state.concerts,
                artists: state => state.artists
            }),
            states() {
                return {
                    artists: this.artists
                }
            }
        },
        methods: {
            ...mapActions(['getConcerts', 'getArtists', 'deleteConcert']),
            remove(id) {
                this.deleteConcert(id);
            }
        },
        mounted() {
            if(!Object.keys(this.concerts).length) {
                this.getConcerts()
            }
            if(!Object.keys(this.artists).length) {
                this.getArtists()
            }
        }
    }
</script>
