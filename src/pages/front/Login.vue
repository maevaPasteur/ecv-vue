<template>
    <div class="page-login">
        <form @submit.prevent="login">
            <h1>Je me connecte</h1>
            <label>Email</label>
            <input type="email" required v-model="email"/>
            <label>Mot de passe</label>
            <input type="password" required v-model="password"/>
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
                email: '',
                password: '',
                error: null
            }
        },
        methods: {
            login() {
                API.post('login', {
                    email: this.email,
                    password: this.password
                }).then(res => {
                    localStorage.setItem('token', res.data.accessToken)
                    this.$router.push({name: 'people'})
                }).catch(() => {
                    this.error = 'Une erreur est survenue'
                })
            }
        }

    }
</script>
