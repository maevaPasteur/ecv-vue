import Backoffice from "@/pages/backoffice/Index";

const newsRoutes = [
    {
        path: '/admin',
        name: 'admin',
        component: Backoffice,
        meta: {
            auth: true
        }
    }
];

export default newsRoutes