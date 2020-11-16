<template>
    <div class="backoffice">
        <div class="breadcrumb">
            <router-link :to="{ name: 'admin' }">Admin</router-link>
            <a href="#">{{ link }}</a>
        </div>
        <h1>{{ title }}</h1>
        <table>
            <tr>
                <th>ID</th>
                <th v-for="(col, index) in cols" :key="'col-index-'+index">{{ col.title }}</th>
                <th></th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in items" :key="'item-index-' + index">
                <td>
                    <router-link class="id" :to="{ name: routes.show, params: { id: item.id } }">{{ item.id }}</router-link>
                </td>
                <td v-for="(col, index) in cols" :key="'field-col-index-'+index">
                    {{ getValue(item, col.param) }}
                </td>
                <td>
                    <router-link class="edit" :to="{ name: routes.edit, params: { id: item.id } }">
                        <img src="@/assets/images/pen.svg" alt="modifier">
                    </router-link>
                </td>
                <td>
                    <a href="#" class="delete" @click.prevent="openPopin(item.id)">
                        <img src="@/assets/images/delete.svg" alt="supprimer">
                    </a>
                </td>
            </tr>
        </table>
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

    import Vue from 'vue'

    export default {
        name: 'Index',
        data() {
            return {
                showPopin: false,
                deleteId: null
            }
        },
        props: {
            title: String,
            link: String,
            cols: Array,
            routes: Object,
            items: Array,
            confirmSentence: String
        },
        methods: {
            getValue(item, param) {
                const value = item[param];

                switch (param) {
                    case 'comments':
                        return value ? value.length : 0;
                        // eslint-disable-next-line no-unreachable
                        break;

                    case 'likes':
                        return value ? value : 0;
                        // eslint-disable-next-line no-unreachable
                        break;

                    case 'published':
                    case 'date':
                        return Vue.filter('date')(item[param]);
                        // eslint-disable-next-line no-unreachable
                        break;

                    default:
                        return item[param]
                }
            },
            openPopin(id) {
                this.showPopin = true;
                this.deleteId = id
            },
            remove() {
                this.$emit('remove', this.deleteId);
                this.showPopin = false
            }
        }
    }
</script>
