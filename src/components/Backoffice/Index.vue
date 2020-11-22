<template>
    <div class="backoffice">
        <div class="breadcrumb">
            <router-link :to="{ name: 'admin' }">Admin</router-link>
            <a href="#">{{ link }}</a>
        </div>
        <h1>{{ title }}</h1>
        <table>
            <tr>
                <th @click="sort('id')" class="sort"><span>ID</span></th>
                <th v-for="(col, index) in cols" :key="'col-index-'+index" @click="sort(col.param)" :class="{'sort' : !['artistId', 'genreId'].includes(col.param)}"><span>{{ col.title }}</span></th>
                <th></th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in sortedItems" :key="'item-index-' + index">
                <td>
                    <router-link class="id" :to="{ name: routes.show, params: { id: item.id } }">
                        {{ item.id }}
                    </router-link>
                </td>
                <td v-for="(col, index) in cols" :key="'field-col-index-'+index">
                    <div v-if="col.param === 'artistId'">
                        <div v-if="states.artists" :set="data[index] = states.artists.find(e => e.id === item.artistId)">
                            <router-link v-if="data[index]" :to="{ name: 'artists.show', params: { id: data[index].id } }">
                                <img class="avatar" :src="data[index].avatar" :alt="data[index].name">
                                <span>{{ data[index].name }}</span>
                            </router-link>
                        </div>
                    </div>
                    <div v-else-if="col.param === 'avatar'">
                        <img class="avatar" :src="item.avatar" :alt="item.name">
                        <span>{{ item.name }}</span>
                    </div>
                    <div v-else-if="col.isAlbum">
                        <img class="cover" :alt="item.name" :src="item.cover">
                        <span>{{ item.name }}</span>
                    </div>
                    <span v-else>{{ getValue(item, col.param) }}</span>
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
        <div class="btn-actions">
            <router-link :to="button.link" class="create">{{ button.title }}</router-link>
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

    import Vue from 'vue'

    export default {
        name: 'Index',
        data() {
            return {
                data: [],
                showPopin: false,
                deleteId: null,
                currentSort:'name',
                currentSortDir:'asc'
            }
        },
        props: {
            title: String,
            link: String,
            cols: Array,
            routes: Object,
            items: Array,
            confirmSentence: String,
            button: Object,
            states: Object
        },
        computed: {
            sortedItems() {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                return this.items.sort((a,b) => {
                    let modifier = 1;
                    if(this.currentSortDir === 'desc') modifier = -1;
                    if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                    if(a[this.currentSort] > b[this.currentSort]) return modifier;
                    return 0;
                });
            }
        },
        methods: {
            sort(s) {
                if(s === 'avatar') s = 'name';
                if(s === this.currentSort) this.currentSortDir = this.currentSortDir==='asc' ? 'desc' : 'asc';
                this.currentSort = s;
            },
            getValue(item, param) {
                const value = item[param];

                switch (param) {
                    case 'comments':
                        return value && value.length ? Vue.filter('splitNumber')(value.length) : 0;
                        // eslint-disable-next-line no-unreachable
                        break;

                    case 'likes':
                        return value ? Vue.filter('splitNumber')(value) : 0;
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
