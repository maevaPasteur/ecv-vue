<template>
    <div class="backoffice">

      <div v-if="article" class="show">
        <h1>{{ article.title }}</h1>
        <p>{{ article.published }}</p>
        <p>{{ article.content }}</p>
        <img :src="article.image" :alt="article.title">
      </div>

        <button >Edit news</button>
        <button>Delete</button>
    </div>
</template>

<script>

    export default {
      data() {
        return {
          id: Number(this.$route.params.id),
          article: null,
          artistsLoad: false,
          artists: []
        }
      },
      methods: {
        getArtists(ids) {
          ids.forEach(async (id, index) => {
            this.artists[index] = await this.$store.dispatch('getArtist', id);
            if (index === ids.length - 1) {
              this.artistsLoad = true
            }
          })
        }
      },
      mounted() {
        this.$store.dispatch('getNew', this.id).then(res => {
          this.article = res;
          if (res && res.artistesId) {
            this.getArtists(res.artistesId)
          }
        })

      }
    }

</script>
