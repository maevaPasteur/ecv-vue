<template>
    <footer class="text">
        <p>Projet Vuejs x Vuex - Master 2 - ECV Digital</p>
        <p>Réalisé par Lucas Tostée & Maëva Pasteur</p>
        <a href="https://github.com/maevaPasteur/ecv-vue">Voir le Github</a>
    </footer>
</template>


<script>

    export default {
        name: 'Footer'
    }

</script>

<style lang="scss">

    footer {
        margin-top: 80px;
        padding: 20px;
        text-align: center;

        p, a {
            font-size: 12px;
            line-height: 1.5;
            color: #ddd;
        }

        p:first-of-type {
            text-transform: uppercase;
            letter-spacing: .5px;
            color: #fff;
            margin-bottom: 10px;
        }

        a {
            font-weight: bold;
        }
    }

</style>