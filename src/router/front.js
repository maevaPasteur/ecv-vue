import Home from "@/pages/front/Home";
import Article from "@/pages/front/Article";
import Artist from "@/pages/front/Artist";
import Login from "@/pages/front/Login";
import Register from "@/pages/front/Register";
import Profile from "@/pages/front/Profile";
import Search from "@/pages/front/Search";

const frontRoutes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/articles/:id',
        name: 'article',
        component: Article
    },
    {
        path: '/artists/:id',
        name: 'artist',
        component: Artist
    },
    {
        path: '/connexion',
        name: 'login',
        component: Login
    },
    {
        path: '/inscription',
        name: 'register',
        component: Register
    },
    {
        path: '/mon-compte',
        name: 'profile',
        component: Profile,
        meta: {
            auth: 'user'
        }
    },
    {
        path: '/rechercher',
        name: 'search',
        component: Search
    }
];

export default frontRoutes