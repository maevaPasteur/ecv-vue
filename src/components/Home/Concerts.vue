<template>
    <section class="next-concerts section-item" v-if="concerts && concerts.length">
        <h2>Les prochains concerts</h2>
        <div class="sliders">
            <div class="slider1">
                <flickity :class="{'is-dragging': isDragging}" :options="flickityOptions1" ref="slider1">
                    <concert v-for="(concert, index) in concerts" :key="index + concert.name" :concert="concert"/>
                </flickity>
            </div>
           <div class="slider2">
               <flickity :class="{'is-dragging': isDragging}" :options="flickityOptions2" ref="slider2" @init="onInitSliders">
                   <concert v-for="(concert, index) in concerts" :key="index + concert.name" :concert="concert"/>
               </flickity>
           </div>
        </div>
    </section>
</template>

<script>

    import { mapState, mapActions } from 'vuex';
    import Flickity from 'vue-flickity'
    import Concert from "./Concert";

    export default {
        name: 'Concerts',
        components: {
            Flickity,
            Concert
        },
        data() {
            return {
                isDragging: false,
                flickityOptions1: {
                    initialIndex: 0,
                    prevNextButtons: false,
                    pageDots: false,
                    contain: true,
                    cellAlign: 'left',
                    wrapAround: true,
                    autoPlay: true,
                    pauseAutoPlayOnHover: false
                },
                flickityOptions2: {
                    initialIndex: 1,
                    prevNextButtons: false,
                    pageDots: false,
                    contain: true,
                    cellAlign: 'left',
                    wrapAround: true
                }
            }
        },
        computed: {
            ...mapState({
                concerts(state) {
                    if (state.concerts.length === 0) return {};
                    let concerts = [];
                    const today = new Date();
                    state.concerts.forEach(concert => {
                        if(new Date(concert.date) >= today) {
                            concerts.push(concert)
                        }
                    });
                    return concerts
                },
                all_concerts: state => state.concerts
            })
        },
        methods: {
            ...mapActions(['getConcerts']),

            onInitSliders() {
                this.$refs.slider1.on('dragStart', () => this.isDragging = true);
                this.$refs.slider2.on('dragStart', () => this.isDragging = true);
                this.$refs.slider1.on('dragEnd', () => this.isDragging = false);
                this.$refs.slider2.on('dragEnd', () => this.isDragging = false);
                this.$refs.slider1.on('select', index => {
                    const slider2Index = this.$refs.slider2.selectedIndex();
                    let newIndex = (index + 1) === this.concerts.length ? 0 : index + 1;
                    if(newIndex !== slider2Index) {
                        this.$refs.slider2.select(newIndex);
                        this.restartPlayer()
                    }
                });
                this.$refs.slider2.on('select', index => {
                    const slider1Index = this.$refs.slider1.selectedIndex();
                    let newIndex = index - 1 < -1 ? -1 : index - 1;
                    if(index === 0) {
                        newIndex = this.concerts.length - 1
                    }
                    if(newIndex !== slider1Index) {
                        this.$refs.slider1.select(newIndex);
                        this.restartPlayer()
                    }
                })
            },

            restartPlayer() {
                this.$refs.slider1.stopPlayer();
                this.$refs.slider1.playPlayer();
            }
        },
        mounted() {
            if(!Object.keys(this.all_concerts).length) {
                this.getConcerts()
            }
        }
    }
</script>

<style lang="scss">

    .next-concerts {

        .is-dragging a {
            pointer-events: none;
        }

        .sliders {
            display: flex;
            justify-content: space-between;

            & > div {
                width: calc((100% - 40px) / 2);

                & > div {
                    outline: 0;
                }
            }
        }

        .slider2 {
            margin-top: 100px;
        }

        .slide {
            width: 100%;
        }

    }

</style>