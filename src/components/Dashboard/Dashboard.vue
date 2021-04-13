<template>
    <v-main>
        <div id="container">
            <div class="d-block d-sm-block d-lg-none">
                <br>
                <br>
                <br>
            </div>
            <br><br>
            <section id="portfolio">
                <div class="container-fluid portfolio-ct">
                    <h2>DASHBOARD</h2>
                    <h3 style="text-align: center;">{{role}}</h3>
                    <div class="row">

                        <!-- start first portfolio item -->
                        <div class="ma-15 d-none d-lg-block">
                            <div class="col-md-4 grid-portfolio"  v-for="(menu) in dashboardmenu" :key="menu.image">
                                <div style="height: 300px; margin-bottom: 10px;">
                                    <v-card width="600" :to="menu.to">
                                        <v-img
                                            height="300px"
                                            :src="menu.image"
                                            class="dashboard-card">
                                            <div class="testimonials-bg-opacity">
                                            <h2 class="white--text card-title">
                                                <br><br>
                                                <div style="top: 50%;">{{menu.title}}</div>
                                                <br>
                                            </h2></div>
                                        </v-img>
                                    </v-card>
                                </div>
                            </div>
                        </div>
                        <div class="d-block d-sm-block d-lg-none ma-5">
                            <div class="col-md-4 grid-portfolio"  v-for="(menu) in dashboardmenu" :key="menu.image">
                                <div style="width: 100vw; height: 100px; margin-bottom: 0px;">
                                    <v-card width="100%" :to="menu.to">
                                        <div style="text-align-last: center;">{{menu.title}}</div>
                                        <v-img
                                            height="100px"
                                            :src="menu.image"
                                            class="dashboard-card">
                                        </v-img>
                                    </v-card>
                                </div>
                            </div>
                        </div>
                        <!-- end first portfolio item -->
                    </div>
                    <!-- end row portfolio -->
                </div>
                <!-- end container portfolio -->
            </section>
            <!-- start footer -->
            <footer id="contact">
                <div class="container">
                    <div class="row">
                        <p>You can contact us at: 180709851@students.uajy.ac.id (Nicky Jovanus)</p>
                        <div class="social">
                            <a href="https://www.youtube.com/channel/UCocn4CLqmjfQ88-IjVYwRxA/featured" target="_blank" alt="Youtube profile"><span class="fa fa-youtube" aria-hidden="true"></span></a>
                            <a href="https://www.facebook.com/nicky.jovanus/" target="_blank" alt="Facebook profile"><span class="fa fa-facebook" aria-hidden="true"></span></a>
                            <a href="https://github.com/NickyJovanus" target="_blank" alt="GitHub profile"><span class="fa fa-github" aria-hidden="true"></span></a>
                        </div>
                        <p id="copyright">For Development Purposes Only. <br>
                            No Copyright Infringement Intended.
                        </p>
                    </div>
                    <!-- end row contact -->
                </div>
                <!-- end container footer section -->
            </footer>
            <!-- end footer -->
        </div>
    </v-main>
</template>


