import Index from '@/pages/backoffice/news/Index.vue'
import Show from '@/pages/backoffice/news/Show.vue'
import Create from '@/pages/backoffice/news/Create.vue'
import Edit from '@/pages/backoffice/news/Edit.vue'

const newsRoutes = [
  {
    path: '/news',
    name: 'news.index',
    component: Index,
  },
  {
    path: '/news/create',
    name: 'news.create',
    component: Create,
  },
  {
    path: '/news/:id/edit',
    name: 'news.edit',
    component: Edit,
  },
  {
    path: '/news/:id',
    name: 'news.show',
    component: Show,
  }
];

export default newsRoutes
