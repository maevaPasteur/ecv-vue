<template>
    <div class="page-login">
        <form>
            <h1>Je créer mon compte</h1>
            <label>Pseudo</label>
            <input type="text" v-model="user.username"/>
            <label>Email</label>
            <input type="email" v-model="user.email"/>
            <input type="email" required v-model="user.email"/>
            <label>Lien de l'avatar</label>
            <input type="text" required v-model="user.avatar"/>
            <img class="avatar" :src="user.avatar" alt="avatar">
            <label>Mot de passe</label>
            <input type="password" required v-model="user.password"/>
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
                user: {
                    email: '',
                    password: '',
                    username: '',
                    avatar: ''
                },
                error: null
            }
        },
        methods: {
            submit() {
                axios.post('register', this.user).then(res => {
                    localStorage.setItem('token', res.data.accessToken);
                    this.$router.push({name: 'profile'})
                }).catch(() => {
                    this.error = 'Une erreur est survenue'
                })
            }
        }
    }
</script>
