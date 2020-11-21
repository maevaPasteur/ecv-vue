<template>
    <div class="backoffice">

        <div class="breadcrumb">
            <router-link :to="{ name: 'admin' }">Admin</router-link>
            <router-link :to="route.link">{{ route.title }}</router-link>
            <a href="#">Nouveau</a>
        </div>

        <h1>{{ title }}</h1>

        <form @submit.prevent='create'>
            <div v-for="(field, index) in fields" :key="'edit-field-'+index">

                <div v-if="field.type === 'image'">
                    <label>{{ field.label }}</label>
                    <input required type="text" v-model="activeObject[field.param]"/>
                    <img class="show-image" :src="activeObject[field.param]">
                </div>

                <div v-else-if="field.type === 'textarea'">
                    <label>{{ field.label }}</label>
                    <textarea required v-model="activeObject[field.param]"></textarea>
                </div>

                <div v-else-if="field.type === 'checkbox' || field.type === 'radio'">
                    <p class="label">{{ field.label }}</p>
                    <div class="list-checkbox">
                        <div v-for="(option, index) in states[field.options]" :key="'artis-create-new'+index">
                            <input :required="field.type === 'radio'" :type="field.type" :id="'option'+option.id" :value="option.id" v-model="activeObject[field.param]"/>
                            <label :for="'option'+option.id">{{ option.name }}</label>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <label>{{ field.label }}</label>
                    <input required :type="field.type" v-model="activeObject[field.param]"/>
                </div>
            </div>

            <p class="error" v-if="error">{{ error }}</p>
            <button type="submit">Valider</button>

        </form>

    </div>
</template>

<script>


    export default {
        name: "Create",
        props: {
            title: String,
            route: Object,
            activeObject: Object,
            fields: Array,
            states: Object,
            error: String
        },
        methods: {
            create() {
                this.$emit('create')
            }
        }
    }
</script>
