<template>
    <transition name="fade">
        <div v-if="visible" class="loader" aria-hidden="true">
            <div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </transition>
</template>

<script>

    export default {
        name: 'Loader',
        props: {
            visible: Boolean
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

    .loader {
        position: fixed;
        z-index: 9;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        background-color: #000;

        div {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }

        @keyframes animLoader {
            0% {
                opacity: 0;
                transform: translateX(-50px);
            }
            20% {
                opacity: 1;
                transform: translateX(0px);
            }
            60% {
                opacity: 1;
                transform: translateX(0px);
            }
            90% {
                opacity: 0;
                transform: translateX(50px);
            }
            100% {
                opacity: 0;
                transform: translateX(50px);
            }
        }

        span {
            width: 10px;
            height: 10px;
            display: block;
            background-color: #fff;
            border-radius: 50%;
            margin: 0 10px;
            opacity: 0;

            &:nth-of-type(6) {
                animation: animLoader 2.5s infinite ease-in-out;
            }
            &:nth-of-type(5) {
                animation: animLoader 2.5s .1s infinite ease-in-out;
            }
            &:nth-of-type(4) {
                animation: animLoader 2.5s .2s infinite ease-in-out;
            }
            &:nth-of-type(3) {
                animation: animLoader 2.5s .3s infinite ease-in-out;
            }
            &:nth-of-type(2) {
                animation: animLoader 2.5s .4s infinite ease-in-out;
            }
            &:nth-of-type(1) {
                animation: animLoader 2.5s .5s infinite ease-in-out;
            }
        }
    }

</style>