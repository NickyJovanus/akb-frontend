<!-- @format -->
  
<template>
    <main>
        <!-- START PRELOADER -->
        <transition name="fade">
            <div id="preloader" class="preloader-dashboard" v-if="loading == true" style="z-index: 8000;">
                <div id="status" style="text-align: center;"><br><br><br><br><br><br><br><br><br><br><br><br>
                    Loading Dashboard...<br> 
                    <div style="transition: 2s;">{{preloadertext}}</div>
                </div>
            </div>
        </transition>
        <!-- END PRELOADER -->

        <!-- navigation -->
        <!-- start Fixed navbar -->
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for mobile display -->
                <div class="navbar-header">
                    <a class="navbar-brand" @click="redirectIndex">
                        <img class="navbar-brand" src="https://atmakoreanbucket.s3-ap-southeast-1.amazonaws.com/AKB-logo+white+text.png">
                    </a>
                    <button type="button" class="navbar-toggle" data-target="#ResponsiveNav" @click="collapsed = !collapsed">
                        <p id="myAccount"><span class="fa fa-user" aria-hidden="true"></span> {{name}}</p>
                    </button>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div :class="{'navbar-collapse hidden-transition': collapsed}" class="navbar-collapse navbar-right" id="ResponsiveNav">
                    <ul class="nav navbar-nav">
                        <li><a class="page-scroll" @click="redirectIndex">HOME</a></li>
                        <li><a class="page-scroll" @click="redirectDashboard">DASHBOARD</a></li>
                        <li><a class="page-scroll" @click="logoutdialog = true; collapsed = true;">LOGOUT</a></li>
                    </ul>
                </div>
                <!-- end collapse -->
            </div>
            <!-- end container fluid -->
        </nav>
        <!-- end navigation -->

        <div id="notNav"  @click="collapsed = true">
            <transition name="slide-fade">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </div>

        <v-dialog v-model="logoutdialog" max-width="600px">
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-flex class="text-right">
                        <v-icon color="red" @click="logoutdialog = false">mdi-close</v-icon>
                    </v-flex>
                </v-card-actions>
                <v-card-title>
                    <span class="headline">Do you really want to log out?</span>
                </v-card-title>
                <v-card-text>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white darken-1" text @click="logoutdialog = false;">
                        Cancel
                    </v-btn>
                    <v-btn color="yellow darken-1" text @click="logout"> 
                        Log Out
                    </v-btn>
                </v-card-actions>
                <v-flex>
                    <v-progress-linear v-show="progressBarLogout" slot="progress" color="yellow" indeterminate></v-progress-linear>
                </v-flex>
            </v-card>
        </v-dialog>
        
        <v-snackbar v-model="snackbar" :color="color" timeout="5000" bottom style='z-index:10000;'>
            <v-flex class="text-right">
                <v-icon color="white" @click="snackbar = false;">mdi-close</v-icon>
            </v-flex>
            <pre style="overflow-y: hidden; text-align: center;">{{error_message}}</pre>
        </v-snackbar>
    </main>
</template>

<script>

export default{
    name: "Sidebar",

    data() {
        return {
            //snackbar
            error_message: '',
            color: '',
            snackbar: false,
            //navbar
            collapsed: true,
            load: false,
            progressBarLogout: false,
            loading: true,
            name: 'My Account',
            loggedIn : false,
            logoutdialog: false,
            preloadertext: '',
            role: '',
        }
    },

    created() {
        this.loadData();
    },

    methods: {
        loadData() {
            setTimeout(() => this.preloadertext = "This process may take up to 10 seconds.", 4500);

            if(localStorage.getItem('token') != null) {
                this.name = localStorage.getItem('name');
                this.role = localStorage.getItem('role');
                this.loggedIn = true;
            } else {
                this.$router.push({
                    path: '/',
                });
            }
            localStorage.removeItem('logout');

            if(localStorage.getItem('loginload') != null) {
                localStorage.removeItem('loginload');
                location.reload();
            }

            var urlmeja = this.$api + '/meja';
            var urls = [
                {url: this.$api + '/karyawan',          store: 'karyawan'       }, 
                {url: this.$api + '/pesanan',           store: 'pesanan'        }, 
                {url: this.$api + '/detailpesanan',     store: 'detailpesanan'  }, 
                {url: this.$api + '/customer',          store: 'customer'       }, 
                {url: this.$api + '/reservasi',         store: 'reservasi'      }, 
                {url: this.$api + '/bahan',             store: 'bahan'          }, 
                {url: this.$api + '/menu',              store: 'menu'           }, 
                {url: this.$api + '/stok',              store: 'stok'           }, 
                {url: this.$api + '/historystok',       store: 'historystok'    }, 
                {url: this.$api + '/transaksi',         store: 'transaksi'      }, 
            ];

            this.$http.get(urlmeja, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                localStorage.setItem('meja', JSON.stringify(response.data.data));
                this.loading = false;
            }).catch(()=> {
                this.loading = false;
                this.error_message = 'The server '+ this.$public +' is currently offline. Please try again later.'
                this.snackbar = true;
                this.color = 'red';
            });
            
            for(var i=0; i<urls.length; i++) {
                let url = urls[i];
                this.$http.get(url.url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {
                    localStorage.setItem(url.store, JSON.stringify(response.data.data));
                });
            }

        },

        redirectIndex() {
            this.$router.push({
                path: '/',
            });
            this.collapsed = true;
        },

        redirectDashboard() {
            this.$router.push({
                path: '/dashboard',
            });
            this.collapsed = true;
        },

        redirectMenu() {
            this.$router.push({
                path: '/menu',
            });
            this.collapsed = true;
        },

        logout() {
            this.progressBarLogout = true;
            var url = this.$api + '/logout'

            this.$http.post(url, {}, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {

                //Remove Local Token
                localStorage.removeItem('id');
                localStorage.removeItem('name');
                localStorage.removeItem('role');
                localStorage.removeItem('token');

                //Delete Axios Header
                delete this.$http.defaults.headers.common['Authorization'];
                this.progressBarLogout = false;

                //Push index after logout
                localStorage.setItem('logout', response.data.message);
                this.$router.push({
                    name: 'Index',
                }).then(()=> {
                    location.href="/#login";
                })
            }).catch(() => {
                localStorage.removeItem('id');
                localStorage.removeItem('name');
                localStorage.removeItem('role');
                localStorage.removeItem('token');

                //Delete Axios Header
                delete this.$http.defaults.headers.common['Authorization'];

                this.progressBarLogout = false;

                this.$router.push({
                    name: 'index',
                }).then(()=> {
                    location.href="index";
                })
            });
        },

    },
}
</script>

<style scoped>
  @import '~@/assets/css/index.css';
  @import '~@/assets/css/scrollbar.css';

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
  display: block;
}
.navbar-fixed-top {
    background: black !important;
    box-shadow: 0px 5px 20px #000000a1 !important;
}

.v-application .headline, .v-application .title {
    font-family: ReemKufi !important;
}
</style>