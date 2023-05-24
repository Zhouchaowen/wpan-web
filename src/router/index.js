import { createRouter, createWebHashHistory } from 'vue-router';
import layoutIndex from "../components/layoutIndex.vue";
import dashboard from "../views/Index/index";
import allFiles from "../views/AllFiles/index";

const routeIndex = [
    // 首页
    {
        path: '/',
        redirect: '/dashboard',
        meta: { title: '首页' },
        component: layoutIndex,
        children: [
            {
                path: '/dashboard',
                name: 'dashboard',
                mata: { title: 'dashboard' },
                component: dashboard
            },
            {
                path: '/allFiles/:type',
                name: 'allFiles',
                mata: { title: 'allFiles' },
                component: allFiles
            }
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routeIndex
});
export default router
