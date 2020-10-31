<template>
    <div>
        <h1>Hello home</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequatur consequuntur delectus deserunt
            ex fuga, fugiat in minus quam reiciendis totam veniam, veritatis voluptatibus? Accusamus ducimus facere iusto
            optio vitae?</p>
        <router-link :to="{name: 'test'}">Lien A</router-link>
    </div>
</template>

<script>

    export default {
        name: 'Home'
    }
</script>