<template>
    <div class="backoffice">
        <slot/>
        <div class="btn-actions">
            <router-link :to="{name: editRouteName, params: { id: id }}">Modifier <img src="@/assets/images/pen.svg" alt="modifier l'article"></router-link>
            <a href="#" @click.prevent="showPopin = true">Supprimer <img src="@/assets/images/delete.svg" alt="supprimer l'article"></a>
        </div>
        <transition name="fade">
            <div v-if="showPopin" class="popin-confirm" @click="showPopin = false">
                <div @click.stop="">
                    <p>{{ confirmSentence }}</p>
                    <div class="btn-actions">
                        <button @click="showPopin = false">Non</button>
                        <button @click="remove">Oui</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>

    export default {
        name: 'Show',
        data() {
            return {
                showPopin: false
            }
        },
        props: {
            editRouteName: String,
            id: [String, Number],
            confirmSentence: {
                type: String,
                default: 'Êtes vous sûre de vouloir le supprimer ?'
            }
        },
        methods: {
            remove() {
                this.$emit('remove')
            }
        }
    }

</script>