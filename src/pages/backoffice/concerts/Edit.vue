<template>

    <edit
        :activeObject="concert"
        :title="title"
        :routes="routes"
        :fields="fields"
        :states="states"
        :showLoader="showLoader"
        @save="save"
    />

</template>

<script>

    import Edit from '@/components/Backoffice/Edit';
    import {mapState, mapActions} from 'vuex';

    export default {
        components: { Edit },
        data() {
            return {
                id: this.$route.params.id,
                title: "Modifier l'article",
                routes: [
                    { title: "Tous les concerts", link: { name: 'concerts.index' } },
                    { title: "Voir le concert", link: { name: 'concerts.show', params: { id: this.$route.params.id } } }
                ],
                fields: [
                    {label: "Lieu du concert", param: "name", type: "text"},
                    {label: "Date", param: "date", type: "date"},
                    {label: "Les artistes taggés", param: "artistId", type: "radio", options: 'artists'}
                ],
                showLoader: false
            }
        },
        methods: {
            ...mapActions(['getConcert', 'getArtists', 'updateConcert']),
            save() {
                this.showLoader = true;
                this.updateConcert(this.concert)
                    .then(() => this.$router.push({name: 'concerts.show', params: {id: this.id}}))
            }
        },
        computed: {
            ...mapState({
                concert(state) {
                    if (state.concerts.length === 0) return {};
                    return state.concerts.find(n => n.id === this.id);
                },
                artists: state => state.artists
            }),
            states() {
                return {
                    artists: this.artists
                }
            }
        },
        mounted() {
            if(!Object.keys(this.concert).length) {
                this.getConcerts()
            }
            if(!this.artists.length) {
                this.getArtists()
            }
        }
    }

</script>
