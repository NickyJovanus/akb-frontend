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
            path: "/",
            component: importComponent('Navbar'),
            children: [
                {
                    path: '/',
                    name: 'Index',
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
                //Karyawan
                {
                    path: "/manage/karyawan",
                    name: "Karyawan",
                    meta: {title: 'Manage Karyawan - Atma Korean BBQ'},
                    component: importComponent('Dashboard/Karyawan'),
                },
                //Meja
                {
                    path: "/manage/meja",
                    name: "Meja",
                    meta: {title: 'Manage Meja - Atma Korean BBQ'},
                    component: importComponent('Dashboard/Meja'),
                },
                //Ketersediaan
                {
                    path: "/showMeja",
                    name: "Ketersediaan",
                    meta: {title: 'Ketersediaan Meja - Atma Korean BBQ'},
                    component: importComponent('Dashboard/Ketersediaan'),
                },
                //Customer
                {
                    path: "/manage/customers",
                    name: "Customers",
                    meta: {title: 'Manage Customers - Atma Korean BBQ'},
                    component: importComponent('Dashboard/Customers'),
                },
                //Pesanan
                {
                    path: "/manage/pesanan",
                    name: "Pesanan",
                    meta: {title: 'Manage Pesanan - Atma Korean BBQ'},
                    component: importComponent('Dashboard/Pesanan'),
                },
            ]
        },
        {
            path: '*',
            redirect: '/',
        }
    ],
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})
export default router;