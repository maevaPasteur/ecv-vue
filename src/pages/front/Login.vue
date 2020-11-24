<template>
    <div class="page-login">
        <form @submit.prevent="login">
            <h1>Je me connecte</h1>
            <label>Pseudo</label>
            <input type="text" required v-model="user.username"/>
            <label>Mot de passe</label>
            <input type="password" required v-model="user.password"/>
            <p class="error" v-if="error">{{ error }}</p>
            <button type="submit">Connexion</button>
            <router-link class="text" :to="{ name: 'register' }">Je n'ai pas encore de compte</router-link>
        </form>
    </div>
</template>

<script>

    import API from '../../api/config'

    export default {
        data() {
            return {
                user: {
                    username: '',
                    email: '',
                    password: ''
                },
                error: null
            }
        },
        methods: {
            login() {
                API.post('login', this.user).then(res => {
                    localStorage.setItem('token', res.data.accessToken)
                    this.$router.push({name: 'profile'})
                }).catch(() => {
                    this.error = 'Une erreur est survenue'
                })
            }
        }

    }
</script>
