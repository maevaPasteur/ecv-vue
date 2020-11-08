import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Artist from "@/pages/Artist";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";

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
        name: 'artiste',
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
        component: Profile
    }
];

export default frontRoutes