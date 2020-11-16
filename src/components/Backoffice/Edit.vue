<template>
    <div class="backoffice" v-if="activeObject">

        <div class="breadcrumb">
            <router-link :to="{ name: 'admin' }">Admin</router-link>
            <router-link v-for="(route, index) in routes" :key="'route-'+index" :to="route.link">{{ route.title }}</router-link>
            <a href="#">Modifier</a>
        </div>

        <h1>{{ title }}</h1>

        <form @submit.prevent='save'>
            <div v-for="(field, index) in fields" :key="'edit-field-'+index">

                <div v-if="field.type === 'text' || field.type === 'date'">
                    <label>{{ field.title }}</label>
                    <input required type="field.type" v-model="activeObject[field.param]"/>
                </div>

                <div v-else-if="field.type === 'image'">
                    <label>{{ field.title }}</label>
                    <input required type="text" v-model="activeObject[field.param]"/>
                    <img :src="activeObject[field.param]">
                </div>

                <div v-else-if="field.type === 'textarea'">
                    <label>{{ field.title }}</label>
                    <textarea required v-model="activeObject[field.param]"></textarea>
                </div>

                <div v-else-if="field.type === 'checkbox'">
                    <p class="label">{{ field.label }}</p>
                    <div class="list-checkbox">
                        <div v-for="(option, index) in states[field.options]" :key="'artis-create-new'+index">
                            <input type="checkbox" :id="'option'+option.id" :value="option.id" v-model="activeObject[field.param]"/>
                            <label :for="'option'+option.id">{{ option.name }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <button type="submit">Valider</button>

        </form>
    </div>
</template>

<script>

    export default {
        name: 'Edit',
        props: {
            activeObject: Object,
            title: String,
            routes: Array,
            fields: Array,
            states: Object
        },
        methods: {
            save() {
                this.$emit('save')
            }
        }
    }

</script>
