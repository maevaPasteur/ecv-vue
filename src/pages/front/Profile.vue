<template>
    <div class="page-content section-item page-profile" v-if="session">
        <h1>Mon profil</h1>
        <div>
            <div class="infos">
                <img :src="session.avatar" :alt="session.username">
                <div>
                    <p>Pseudo : {{ session.username }}</p>
                    <p>Email : {{ session.email }}</p>
                </div>
            </div>
            <div>
                <h2>Artistes favoris</h2>
                <ul v-if="artists && artists.length">
                    <li v-for="(artist, index) in artists" :key="'user-artist-'+index">
                        <router-link :to="{ name: 'artist', params: { id: artist.id }}">
                            <img :src="artist.avatar" :alt="artist.name">
                            <p>{{ artist.name }}</p>
                        </router-link>
                    </li>
                </ul>
                <p v-else>Vous n'avez ajouté aucun artiste à vos favoris...</p>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'Profile',
        computed: {
            ...mapState({
                artists(state) {
                  if(this.session && this.session.artistLiked && state.artists) {
                      return state.artists.filter(e => this.session.artistLiked.includes(e.id))
                  }
                  return {}
                },
                session: state => state.session
            })
        },
        methods: {
            ...mapActions(['getArtists'])
        },
        mounted() {
            if(!this.artists.length) {
                this.getArtists()
            }
        }
    }

</script>

<style lang="scss">
    .page-profile {
        h2 {
            margin-top: 40px;
        }

        .infos {
            display: flex;
            align-items: center;
            margin-top: 20px;
            img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
                object-fit: cover;
                margin-right: 20px;
            }
        }

        ul {
            display: flex;
            flex-wrap: wrap;
            text-align: center;

            img {
                width: 140px;
                height: 140px;
                border-radius: 50%;
                object-fit: cover;
                transition: transform ease-out .2s;
            }
        }

        li {
            margin-right: 20px;

            a:hover img {
                transform: scale(.95);
            }
        }

    }
</style>