<template>
    <div class="page-login">
        <form @submit.prevent="submit">
            <h1>Je me connecte</h1>
            <label>Mail</label>
            <input type="email" required v-model="user.email"/>
            <label>Mot de passe</label>
            <input type="password" required v-model="user.password"/>
            <p class="error" v-if="error">{{ error }}</p>
            <button type="submit">Connexion</button>
            <router-link class="text" :to="{ name: 'register' }">Je n'ai pas encore de compte</router-link>
        </form>
    </div>
</template>

<script>

import {mapActions, mapState} from 'vuex';

    export default {
        data() {
            return {
                user: {
                    email: '',
                    password: ''
                },
                error: null
            }
        },
        computed: {
            ...mapState({
                session: state => state.session
            })
        },
        methods: {
            ...mapActions(['login']),
            submit() {
                this.login(this.user)
                    .then(() => this.$router.push('/'))
                    .catch(() => this.error = 'Adresse email ou mot de passe incorrect');
            }
        },
        mounted() {
            if(this.session) this.$router.push('/')
        }

    }
</script>
