import Backoffice from "@/pages/backoffice/Index";

const newsRoutes = [
    {
        path: '/admin',
        name: 'admin',
        component: Backoffice,
        meta: {
            auth: 'admin'
        }
    }
];

export default newsRoutes