<script>
export default{
    name: "Dashboard",
    data() {
        return {
            role: '',
            dashboardmenu: [],
            karyawan:    { title: "Manage Karyawan", to: "/manage/karyawan", image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=20" },
            menu:        { title: "Manage Menu", to: "/manage/menu", image: "https://images.unsplash.com/photo-1538648023391-5db12763fce7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=20" },
            meja:        { title: "Manage Meja", to: "/manage/meja", image: "https://images.unsplash.com/photo-1601525824009-d15055b684d3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=20" },
            pesanan:     { title: "Manage Pesanan", to: "/manage/pesanan", image: "https://images.unsplash.com/photo-1499083097717-a156f85f0516?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=20" },
            reservasi:   { title: "Manage Reservasi", to: "/manage/reservasi", image: "https://images.unsplash.com/photo-1524370200384-1fbe34f01f84?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1868&q=20" },
            transaksi:   { title: "Manage Transaksi", to: "/manage/transaksi", image: "https://images.unsplash.com/photo-1556740767-414a9c4860c1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=20" },
            customers:   { title: "Manage Customers", to: "/manage/customers", image: "https://images.unsplash.com/photo-1534470397273-a1c104354754?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1789&q=20" },
            bahan:       { title: "Manage Bahan", to: "/manage/bahan", image: "https://images.unsplash.com/photo-1470549813517-2fa741d25c92?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=20" },
            stock:       { title: "Manage Stock", to: "/manage/stock", image: "https://images.unsplash.com/photo-1571989928541-674d0cf46c4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2002&q=20" },
            history:     { title: "Manage History Stock", to: "/manage/history-stock", image: "https://images.unsplash.com/photo-1494883759339-0b042055a4ee?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=20" },
            qrcode:      { title: "Print QR Code", to: "/print-qr", image: "https://images.unsplash.com/photo-1571867424488-4565932edb41?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1868&q=20" },
            pengeluaran: { title: "Laporan Pengeluaran", to: "/laporan/expenses", image: "https://images.unsplash.com/photo-1517971071642-34a2d3ecc9cd?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1868&q=20" },
            pendapatan:  { title: "Laporan Pendapatan", to: "/laporan/income", image: "https://images.unsplash.com/photo-1579444741963-5ae219cfe27c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=20" },
            ketersediaan:{ title: "Ketersediaan Meja", to: "/showMeja", image: "https://images.unsplash.com/photo-1606140164315-8ea68f6852d6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=20"},
        }
    },
    mounted() {
        this.filtermenu();
    },
    methods: {
        filtermenu() {
            let role = localStorage.getItem('role');
            this.role = role;
            if(role=="Operational Manager") {
                this.dashboardmenu.push(this.karyawan);
                this.dashboardmenu.push(this.menu);
                this.dashboardmenu.push(this.meja);
                this.dashboardmenu.push(this.ketersediaan);
                this.dashboardmenu.push(this.pesanan);
                this.dashboardmenu.push(this.reservasi);
                this.dashboardmenu.push(this.transaksi);
                this.dashboardmenu.push(this.customers);
                this.dashboardmenu.push(this.bahan);
                this.dashboardmenu.push(this.stock);
                this.dashboardmenu.push(this.history);
                this.dashboardmenu.push(this.qrcode);
                this.dashboardmenu.push(this.pengeluaran);
                this.dashboardmenu.push(this.pendapatan);
            } else if (role =="Owner") {
                this.dashboardmenu.push(this.karyawan);
                this.dashboardmenu.push(this.pengeluaran);
                this.dashboardmenu.push(this.pendapatan);
            } else if (role =="Chef") {
                this.dashboardmenu.push(this.pesanan);
                this.dashboardmenu.push(this.bahan);
                this.dashboardmenu.push(this.stock);
                this.dashboardmenu.push(this.history);
            } else if (role =="Waiter") {
                this.dashboardmenu.push(this.ketersediaan);
                this.dashboardmenu.push(this.pesanan);
                this.dashboardmenu.push(this.reservasi);
                this.dashboardmenu.push(this.qrcode);
            } else if (role =="Cashier") {
                this.dashboardmenu.push(this.meja);
                this.dashboardmenu.push(this.pesanan);
                this.dashboardmenu.push(this.reservasi);
                this.dashboardmenu.push(this.qrcode);
                this.dashboardmenu.push(this.transaksi);
            }
        }
    }
}
</script>


<style scoped>
  @import '~@/assets/css/index.css';

  .dashboard-card {
      background: black;
      transition: 0.5s;
      position: absolute;
  }

  .dashboard-card:hover {
      opacity: 1;
  }

  .testimonials-bg-opacity:hover {
      background: black;
      opacity: 0.7;
  }

   .testimonials-bg-opacity {
       opacity: 0.4;
       width: 100%;
       height: 100%;
       transition: 0.2s;
       margin-top: -22px;
   }
   
   .testimonials-bg-opacity .card-title {
       opacity: 1 !important;
   }

  .card-title {
      opacity: 1 !important;
      width: 100%;
      height: 100%;
      align-content: center;
      text-align: center;
      text-decoration: none !important;
      transition: 600s;
  }

  a:hover {
      text-decoration: none !important;
  }

</style>