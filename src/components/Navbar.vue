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
                        <p id="myAccount"><span class="fa fa-user" aria-hidden="true"></span> My Account</p>
                    </button>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div :class="{'navbar-collapse hidden-transition': collapsed}" class="navbar-collapse navbar-right" id="ResponsiveNav">
                    <ul class="nav navbar-nav">
                        <li><a href="#login" class="page-scroll" @click="collapsed = true">SIGN IN</a></li>
                        <li><a href="#contact" class="page-scroll" @click="collapsed = true">CONTACT</a></li>
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
            progressBar: false,
            loading: true,
            menus: [],
            customers: null,
            dishes: [],
            items: [
                { title: "Menu", to: "/menu" },
            ],
        }
    },
    mounted() {
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
        },
        redirectIndex() {
            this.$router.push({
                path: '/index',
            })
        }
    },
    created() {
    }
}
</script>

<style scoped>
  @import '../assets/css/index.css';
  @import '../assets/css/login.css';
  @import '../assets/css/scrollbar.css';
</style>