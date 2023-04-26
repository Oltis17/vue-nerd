import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import * as api from './api';

import MainScreen from './views/MainScreen.vue';
import LoginScreen from './views/LoginScreen.vue';
import ProfileScreen from './views/ProfileScreen.vue';
import IpDetailsScreen from './views/IpDetailsScreen.vue';
import NotFound from './views/NotFound.vue';
import UnAuthorized from './views/UnAuthorized.vue';
import AboutScreen from './views/AboutScreen.vue';
import CreateAccountScreen from './views/CreateAccountScreen.vue';
import IpWarden from './views/IpWarden.vue';
import IpDshield from './views/IpDshield.vue';
import IpOTX from './views/IpOTX.vue';
import AdminScreen from './views/AdminScreen.vue';

const router = createRouter({
    history: createWebHistory('/nerd2'),
    base: '/nerd2',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginScreen,
            meta: {
                title: 'Login'
            }
            // beforeEnter: auth.ifNotAuthenticated,
        },
        {
            path: '/create-account',
            name: 'create-account',
            component: CreateAccountScreen,
            meta: {
                title: 'Login'
            }
            // beforeEnter: auth.ifNotAuthenticated,
        },
        {
            path: '/',
            name: 'home',
            component: MainScreen,
            meta: {
                title: 'NERD - Home'
            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileScreen,
            meta: {
                title: 'NERD - Profile'
            },
            beforeEnter: api.ifAuthenticated,
        },
        {
            path: '/admin',
            name: 'admin',
            component: AdminScreen,
            meta: {
                title: 'NERD - Admin Console'
            },
            beforeEnter: api.ifAuthenticated,
        },
        {
            path: '/ip/:addr',
            name: '/ip/:addr',
            component: IpDetailsScreen,
            meta: {
                title: 'NERD - IP details'
            }
        },
        {
            path: '/ip/:addr/warden',
            name: '/ip/:addr/warden',
            component: IpWarden,
            meta: {
                title: 'NERD - Warden'
            }
        },
        {
            path: '/ip/:addr/dshield',
            name: '/ip/:addr/dshield',
            component: IpDshield,
            meta: {
                title: 'NERD - IP details'
            }
        },
        {
            path: '/ip/:addr/otx',
            name: '/ip/:addr/otx',
            component: IpOTX,
            meta: {
                title: 'NERD - IP details'
            }
        },
        {
            path: '/about',
            name: 'about',
            component: AboutScreen,
            meta: {
                title: 'NERD - About'
            }
        },
        {
            path: '/unauthorized',
            name: 'unauthorized',
            component: UnAuthorized,
        },
        {
            path: '/:pathMatch(.*)*',
            component: NotFound,
        },
],
});

/**
 * Axios response interceptor
 */
axios.interceptors.response.use(null, async (error) => {
// Check if error could be handled
if (error && error.response && error.response.status === 403) {
    // Redirect to unauthorized page
    router.replace({ name: 'unauthorized' });
}

throw error;
});

export default router;
