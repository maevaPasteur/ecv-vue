import Index from '@/pages/backoffice/artists/Index.vue'
import Show from '@/pages/backoffice/artists/Show.vue'
import Create from '@/pages/backoffice/artists/Create.vue'
import Edit from '@/pages/backoffice/artists/Edit.vue'

const newsRoutes = [
    {
        path: '/admin/artists',
        name: 'artists.index',
        component: Index
    },
    {
        path: '/admin/artists/nouveau',
        name: 'artists.create',
        component: Create
    },
    {
        path: '/admin/artists/:id/modifier',
        name: 'artists.edit',
        component: Edit
    },
    {
        path: '/admin/artists/:id',
        name: 'artists.show',
        component: Show
    }
];

export default newsRoutes
