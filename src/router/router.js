import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Node from '../views/Node.vue';
import NotFound from '../views/404.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/node/:id',
        name: "Node",
        component: Node,
        props: true
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFound
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;

