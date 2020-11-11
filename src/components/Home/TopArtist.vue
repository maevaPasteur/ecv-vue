<template>
    <li>
        <a :href="'/artists/' + artist.id">
            <div class="image">
                <img :src="artist.avatar" :alt="artist.name">
                <div class="infos">
                    <span>#{{ index + 1 }}</span>
                    <p class="likes">{{ artist.likes | splitNumber }}
                        <icon-heart @click.native.prevent="like"/>
                    </p>
                    <p class="name">{{ artist.name }}</p>
                </div>
            </div>
        </a>
    </li>
</template>

<script>

    // import IconHeart from "../Icons/IconHeart";

    export default {
        name: 'TopArtist',
        // components: {IconHeart},
        props: {
            artist: Object,
            index: Number
        },
        methods: {
            like() {
                console.log('like')
            }
        }
    }

</script>