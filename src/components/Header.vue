<template>
    <header>
        <div class="bar">
            <a href="/"><h1>News APP</h1></a>
            <button></button>
        </div>
    </header>
</template>


<script>

    export default {
        name: 'Header'
    }

</script>

<style lang="scss">
    header {
        position: fixed;
        left: 0;
        width: 100%;
        z-index: 2;
        top: 0;

        .bar {
            display: flex;
            font-size: 30px;
            padding: 20px;
            width: calc(100% - 40px);
            align-items: center;
            justify-content: space-between;
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
        }
    }
</style>