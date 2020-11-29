<template>
    <div class="page-login">
        <form @submit.prevent="submit">
            <h1>Je créer mon compte</h1>
            <label>Pseudo</label>
            <input type="text" required v-model="user.username"/>
            <label>Email</label>
            <input type="email" required v-model="user.email"/>
            <div class="choice-avatar">
                <div class="d-flex">
                    <div>
                        <img class="avatar" :src="user.avatar">
                    </div>
                    <div>
                        <label>Lien de l'avatar</label>
                        <input type="text" required v-model="user.avatar"/>
                    </div>
                </div>
                <div class="list">
                    <p>Ou choisis un avatar</p>
                    <flickity class="list-avatars" :class="{'is-dragging': isDragging}" :options="flickityOptions" @init="initSlider" ref="slider">
                        <img v-for="(avatar, index) in avatars" :key="index+'avatars'" :class="{'is-select': avatar === user.avatar}"  @click="user.avatar = avatar" :src="avatar" alt="avatar"/>
                    </flickity>
                </div>
            </div>
            <label>Mot de passe</label>
            <input type="password" required v-model="user.password"/>
            <p v-if="error" class="error">{{ error }}</p>
            <button type="submit">Inscription</button>
            <router-link class="text" :to="{ name: 'login' }">J'ai déjà un compte</router-link>
        </form>
    </div>
</template>

<script>

    import {mapActions, mapState} from 'vuex';
    import Flickity from 'vue-flickity'

    export default {
        components: {Flickity},
        data() {
            return {
                isDragging: false,
                flickityOptions: {
                    prevNextButtons: false,
                    pageDots: false,
                    contain: true
                },
                avatars: ["https://image.flaticon.com/icons/png/128/3105/3105825.png","https://image.flaticon.com/icons/png/128/3105/3105828.png","https://image.flaticon.com/icons/png/128/3105/3105830.png","https://image.flaticon.com/icons/png/128/3105/3105833.png","https://image.flaticon.com/icons/png/128/3105/3105834.png","https://image.flaticon.com/icons/png/128/3105/3105837.png","https://image.flaticon.com/icons/png/128/3105/3105841.png","https://image.flaticon.com/icons/png/128/3105/3105843.png","https://image.flaticon.com/icons/png/128/3105/3105846.png","https://image.flaticon.com/icons/png/128/3105/3105848.png","https://image.flaticon.com/icons/png/128/3105/3105853.png","https://image.flaticon.com/icons/png/128/3105/3105855.png","https://image.flaticon.com/icons/png/128/3105/3105857.png","https://image.flaticon.com/icons/png/128/3105/3105858.png","https://image.flaticon.com/icons/png/128/3105/3105860.png","https://image.flaticon.com/icons/png/128/3105/3105862.png","https://image.flaticon.com/icons/png/128/3105/3105865.png","https://image.flaticon.com/icons/png/128/3105/3105867.png","https://image.flaticon.com/icons/png/128/3105/3105868.png","https://image.flaticon.com/icons/png/128/3105/3105870.png","https://image.flaticon.com/icons/png/128/3105/3105872.png","https://image.flaticon.com/icons/png/128/3105/3105873.png","https://image.flaticon.com/icons/png/128/3105/3105875.png","https://image.flaticon.com/icons/png/128/3105/3105877.png","https://image.flaticon.com/icons/png/128/3105/3105879.png","https://image.flaticon.com/icons/png/128/3105/3105882.png","https://image.flaticon.com/icons/png/128/3105/3105883.png","https://image.flaticon.com/icons/png/128/3105/3105885.png","https://image.flaticon.com/icons/png/128/3105/3105887.png","https://image.flaticon.com/icons/png/128/3105/3105888.png","https://image.flaticon.com/icons/png/128/3105/3105890.png","https://image.flaticon.com/icons/png/128/3105/3105892.png","https://image.flaticon.com/icons/png/128/3105/3105894.png","https://image.flaticon.com/icons/png/128/3105/3105896.png","https://image.flaticon.com/icons/png/128/3105/3105898.png","https://image.flaticon.com/icons/png/128/3105/3105899.png","https://image.flaticon.com/icons/png/128/3105/3105901.png","https://image.flaticon.com/icons/png/128/3105/3105902.png","https://image.flaticon.com/icons/png/128/3105/3105904.png","https://image.flaticon.com/icons/png/128/3105/3105905.png","https://image.flaticon.com/icons/png/128/3105/3105907.png","https://image.flaticon.com/icons/png/128/3105/3105909.png","https://image.flaticon.com/icons/png/128/3105/3105910.png","https://image.flaticon.com/icons/png/128/3105/3105913.png","https://image.flaticon.com/icons/png/128/3105/3105916.png","https://image.flaticon.com/icons/png/128/3105/3105917.png","https://image.flaticon.com/icons/png/128/3105/3105919.png","https://image.flaticon.com/icons/png/128/3105/3105920.png","https://image.flaticon.com/icons/png/128/3105/3105922.png","https://image.flaticon.com/icons/png/128/3105/3105923.png"],
                user: {
                    email: '',
                    password: '',
                    username: '',
                    avatar: ''
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
            ...mapActions(['register']),
            submit() {
                this.register(this.user)
                    .then(() => this.$router.push('/'))
                    .catch(() => this.error = 'Attention, cette adresse email est déjà utilisée');
            },
            initSlider() {
                this.$refs.slider.on('dragStart', () => this.isDragging = true);
                this.$refs.slider.on('dragEnd', () => this.isDragging = false);
            }
        },
        mounted() {
            if(this.session) this.$router.push('/')
        }
    }
</script>

<style lang="scss">

    .choice-avatar {
        .d-flex {
            margin-top: 20px;
            display: flex;
            vertical-align: middle;

            label {
                margin-top: 0;
            }

            & > div {
                &:first-of-type {
                    width: 80px;
                    height: 80px;
                    border: solid 1px #fff;
                    border-radius: 50%;
                    margin-right: 20px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
                }
                &:last-of-type {
                    flex-grow: 1;
                }
            }
        }

        p {
            margin-left: 100px;
        }

        .list {
            position: relative;
        }
    }

    .list-avatars {
        display: flex;
        outline: 0;

        &.is-dragging img {
            pointer-events: none;
        }

        .flickity-viewport {
            width: 100%;
        }

        img {
            margin: 10px 10px 0 0;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            border: solid 1px #555;
            padding: 1px;
            transition: border-color ease .2s;
            cursor: pointer;

            &.is-select,
            &:hover {
                border-color: #fff;
            }
        }
    }
</style>
