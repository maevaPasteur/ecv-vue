<template>
    <div class="backoffice">
        <div class="breadcrumb">
            <router-link :to="{ name: 'admin' }">Admin</router-link>
            <a href="#">Tous les articles</a>
        </div>
        <h1>Les articles</h1>
        <table>
            <tr>
                <th>ID</th>
                <th>Titre</th>
                <th>Date</th>
                <th>Likes</th>
                <th>Commentaires</th>
                <th></th>
                <th></th>
            </tr>
            <tr v-for="article in news" :key="'new-' + article.id">
                <td>
                    <router-link class="id" :to="{ name: 'news.show', params: { id: article.id } }">{{ article.id }}</router-link>
                </td>
                <td>{{ article.title }}</td>
                <td>{{ article.published }}</td>
                <td>{{ article.likes }}</td>
                <td>{{ article.comments.length }}</td>
                <td>
                    <router-link class="edit" :to="{ name: 'news.edit', params: { id: article.id } }"><img src="@/assets/images/pen.svg" alt="modifier l'article"></router-link>
                </td>
                <td>
                    <router-link class="delete" :to="{ name: 'news.delete', params: { id: article.id } }"><img src="@/assets/images/delete.svg" alt="supprimer l'article"></router-link>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>

    export default {
        computed: {
            news() {
                return this.$store.state.news
            }
        },
        mounted() {
            this.$store.dispatch('getNews')
        }
    }
</script>
