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
                //Reservasi
                {
                    path: "/manage/reservasi",
                    name: "Reservasi",
                    meta: {title: 'Manage Reservasi - Atma Korean BBQ'},
                    component: importComponent('Dashboard/Reservasi'),
                },
                //Bahan
                {
                    path: "/manage/bahan",
                    name: "Bahan",
                    meta: {title: 'Manage Bahan - Atma Korean BBQ'},
                    component: importComponent('Dashboard/Bahan'),
                },
                //Menu
                {
                    path: "/manage/menu",
                    name: "Menu",
                    meta: {title: 'Manage Menu - Atma Korean BBQ'},
                    component: importComponent('Dashboard/Menu'),
                },
                //Stok
                {
                    path: "/manage/stock",
                    name: "Stock",
                    meta: {title: 'Manage Stock - Atma Korean BBQ'},
                    component: importComponent('Dashboard/Stock'),
                },
                //History
                {
                    path: "/manage/history-stock",
                    name: "HistoryStock",
                    meta: {title: 'History Stock - Atma Korean BBQ'},
                    component: importComponent('Dashboard/HistoryStock'),
                },
                //Transaksi
                {
                    path: "/manage/transaksi",
                    name: "Transaksi",
                    meta: {title: 'Manage Transaksi - Atma Korean BBQ'},
                    component: importComponent('Dashboard/Transaksi'),
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