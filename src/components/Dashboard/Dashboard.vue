<template>
    <v-main>
        <div id="container">
            <br><br>
            <section id="portfolio">
                <div class="container-fluid portfolio-ct">
                    <h2>DASHBOARD</h2>
                    <h3 style="text-align: center;">{{role}}</h3>
                    <div class="row">

                        <!-- start first portfolio item -->
                        <div>
                            <div class="col-sm-6 col-md-3 grid-portfolio"  v-for="(menu) in dashboardmenu" :key="menu.image">
                                <v-card width="400" :to="menu.to">
                                    <v-img
                                    height="100px"
                                    :src="menu.image"
                                    >
                                    <div class="testimonials-bg-opacity"></div>
                                    <v-card-title class="white--text mb-15">
                                        <p class="mr-10 float-right">
                                        {{menu.title}}
                                        </p>
                                    </v-card-title>
                                    </v-img>
                                </v-card>
                                <!--<div class="portfolio-item-ct">
                                    <div class="thumbnail">
                                        <img :src="menu.image" class="img-responsive">
                                    </div>
                                    <div class="caption portfolio-details">
                                        <h3>{{menu.title}}</h3>
                                        <p> {{menu.unit_menu}}<br>
                                            {{menu.deskripsi_menu}}<br>
                                        </p>
                                    </div>
                                </div>-->
                            </div>
                        </div>
                        <!-- end first portfolio item -->
                    </div>
                    <!-- end row portfolio -->
                </div>
                <!-- end container portfolio -->
            </section>
        </div>
    </v-main>
</template>


<script>
export default{
    name: "Dashboard",
    data() {
        return {
            role: '',
            dashboardmenu: [
                { title: "Manage Karyawan", to: "/manage/karyawan", image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
                { title: "Manage Menu", to: "/manage/menu", image: "" },
                { title: "Manage Meja", to: "/manage/meja", image: "" },
                { title: "Manage Pesanan", to: "/manage/pesanan", image: "" },
                { title: "Manage Transaksi", to: "/manage/transaksi", image: "" },
                { title: "Manage Customers", to: "/manage/customers", image: "" },
                { title: "Manage Bahan", to: "/manage/bahan", image: "" },
                { title: "Manage Stock", to: "/manage/stock", image: "" },
                { title: "Manage History Stock", to: "/manage/history-stock", image: "" },
                { title: "Print QR Code", to: "/print-qr", image: "" },
                { title: "Laporan Pengeluaran", to: "/laporan/expenses", image: "" },
                { title: "Laporan Pendapatan", to: "/laporan/income", image: "" },
            ],
        }
    },
    mounted() {
        this.role = localStorage.getItem('role');
    },
}
</script>


<style scoped>
  @import '~@/assets/css/index.css';
</style>