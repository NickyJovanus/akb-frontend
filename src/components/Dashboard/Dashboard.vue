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
            karyawan:    { title: "Manage Karyawan", to: "/manage/karyawan", image: require("@/assets/images/dashboard/karyawan.jpg") },
            menu:        { title: "Manage Menu", to: "/manage/menu", image: require("@/assets/images/dashboard/menu.jpg")  },
            meja:        { title: "Manage Meja", to: "/manage/meja", image: require("@/assets/images/dashboard/meja.jpg")  },
            pesanan:     { title: "Manage Pesanan", to: "/manage/pesanan", image: require("@/assets/images/dashboard/pesanan.jpg")  },
            reservasi:   { title: "Manage Reservasi", to: "/manage/reservasi", image: require("@/assets/images/dashboard/reservasi.jpg")  },
            transaksi:   { title: "Manage Transaksi", to: "/manage/transaksi", image: require("@/assets/images/dashboard/transaksi.jpg")  },
            customers:   { title: "Manage Customers", to: "/manage/customers", image: require("@/assets/images/dashboard/customers.jpg") },
            bahan:       { title: "Manage Bahan", to: "/manage/bahan", image: require("@/assets/images/dashboard/bahan.jpg") },
            stock:       { title: "Manage Stock", to: "/manage/stock", image: require("@/assets/images/dashboard/stock.jpg") },
            history:     { title: "Manage History Stock", to: "/manage/history-stock", image: require("@/assets/images/dashboard/history.jpg") },
            qrcode:      { title: "Print QR Code", to: "/print-qr", image: require("@/assets/images/dashboard/qrcode.jpg") },
            pengeluaran: { title: "Laporan Pengeluaran", to: "/laporan/expenses", image: require("@/assets/images/dashboard/pengeluaran.jpg") },
            pendapatan:  { title: "Laporan Pendapatan", to: "/laporan/income", image: require("@/assets/images/dashboard/pendapatan.jpg") },
            ketersediaan:{ title: "Ketersediaan Meja", to: "/showMeja", image: require("@/assets/images/dashboard/ketersediaan.jpg") },
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