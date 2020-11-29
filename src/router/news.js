import Index from '@/pages/backoffice/news/Index.vue'
import Show from '@/pages/backoffice/news/Show.vue'
import Create from '@/pages/backoffice/news/Create.vue'
import Edit from '@/pages/backoffice/news/Edit.vue'

const newsRoutes = [
  {
    path: '/admin/article',
    name: 'news.index',
    component: Index,
    meta: {
      auth: 'admin'
    }
  },
  {
    path: '/admin/article/nouveau',
    name: 'news.create',
    component: Create,
    meta: {
      auth: 'admin'
    }
  },
  {
    path: '/admin/article/:id/modifier',
    name: 'news.edit',
    component: Edit,
    meta: {
      auth: 'admin'
    }
  },
  {
    path: '/admin/article/:id',
    name: 'news.show',
    component: Show,
    meta: {
      auth: 'admin'
    }
  }
];

export default newsRoutes
