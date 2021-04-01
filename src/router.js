import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
function importComponent(path) {
    return () => import(`./components/${path}.vue`)
}

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [{
            path: "/dashboard",
            component: importComponent('DashboardLayout'),
            children: [
                //Dashboard
                {
                    path: "/dashboard",
                    name: "Dashboard",
                    meta: {title: 'Dashboard'},
                    component: importComponent('Dashboard'),
                },
                //Products
                {
                    path: "/products",
                    name: "Products",
                    meta: {title: 'Products'},
                    component: importComponent('DataMaster/Products'),
                },
            ]
        },
        {
            path: '/index',
            meta: {title: 'Atma Korean BBQ'},
            component: importComponent('Index'),
        },
        {
            path: '*',
            redirect: '/index',
        }
    ],
});
//Mengset judul
router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})
export default router;