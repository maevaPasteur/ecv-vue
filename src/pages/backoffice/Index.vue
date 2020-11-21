<template>

    <div class="backoffice">
        <section>
            <h1>Back Office</h1>
            <h2 class="text">Bienvenue sur votre interface d'administration</h2>
            <div class="list-menu">
                <details open>
                    <summary><h2>Les articles</h2></summary>
                    <div class="text">
                        <router-link :to="{ name: 'news.index' }">Voir tous les articles</router-link>
                        <router-link :to="{ name: 'news.create' }">Ajouter un article</router-link>
                    </div>
                </details>
                <details open>
                    <summary><h2>Les concerts</h2></summary>
                    <div class="text">
                        <router-link :to="{ name: 'concerts.index' }">Voir tous les concerts</router-link>
                        <router-link :to="{ name: 'concerts.create' }">Ajouter un concert</router-link>
                    </div>
                </details>
                <details open>
                    <summary><h2>Les albums</h2></summary>
                    <div class="text">
                        <router-link :to="{ name: 'albums.index' }">Voir tous les albums</router-link>
                        <router-link :to="{ name: 'albums.create' }">Ajouter un album</router-link>
                    </div>
                </details>
                <details open>
                    <summary><h2>Les artistes</h2></summary>
                    <div class="text">
                        <router-link :to="{ name: 'artists.index' }">Voir tous les artistes</router-link>
                        <router-link :to="{ name: 'artists.create' }">Ajouter un artiste</router-link>
                    </div>
                </details>
            </div>
        </section>
    </div>

</template>

<script>

    export default {
        name: 'Backoffice'
    }

</script>

<style lang="scss">

    .backoffice {

        .list-menu {
            display: flex;
            flex-wrap: wrap;

            details {
                width: calc((100% - 20px) / 2);

                &:nth-of-type(2n) {
                    margin-left: 20px;
                }
            }
        }
    }

</style>
