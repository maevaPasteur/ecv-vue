<template>
    <div class="backoffice">

        <div class="breadcrumb">
            <router-link :to="{ name: 'admin' }">Admin</router-link>
            <router-link :to="{ name: 'news.index' }">Tous les articles</router-link>
            <a href="#">Nouveau</a>
        </div>

        <h1>Créer un article</h1>
        <form @submit.prevent="create">
            <label>Titre</label>
            <input required type="text" v-model="article.title"/>
            <label>Date</label>
            <input required type="date" v-model="article.published"/>
            <label>Lien de l'image</label>
            <input required type="text" v-model="article.image"/>
            <img :src="article.image">
            <label>Contenu</label>
            <textarea required v-model="article.content"></textarea>
            <p class="label">Les artistes taggés</p>
            <div class="list-checkbox">
                <div v-for="(artist, index) in artists" :key="'artis-create-new'+index">
                    <input type="checkbox" :id="'artist'+artist.id" :value="artist.id" v-model="article.artistesId"/>
                    <label :for="'artist'+artist.id">{{ artist.name }}</label>
                </div>
            </div>
            <p v-if="error" class="error">{{ error }}</p>
            <button type="submit">Ajouter</button>
        </form>
    </div>
</template>

<script>

    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {
                article: {
                    title: '',
                    content: '',
                    published: '',
                    image: '',
                    artistesId: []
                },
                error: null
            }
        },
        computed: {
            ...mapState({
                artists: state => state.artists
            })
        },
        methods: {
            ...mapActions(['getArtists', 'createNew']),
            create() {
                this.createNew(this.article).then(id => {
                    this.$router.push({name: 'news.show', params: { id: id } })
                }).catch(err => {
                    this.error = err
                })
            }
        },
        mounted() {
            if (!Object.keys(this.artists).length) {
                this.getArtists()
            }
        }
    }
</script>
