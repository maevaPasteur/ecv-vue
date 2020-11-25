<template>
    <div class="page-login">
        <form @submit.prevent="login">
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
import API from '../../api/config';
import {mapMutations} from 'vuex';

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
            ...mapMutations(['POPULATE_SESSION_DATA']),
            async login() {
                try {
                    const res = await API.post('login', {
                        email: this.user.email,
                        password: this.user.password
                    });
                    
                    this.POPULATE_SESSION_DATA(res.data.userData);
                    this.$router.push('/');
                } catch (error) {
                    this.error = error.response.data.message
                }
            }
        }

    }
</script>
