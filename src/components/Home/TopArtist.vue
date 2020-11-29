<template>
    <li>
        <router-link :to="{ name: 'artist', params: { id: artist.id }}">
            <div class="image">
                <img :src="artist.avatar" :alt="artist.name">
                <div class="infos">
                    <span>#{{ index + 1 }}</span>
                    <p class="likes">{{ artist.likes | splitNumber }}
                        <icon-heart @click.native.prevent="like" :like="isLiked"/>
                    </p>
                    <p class="name">{{ artist.name }}</p>
                </div>
            </div>
        </router-link>
    </li>
</template>

<script>

    import {mapState, mapActions, mapMutations} from 'vuex';
    import IconHeart from "@/components/Icons/IconHeart";

    export default {
        name: 'TopArtist',
        components: {IconHeart},
        props: {
            artist: Object,
            index: Number
        },
        computed: {
            ...mapState({
                session: state => state.session,
                isLiked(state) {
                    return !!(state.session && state.session.artistLiked && this.session.artistLiked.includes(this.artist.id));
                }
            })
        },
        methods: {
            ...mapMutations(['UPDATE_SESSION_FIELDS']),
            ...mapActions(['likeArtist']),
            like() {
                if(this.session) {
                    this.likeArtist({id: this.artist.id, isLiked: this.isLiked})
                        .then(res => this.UPDATE_SESSION_FIELDS({artistLiked: res.data.newArtistLiked}))
                } else {
                    this.$router.push({name: 'login'})
                }
            }
        }
    }

</script>