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
                                    <v-card v-if="menu.title != 'Print QR Code'" width="600" :to="menu.path">
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
                                    <v-card v-else width="600" @click="dialogQR = true;">
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
                                    <v-card width="100%" :to="menu.path">
                                        <div style="text-align-last: center;">{{menu.title}}</div>
                                        <v-img
                                            height="100px"
                                            :src="menu.image">
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

            <!-- start QR dialog -->
            <v-dialog v-model="dialogQR" persistent max-width="600px" style='z-index:8000;'>
                <v-card>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-flex class="text-right">
                            <v-icon color="red" @click="dialogQR = false;">mdi-close</v-icon>
                        </v-flex>
                    </v-card-actions>
                    <v-card-title>
                        <span class="headline">Scan this QR Code with the Mobile App!</span>
                    </v-card-title>
                    <v-card-text class="text-center">
                        <div id="qrcode">
                            <vue-qr :text="qrdata" :size="200"></vue-qr>
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="white darken-1" text @click="PrintQR">
                            Print
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="dialogQR = false;">
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- end QR dialog -->

        </div>
    </v-main>
</template>


<script>
import VueQr from 'vue-qr/src/packages/vue-qr.vue'

export default{
    name: "Dashboard",

    components: {VueQr},

    data() {
        return {
            role: '',
            dashboardmenu: [],
            dialogQR: false,
            src: 'https://atmakoreanbucket.s3-ap-southeast-1.amazonaws.com/AKB-logo+white.png',
            qrdata: 'https://atmakoreanbbq.web.app/barcode',
        }
    },

    mounted() {
        this.filtermenu();
    },

    methods: {
        filtermenu() {
            let role     = localStorage.getItem('role');
            let dashmenu = this.dashboardmenu;
            this.role    = role;
            
            let karyawan     = { title: "Manage Karyawan",      path: "/manage/karyawan",      image: require("@/assets/images/dashboard/karyawan.jpg")     };
            let menu         = { title: "Manage Menu",          path: "/manage/menu",          image: require("@/assets/images/dashboard/menu.jpg")         };
            let meja         = { title: "Manage Meja",          path: "/manage/meja",          image: require("@/assets/images/dashboard/meja.jpg")         };
            let pesanan      = { title: "Manage Pesanan",       path: "/manage/pesanan",       image: require("@/assets/images/dashboard/pesanan.jpg")      };
            let reservasi    = { title: "Manage Reservasi",     path: "/manage/reservasi",     image: require("@/assets/images/dashboard/reservasi.jpg")    };
            let transaksi    = { title: "Manage Transaksi",     path: "/manage/transaksi",     image: require("@/assets/images/dashboard/transaksi.jpg")    };
            let customers    = { title: "Manage Customers",     path: "/manage/customers",     image: require("@/assets/images/dashboard/customers.jpg")    };
            let bahan        = { title: "Manage Bahan",         path: "/manage/bahan",         image: require("@/assets/images/dashboard/bahan.jpg")        };
            let stock        = { title: "Manage Stock",         path: "/manage/stock",         image: require("@/assets/images/dashboard/stock.jpg")        };
            let history      = { title: "Manage History Stock", path: "/manage/history-stock", image: require("@/assets/images/dashboard/history.jpg")      };
            let qrcode       = { title: "Print QR Code",        path: "",                      image: require("@/assets/images/dashboard/qrcode.jpg")       };
            let pengeluaran  = { title: "Laporan Pengeluaran",  path: "/laporan/expenses",     image: require("@/assets/images/dashboard/pengeluaran.jpg")  };
            let pendapatan   = { title: "Laporan Pendapatan",   path: "/laporan/income",       image: require("@/assets/images/dashboard/pendapatan.jpg")   };
            let ketersediaan = { title: "Ketersediaan Meja",    path: "/showMeja",             image: require("@/assets/images/dashboard/ketersediaan.jpg") };

            switch(role) {
                case "Operational Manager":     dashmenu.push(karyawan);
                                                dashmenu.push(menu);
                                                dashmenu.push(meja);
                                                dashmenu.push(ketersediaan);
                                                dashmenu.push(pesanan);
                                                dashmenu.push(reservasi);
                                                dashmenu.push(transaksi);
                                                dashmenu.push(customers);
                                                dashmenu.push(bahan);
                                                dashmenu.push(stock);
                                                dashmenu.push(history);
                                                dashmenu.push(qrcode);
                                                dashmenu.push(pengeluaran);
                                                dashmenu.push(pendapatan);
                                                break;

                case "Owner":                   dashmenu.push(karyawan);
                                                dashmenu.push(pengeluaran);
                                                dashmenu.push(pendapatan);
                                                break;

                case "Chef":                    dashmenu.push(pesanan);
                                                dashmenu.push(bahan);
                                                dashmenu.push(stock);
                                                dashmenu.push(history);
                                                break;

                case "Waiter":                  dashmenu.push(menu);
                                                dashmenu.push(meja);
                                                dashmenu.push(ketersediaan);
                                                dashmenu.push(pesanan);
                                                dashmenu.push(reservasi);
                                                dashmenu.push(qrcode);
                                                break;

                case "Cashier":                 dashmenu.push(menu);
                                                dashmenu.push(meja);
                                                dashmenu.push(ketersediaan);
                                                dashmenu.push(pesanan);
                                                dashmenu.push(reservasi);
                                                dashmenu.push(qrcode);
                                                dashmenu.push(transaksi);
                                                break;
                    
            }
        },

        PrintQR() {
            const qrdiv = document.getElementById('qrcode').innerHTML;
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const date = new Date();
            const month = monthNames[date.getMonth()];
            var currentHours = date.getHours();
            currentHours = ("0" + currentHours).slice(-2);
            var currentMinutes = date.getMinutes();
            currentMinutes = ("0" + currentMinutes).slice(-2);
            var currentSeconds = date.getSeconds();
            currentSeconds = ("0" + currentSeconds).slice(-2);
            var ampm = ""
            if(date.getHours() >= 12)
                ampm = "PM";
            else
                ampm = "AM";
            var mywindow = window.open('', 'PRINT', 'height=800,width=600');

            mywindow.document.write(`
            <html>
            <head><title> Print QR Code - Atma Korean BBQ</title></head>
            
            <body>
                <div style="width: 100%; text-align: center; font-family: sans-serif;">
                    <img src="` + require("@/assets/images/AKB-logo 1080.png")  + `" style="width: 250; height: 250;"/>
                    <br>
                    <br>
                    <div style="width: 100%; text-align: -webkit-center;">
                        <div style="border: 10px black solid; border-radius: 10px; width: 200px;">
                            ${qrdiv}
                        </div>
                    </div>
                    <br>
                    <h3>Printed `+ month +` `+ date.getDate() +`, `+ date.getFullYear() +` `+ currentHours +`:`+ currentMinutes +`:`+ currentSeconds +` `+ ampm +`</h3>
                    <p>Printed By `+ localStorage.getItem('name') +`</p>
                    <br><br>
                    <p>------------------------------------------------------------</p>
                    <h2> FUN PLACE TO GRILL </h2>
                    <p>------------------------------------------------------------</p>
                </div>
            </body>
            </html>
            `);

            mywindow.document.close();
            mywindow.focus();

            mywindow.print();

            return true;
        },
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

  .headline {
      font-family: ReemKufi !important;
  }

</style>