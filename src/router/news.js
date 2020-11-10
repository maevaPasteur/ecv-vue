import Index from '@/pages/backoffice/news/Index.vue'
import Show from '@/pages/backoffice/news/Show.vue'
import Create from '@/pages/backoffice/news/Create.vue'
import Edit from '@/pages/backoffice/news/Edit.vue'

const newsRoutes = [
  {
    path: '/admin/article',
    name: 'news.index',
    component: Index
  },
  {
    path: '/admin/article/create',
    name: 'news.create',
    component: Create
  },
  {
    path: '/admin/article/:id/edit',
    name: 'news.edit',
    component: Edit
  },
  {
    path: '/admin/article/:id',
    name: 'news.show',
    component: Show
  }
];

export default newsRoutes
