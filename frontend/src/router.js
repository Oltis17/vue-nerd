import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';

import MainScreen from './views/MainScreen.vue';
import LoginScreen from './views/LoginScreen.vue';
import ProfileScreen from './views/ProfileScreen.vue';
import NotFound from './views/NotFound.vue';
import UnAuthorized from './views/UnAuthorized.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginScreen,
            // beforeEnter: auth.ifNotAuthenticated,
        },
        {
            path: '/',
            name: 'home',
            component: MainScreen,
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileScreen,
            // beforeEnter: auth.ifAuthenticated,
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
