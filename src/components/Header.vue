<template>
    <div>
        <header>
            <div class="bar">
                <router-link :to="{ name: 'home' }"><h1>NEWS APP</h1></router-link>
                <router-link class="search-icon" :to="{name: 'search'}"><icon-search/></router-link>
                <p v-if="session">Bienvenue {{session.username}}</p>
                <button @click="toggleMenu" :class="{'open' : menuVisible}"></button>
            </div>
        </header>
        <transition name="fade">
            <nav v-if="menuVisible" class="menu">
                <ul>
                    <li><router-link @click.native="toggleMenu" :to="{ name: 'home' }">Accueil</router-link></li>
                    <li v-if="!session"><router-link @click.native="toggleMenu" :to="{ name: 'login' }">Connexion</router-link></li>
                    <li v-if="!session"><router-link @click.native="toggleMenu" :to="{ name: 'register' }">Inscription</router-link></li>
                    <li v-if="session"><router-link @click.native="toggleMenu" :to="{ name: 'profile' }">Mon profil</router-link></li>
                    <li  v-if="session && session.role"><router-link @click.native="toggleMenu" :to="{ name: 'admin' }">Back-office</router-link></li>
                    <li v-if="session" @click.prevent="submitLogout">Logout</li>
                </ul>
            </nav>
        </transition>
    </div>
</template>


<script>

    import IconSearch from "@/components/Icons/IconSearch";
    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'Header',
        components: {IconSearch},
        data() {
            return {
                menuVisible: false,
                errorLogout: ''
            }
        },
        computed: {
            ...mapState(['session'])
        },
        methods: {
            ...mapActions(['logout']),
            submitLogout() {
                this.logout();
                this.toggleMenu();
            },
            toggleMenu() {
                this.menuVisible = !this.menuVisible
            }
        }
    }

</script>

<style lang="scss">

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .search-icon {
        margin-right: 30px;
        margin-left: auto;
        display: flex;
        align-items: center;
        svg {
            width: 30px;
            height: auto;
        }
    }

    .menu {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        background-color: #171717;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        font-size: 40px;
        line-height: 1.5;
        text-align: center;

        li {
            cursor: pointer;
        }
    }

    header {
        position: fixed;
        left: 0;
        width: 100%;
        z-index: 3;
        top: 0;

        .bar {
            display: flex;
            font-size: 30px;
            padding: 20px;
            width: calc(100% - 40px);
            align-items: center;
            justify-content: space-between;

            p {
                margin-right: 20px;
            }
        }

        button {
            cursor: pointer;
            width: 40px;
            height: 15px;
            position: relative;

            &:hover {
                &:after {
                    transform: translateY(2px);
                }
                &:before {
                    transform: translateY(-2px);
                }
            }

            &:after,
            &:before {
                content: '';
                display: block;
                width: 100%;
                height: 2px;
                background-color: #fff;
                position: absolute;
                left: 0;
                pointer-events: none;
                transition: transform ease .3s;
            }

            &:after {
                top: 0;
            }

            &:before {
                bottom: 0;
            }

            &.open {
                &:after {
                    transform: translate(-5px, 0px) rotate(45deg);
                }
                &:before {
                    transform: rotate(-45deg);
                    transform-origin: left;
                }
            }
        }
    }
</style>