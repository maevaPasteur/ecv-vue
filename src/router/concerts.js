import Index from '@/pages/backoffice/concerts/Index.vue'
import Show from '@/pages/backoffice/concerts/Show.vue'
import Create from '@/pages/backoffice/concerts/Create.vue'
import Edit from '@/pages/backoffice/concerts/Edit.vue'

const newsRoutes = [
    {
        path: '/admin/concerts',
        name: 'concerts.index',
        component: Index,
        meta: {
            auth: true
        }
    },
    {
        path: '/admin/concerts/nouveau',
        name: 'concerts.create',
        component: Create,
        meta: {
            auth: true
        }
    },
    {
        path: '/admin/concerts/:id/modifier',
        name: 'concerts.edit',
        component: Edit,
        meta: {
            auth: true
        }
    },
    {
        path: '/admin/concerts/:id',
        name: 'concerts.show',
        component: Show,
        meta: {
            auth: true
        }
    }
];

export default newsRoutes
