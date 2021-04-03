import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
function importComponent(path) {
    return () => import(`./components/${path}.vue`)
}

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/index",
            component: importComponent('Navbar'),
            children: [
                {
                    path: '/index',
                    meta: {title: 'Atma Korean BBQ'},
                    component: importComponent('Index'),
                },
                {
                    path: '/menu',
                    meta: {title: 'Menu - Atma Korean BBQ'},
                    component: importComponent('Menu'),
                },
            ]
        },
        {
            path: "/dashboard",
            component: importComponent('Dashboard/Sidebar'),
            children: [
                //Dashboard
                {
                    path: "/dashboard",
                    name: "Dashboard",
                    meta: {title: 'Dashboard - Atma Korean BBQ'},
                    component: importComponent('Dashboard/Dashboard'),
                },
            ]
        },
        {
            path: '*',
            redirect: '/index',
        }
    ],
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})
export default router;