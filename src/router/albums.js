import Index from '@/pages/backoffice/albums/Index.vue'
import Show from '@/pages/backoffice/albums/Show.vue'
import Create from '@/pages/backoffice/albums/Create.vue'
import Edit from '@/pages/backoffice/albums/Edit.vue'

const newsRoutes = [
    {
        path: '/admin/albums',
        name: 'albums.index',
        component: Index
    },
    {
        path: '/admin/albums/nouveau',
        name: 'albums.create',
        component: Create
    },
    {
        path: '/admin/albums/:id/modifier',
        name: 'albums.edit',
        component: Edit
    },
    {
        path: '/admin/albums/:id',
        name: 'albums.show',
        component: Show
    }
];

export default newsRoutes