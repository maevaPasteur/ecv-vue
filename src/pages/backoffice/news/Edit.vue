<template>
  <div class="backoffice" v-if="article">

    <div class="breadcrumb">
      <router-link :to="{ name: 'admin' }">Admin</router-link>
      <router-link :to="{ name: 'news.index' }">Tous les articles</router-link>
      <router-link :to="{ name: 'news.show', params: { id: article.id } }">Voir l'article</router-link>
      <a href="#">Modifier</a>
    </div>

    <h1>Modifier l'article</h1>
    <form>
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
      <button @submit="save">Valider</button>
    </form>
  </div>
</template>

<script>

export default {

  data() {
    return {
      id: this.$route.params.id,
      article: null
    }
  },
  methods: {
    save() {

    }
  },
  computed: {
    artists() {
      return this.$store.state.artists
    }
  },
  mounted () {
    this.$store.dispatch('getNew', this.id).then(res => {
      this.article = res;
    });
    this.$store.dispatch('getArtists')
  }
}

</script>
