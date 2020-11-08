<template>

    <div class="backoffice">
        <section>
            <h1>Back Office</h1>
            <p class="text">Bienvenue sur votre interface d'administration</p>
            <div class="list-menu">
                <details open>
                    <summary><h2>Les articles</h2></summary>
                    <div class="text">
                        <router-link :to="{ name: 'news.index' }">Voir tous les articles</router-link>
                        <router-link :to="{ name: 'news.create' }">Ajouter un article</router-link>
                    </div>
                </details>
                <details open>
                    <summary><h2>Les utilisateurs</h2></summary>
                    <div class="text">
                        <router-link :to="{ path: 'register' }">Voir tous les utilisateurs</router-link>
                        <router-link :to="{ path: 'register' }">Ajouter un utilisateur</router-link>
                    </div>
                </details>
                <details open>
                    <summary><h2>Les concerts</h2></summary>
                    <div class="text">
                        <router-link :to="{ path: 'register' }">Voir tous les concerts</router-link>
                        <router-link :to="{ path: 'register' }">Ajouter un concert</router-link>
                    </div>
                </details>
                <details open>
                    <summary><h2>Les albums</h2></summary>
                    <div class="text">
                        <router-link :to="{ path: 'register' }">Voir tous les albums</router-link>
                        <router-link :to="{ path: 'register' }">Ajouter un album</router-link>
                    </div>
                </details>
                <details open>
                    <summary><h2>Les artistes</h2></summary>
                    <div class="text">
                        <router-link :to="{ path: 'register' }">Voir tous les artistes</router-link>
                        <router-link :to="{ path: 'register' }">Ajouter un artiste</router-link>
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
