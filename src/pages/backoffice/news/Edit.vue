<template>
  <div class="backoffice" v-if="article">

    <div class="breadcrumb">
      <router-link :to="{ name: 'admin' }">Admin</router-link>
      <router-link :to="{ name: 'news.index' }">Tous les articles</router-link>
      <router-link :to="{ name: 'news.show', params: { id: article.id } }">Voir l'article</router-link>
      <a href="#">Modifier</a>
    </div>

    <h1>Modifier l'article</h1>
    <form @submit.prevent='save'>
      <label>Titre</label>
      <input required type="text" v-model="article.title" />
      <label>Date</label>
      <input required type="text" v-model="article.published"/>
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
      <button type="submit">Valider</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {

  data() {
    return {
      id: this.$route.params.id,
    }
  },
  methods: {
    ...mapActions(['getNews', 'getArtists', 'updateNew']),
    save () {
      this.updateNew(this.article);
    }
  },
  computed: {
    ...mapState({
      article (state) {
        if (state.news.length === 0) return {};

        const urlId = parseInt(this.$route.params.id);
        return state.news.find(n => n.id === urlId);
      },
      artists: state => state.artists
    })
  },
  mounted () {
    if (Object.keys(this.article).length) return;

    this.getNews();
    this.getArtists();
  }
}

</script>
