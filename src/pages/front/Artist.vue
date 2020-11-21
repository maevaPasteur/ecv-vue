<template>
    <div>
        <artist-description/>
        <artists/>
    </div>
</template>

<script>

    import ArtistDescription from "@/components/Artist/ArtistDescription";
    import Artists from "@/components/Home/Artists";

    export default {
        name: 'Artist',
        components: { ArtistDescription, Artists }
    }

</script>
