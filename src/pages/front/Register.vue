<template>
    <div class="page-login">
        <form>
            <h1>Je créer mon compte</h1>
            <label>Pseudo</label>
            <input type="text" v-model="username"/>
            <label>Email</label>
            <input type="email" v-model="email"/>
            <label>Mot de passe</label>
            <input type="password" v-model="password"/>
            <p v-if="error">{{ error }}</p>
            <button type="submit" @submit.prevent="submit">Inscription</button>
            <router-link class="text" :to="{ name: 'login' }">J'ai déjà un compte</router-link>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                email: '',
                password: '',
                username: '',
                error: null
            }
        },
        methods: {
            submit() {
                axios.post('register', {
                    email: this.email,
                    password: this.password
                })
                    .then(res => {
                        localStorage.setItem('token', res.data.accessToken)
                        this.$router.push({name: 'people'})
                    })
                    .catch(() => {
                        this.error = 'Une erreur est survenue'
                    })
            }
        }
    }
</script>
