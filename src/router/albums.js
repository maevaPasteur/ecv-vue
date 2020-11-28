import Index from '@/pages/backoffice/albums/Index.vue'
import Show from '@/pages/backoffice/albums/Show.vue'
import Create from '@/pages/backoffice/albums/Create.vue'
import Edit from '@/pages/backoffice/albums/Edit.vue'

const newsRoutes = [
    {
        path: '/admin/albums',
        name: 'albums.index',
        component: Index,
        meta: {
            auth: true
        }
    },
    {
        path: '/admin/albums/nouveau',
        name: 'albums.create',
        component: Create,
        meta: {
            auth: true
        }
    },
    {
        path: '/admin/albums/:id/modifier',
        name: 'albums.edit',
        component: Edit,
        meta: {
            auth: true
        }
    },
    {
        path: '/admin/albums/:id',
        name: 'albums.show',
        component: Show,
        meta: {
            auth: true
        }
    }
];

export default newsRoutes