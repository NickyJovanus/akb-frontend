<!-- @format -->
  
<template>
    <main>
        <!-- START PRELOADER -->
        <div id="preloader" v-if="loading == true" style="z-index: 9999;">
            <div id="status" style="text-align: center;"><br><br><br><br><br><br><br><br><br><br><br><br>
                Loading...<br> 
                This process may take up to 10 seconds.</div>
        </div>
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
                        <li v-if="!loggedIn"><a href="#login" class="page-scroll" @click="redirectIndex">SIGN IN</a></li>
                        <li v-if="loggedIn"><a class="page-scroll" @click="redirectDashboard">DASHBOARD</a></li>
                        <li><a class="page-scroll" @click="redirectMenu">MENU</a></li>
                        <li><a href="#contact" class="page-scroll" @click="redirectIndex">CONTACT</a></li>
                        <li v-if="loggedIn"><a class="page-scroll" @click="logoutdialog = true; collapsed = true;">LOGOUT</a></li>
                    </ul>
                </div>
                <!-- end collapse -->
            </div>
            <!-- end container fluid -->
        </nav>
        <!-- end navigation -->
      <keep-alive>
        <div id="notNav"  @click="collapsed = true">
        <router-view></router-view>
        </div>
      </keep-alive>

        <v-dialog v-model="logoutdialog" persistent max-width="600px">
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
                    <span class="headline">Confirm Logout?</span>
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white darken-1" text @click="logoutdialog = false;">
                        Cancel
                    </v-btn>
                    <v-btn color="yellow darken-1" text @click="logout"> 
                        Yes
                    </v-btn>
                </v-card-actions>
                <v-flex>
                    <v-progress-linear v-show="progressBarLogout" slot="progress" color="yellow" indeterminate></v-progress-linear>
                </v-flex>
            </v-card>
        </v-dialog>
    </main>
</template>

<script>
export default{
    name: "Navbar",
    data() {
        return {
            error_message: '',
            color: '',
            valid: false,
            password: '',
            email: '',
            snackbar: false,
            collapsed: true,
            load: false,
            progressBarLogout: false,
            loading: true,
            menus: [],
            customers: null,
            dishes: [],
            items: [
                { title: "Menu", to: "/menu" },
            ],
            name: 'My Account',
            loggedIn : false,
            logoutdialog: false,
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        loadData() {
            var url = this.$api + '/menu/top';

            this.$http.get(url, {
                headers: {
                    //
                }
            }).then(response => {
                this.menus = response.data.data;
                this.loading = false;
            }).catch(()=> {
                this.loading = false;
            });

            if(localStorage.getItem('token') != null) {
                this.name = localStorage.getItem('name');
                this.loggedIn = true;
            }

        },
        redirectIndex() {
            this.$router.push({
                path: '/index',
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
            //POST '/logout'
            this.$http.post(url, {}, { //Empty Data
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(() => {
                //Remove Local Token
                localStorage.removeItem('id');
                localStorage.removeItem('name');
                localStorage.removeItem('role');
                localStorage.removeItem('token');
                //Delete Axios Header
                delete this.$http.defaults.headers.common['Authorization'];
                this.progressBarLogout = false;

                //Push Login after logout
                this.$router.push({
                    name: 'index',
                }).then(()=> {
                    location.href="#login";
                })
            }).catch(error => {
                //prints error to console
                console.log(error);
                //Remove Local Token
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
  @import '../assets/css/index.css';
  @import '../assets/css/login.css';
  @import '../assets/css/scrollbar.css';
</style>