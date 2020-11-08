import Index from '@/backoffice/news/Index.vue'
import Show from '@/backoffice/news/Show.vue'
import Create from '@/backoffice/news/Create.vue'
import Edit from '@/backoffice/news/Edit.vue'

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
