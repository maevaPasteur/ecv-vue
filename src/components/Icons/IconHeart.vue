<template>
    <svg class="icon-heart" :class="{'is-like' : like}" :stroke="color" :stroke-width="stroke"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 480">
        <path d="M378.67,21.33C321.88,21.33,275,74.08,256,99c-19-24.9-65.88-77.65-122.67-77.65C59.81,21.33,0,88.93,0,172c0,45.32,18,87.56,49.48,116.47a10.66,10.66,0,0,0,1.68,2.18l197.31,196.9a10.65,10.65,0,0,0,15.07,0l203.88-203.8,2.1-2c1.67-1.58,3.31-3.17,5.16-5.21a10.31,10.31,0,0,0,1.89-2.54C499.44,246,512,209.83,512,172,512,88.93,452.19,21.33,378.67,21.33Z" transform="translate(5 -15.33)"/>
    </svg>
</template>

<script>

    export default {
        name: 'IconHeart',
        props: {
            like: {
                type: Boolean,
                default: false
            },
            color: {
                type: String,
                default: "#df0428"
            },
            stroke: {
                type: String,
                default: "30px"
            }
        }
    }

</script>

<style lang="scss">

    .icon-heart {
        transition: fill ease .2s, stroke ease .2s;
        cursor: pointer;
        fill: none;

        &:hover {
           stroke: #df0428;
        }

        &.is-like {
            fill: #df0428;
        }
    }

</style>