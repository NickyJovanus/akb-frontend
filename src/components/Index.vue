<!-- @format -->
  
<template>
    <main>
    <v-progress-linear v-show="progressBar" slot="progress" color="red" indeterminate style="z-index: 9999;"></v-progress-linear>
    <div id="container">
        <header class="intro">
            <div class="intro-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2">
                            <p class="intro-text">
                                <br>
                                <img src="https://atmakoreanbucket.s3-ap-southeast-1.amazonaws.com/AKB-logo+white.png" width="300px">
                                <br>
                                Atma Korean BBQ
                            </p>
                            <div class="button-group" v-if="loggedIn">
                                <div class="text" @click="redirectDashboard">Open Dashboard</div>
                            </div>
                            <br>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <!-- only for mouse to fall before the start of the section -->
        <!-- start work portfolio -->
        <section id="portfolio">
            <div class="container-fluid portfolio-ct">
                <h2>FEATURED MENU</h2>
                <div class="row">

                    <!-- start first portfolio item -->
                    <div class="col-sm-6 col-md-4 grid-portfolio" v-for="menu in menus" :key="menu.gambar_menu">
                        <div class="portfolio-item-ct">
                            <div class="thumbnail">
                                <img :src="menu.gambar_menu" class="img-responsive">
                            </div>
                            <div class="caption portfolio-details">
                                <h3>{{menu.nama_menu}}</h3>
                                <p>{{menu.deskripsi_menu}}<br>
                                Rp. {{menu.harga_menu.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- end first portfolio item -->
                </div>
                <!-- end row portfolio -->
            </div>
            <!-- end container portfolio -->
        </section>
        <!-- end work portfolio -->
        <!-- start testimonials -->
        <section class="testimonials">
            <div class="testimonials-bg" :style="{background: 'url(' + require('../assets/images/test1.jpg') + ') no-repeat top center scroll',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'}">
                <div class="container testimonials-bg-opacity">
                    <br>
                    <h2>SIZZLE</h2>
                    <div><span class="fa fa-quote-left quotes hidden" aria-hidden="true"></span>
                    </div>
                    <div id="slider-testimonials" class="carousel slide" data-ride="carousel">
                        <!-- wrapper for slides -->
                        <div class="carousel-inner" role="listbox">
                            <!-- start first testimional -->
                            <div class="item active">
                                <div class="row">
                                    <div class="col-md-6 col-md-offset-3">
                                        <div class="carousel-caption">
                                            <p>We are pleased to present our guests an experience they will never forget.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end carousel -->
                    </div>
                    <!-- end slider bootstrap -->
                </div>
            </div>
            <!-- end div container testimonials -->
        </section>
        <!-- end testimonials -->
        <section class="testimonials">
            <div class="testimonials-bg" :style="{background: 'url(' + require('../assets/images/test2.jpg') + ') no-repeat top center scroll',
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed'}">
                <div class="container testimonials-bg-opacity">
                    <br>
                    <h2>AUTHENTIC KOREAN CUISINE</h2>
                    <div><span class="fa fa-quote-left quotes hidden" aria-hidden="true"></span>
                    </div>
                    <div id="slider-testimonials" class="carousel slide" data-ride="carousel">
                        <!-- wrapper for slides -->
                        <div class="carousel-inner" role="listbox">
                            <!-- start first testimional -->
                            <div class="item active">
                                <div class="row">
                                    <div class="col-md-6 col-md-offset-3">
                                        <div class="carousel-caption">
                                            <p>Atma Korean BBQ presents the top quality of Korean barbecue to bring you the finest flavors in Korean cuisine.</p>
                                            <div class="button-group">
                                                <div class="text" @click="menuRedirect">Browse Menu</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end carousel -->
                    </div>
                    <!-- end slider bootstrap -->
                </div>
            </div>
            <!-- end div container testimonials -->
        </section>
        <!-- end testimonials -->
        <!-- start about AKB -->
        <section id="about-me">
            <div class="container">
                <div class="row">
                    <h2>ABOUT ATMA KOREAN BBQ</h2>
                    <div class="col-lg-6 about-intro">
                        <div class="about-inner">
                            <div class="about-ct">
                                <img src="https://atmakoreanbucket.s3-ap-southeast-1.amazonaws.com/AKB-logo+1080.png" class="img-responsive" style="height: auto;">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 about-intro-text">
                        <br><br>
                        <p>Atma Korean BBQ (AKB) is one of <span>the best</span> Korean <span>BBQ</span> restaurant to ever exist.<br>
                           Here at AKB, we offer the original and the most delicious taste of Korean BBQ for everyone's delicacy.<br>
                           Invite your friends and family at our restaurant to truly have <span>the best experience</span>.<br>
                        <br>건배! <span class="fa fa-beer" aria-hidden="true"></span></p>
                    </div>
                </div>
                <!-- end row about -->
            </div>
            <!-- end container about -->
            <!-- start count stats -->
            <section id="counter-stats">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 stats">
                            <span class="fa fa-user" aria-hidden="true"></span>
                            <div class="counter" data-count="999">{{customers}}</div>
                            <h5>Happy customers</h5>
                        </div>
                        <div class="col-lg-6 stats">
                            <span class="fa fa-coffee" aria-hidden="true"></span>
                            <div v-for="dish in dishes" :key="dish.jml">
                                <div class="counter" data-count="999">{{dish.jml}}</div>
                            </div>
                            <h5>Dishes served</h5>
                        </div>
                    </div>
                    <!-- end row counter stats -->
                </div>
                <!-- end container counter stats -->
            </section>
            <!-- end cont stats -->
        </section>
        <!-- end about AKB -->

        <!-- start work history -->
        <section id="experience">
            <div class="container">
                <h2>HISTORY</h2>
                <div class="experience-ct">
                    <div class="row">
                        <div class="col-md-6 timeline-label">
                            <h4>Location</h4>
                            <div style="overflow: hidden; width: 100%; height: 350px; position: relative; background: antiquewhite;">
                              <MglMap id="map"
                                :accessToken="this.accessToken"
                                :mapStyle.sync="this.mapStyle"
                                :center="this.coordinates"
                                :zoom="14"
                              >
                                <MglMarker :coordinates="coordinates" color="orange">
                                  <MglPopup :style="{'background': '#00000000'}">
                                    <VCard>
                                      <div class="ma-2" light>Atma Korean BBQ</div>
                                    </VCard>
                                  </MglPopup>
                                </MglMarker>
                              </MglMap>
                            </div>
                        </div>
                        <div class="col-md-6 timeline col-exp">
                            <div class="timeline-year">
                                <time datetime="2021">2021</time>
                                <div class="timeline-experience">
                                    <span class="timeline-circle"></span>
                                    <div class="timeline-experience-img"><img :src="require('@/assets/images/web.png')"></div>
                                    <div class="timeline-experience-info clear-after">
                                        <h5>Website Published</h5>
                                        <div class="timeline-role">The official website of Atma Korean BBQ is published</div>
                                        <p>April 2021</p>
                                    </div>
                                    <!-- history-info -->
                                </div>
                                <!-- history -->
                                <time datetime="2020">2020</time>
                                <div class="timeline-experience">
                                    <span class="timeline-circle"></span>
                                    <div class="timeline-experience-img"><img :src="require('@/assets/images/UAJY.png')" style="border-radius: 20px; border: 2px solid #ff6161;"></div>
                                    <div class="timeline-experience-info clear-after">
                                        <h5>Collaboration with UAJY</h5>
                                        <div class="timeline-role">Atma Korean BBQ collaborated with Universitas Atma Jaya Yogyakarta</div>
                                        <p>May 2020</p>
                                    </div>
                                    <!-- history-info -->
                                </div>
                                <!-- history -->
                            </div>
                            <!-- year -->
                            <div class="timeline-year timeline-year1">
                                <time datetime="2019">2019</time>
                                <div class="timeline-experience">
                                    <span class="timeline-circle"></span>
                                    <div class="timeline-experience-img"><img src="https://atmakoreanbucket.s3-ap-southeast-1.amazonaws.com/AKB-logo+white+text.png"></div>
                                    <div class="timeline-experience-info clear-after">
                                        <h5>Established</h5>
                                        <div class="timeline-role">Establishment of Atma Korean BBQ</div>
                                        <p>March 2019</p>
                                    </div>
                                    <!-- history-info -->
                                </div>
                                <!-- history -->
                                <!-- history -->
                            </div>
                            <!-- year -->
                        </div>
                    </div>
                    <!-- end row of two columns -->
                </div>
                <!-- end history container of two columns -->
            </div>
            <!-- end container history -->
        </section>
        <!-- end work history -->
        
        <!-- start login -->
        <section id="login" v-if="!loggedIn">
            <br><br>
            <br><br>
            <div class="container">
                <h2>STAFF LOGIN</h2>
                <div class="center">
                    <div class="ear ear--left"></div>
                    <div class="ear ear--right"></div>
                    <div class="face">
                      <div class="eyes">
                        <div class="eye eye--left">
                          <div class="glow"></div>
                        </div>
                        <div class="eye eye--right">
                          <div class="glow"></div>
                        </div>
                      </div>
                      <div class="nose">
                        <svg width="38.161" height="22.03">
                          <path d="M2.017 10.987Q-.563 7.513.157 4.754C.877 1.994 2.976.135 6.164.093 16.4-.04 22.293-.022 32.048.093c3.501.042 5.48 2.081 6.02 4.661q.54 2.579-2.051 6.233-8.612 10.979-16.664 11.043-8.053.063-17.336-11.043z" fill="#243946"></path>
                        </svg>
                        <div class="glow"></div>
                      </div>
                      <div class="mouth">
                        <svg class="smile" viewBox="-2 -2 84 23" width="84" height="23">
                          <path d="M0 0c3.76 9.279 9.69 18.98 26.712 19.238 17.022.258 10.72.258 28 0S75.959 9.182 79.987.161" fill="none" stroke-width="3" stroke-linecap="square" stroke-miterlimit="3"></path>
                        </svg>
                        <div class="mouth-hole"></div>
                        <div class="tongue breath">
                          <div class="tongue-top"></div>
                          <div class="line"></div>
                          <div class="median"></div>
                        </div>
                      </div>
                    </div>
                    <div class="hands">
                      <div class="hand hand--left">
                        <div class="finger">
                          <div class="bone"></div>
                          <div class="nail"></div>
                        </div>
                        <div class="finger">
                          <div class="bone"></div>
                          <div class="nail"></div>
                        </div>
                        <div class="finger">
                          <div class="bone"></div>
                          <div class="nail"></div>
                        </div>
                      </div>
                      <div class="hand hand--right">
                        <div class="finger">
                          <div class="bone"></div>
                          <div class="nail"></div>
                        </div>
                        <div class="finger">
                          <div class="bone"></div>
                          <div class="nail"></div>
                        </div>
                        <div class="finger">
                          <div class="bone"></div>
                          <div class="nail"></div>
                        </div>
                      </div>
                    </div>
                    <div class="login">
                      <label>
                        <div class="fa fa-envelope"></div>
                        <input class="email" type="text" v-model="email" autocomplete="on" placeholder="E-mail address" name="email"/>
                      </label>
                      <label>
                        <div class="fa fa-key"></div>
                        <input class="password" :type="passType"  v-model="password" autocomplete="off" onfocus="this.removeAttribute('readonly');" placeholder="Password" name="password"/>
                        <button @click="passType = 'text'" class="password-button">Reveal</button>
                      </label>
                      <button class="login-button" @click="login" :disabled="load==true">Login</button>
                    </div>
                </div>
            </div>
            <!-- end div login section -->
        </section>
        <!-- end login -->

        <!-- start commitment -->
        <section class="testimonials">
            <div class="testimonials-bg" :style="{background: 'url(' + require('../assets/images/commitment.jpg') + ') no-repeat top center scroll',
                backgroundPosition: 'center center',
                backgroundSize: 'cover'}">
                <div class="container testimonials-bg-opacity">
                    <h2>OUR COMMITMENT</h2>
                    <div>
                        <span class="fa fa-quote-left quotes hidden" aria-hidden="true"></span>
                    </div>
                    <div id="slider-testimonials" class="carousel slide" data-ride="carousel">
                        <!-- wrapper for slides -->
                        <div class="carousel-inner" role="listbox">
                            <!-- start first commitment -->
                            <div class="item active">
                                <div class="row">
                                    <div class="col-md-6 col-md-offset-3">
                                        <div class="carousel-caption">
                                            <p>Our commitment to team members is reflected in our core value of People and is illustrated by our relentless drive to provide an engaging work environment that is ethical, diverse, and inclusive.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div><span class="fa fa-quote-left quotes hidden" aria-hidden="true"></span></div>
                        </div>
                        <!-- end carousel -->
                    </div>
                    <!-- end slider bootstrap -->
                </div>
            </div>
            <!-- end div container commitment -->
        </section>
        <!-- end commitment -->

        <!-- start footer -->
        <footer id="contact">
            <div class="container">
                <div class="row">
                    <h2>CONTACT</h2>
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
        <v-snackbar v-model="snackbar" :color="color" timeout="5000" bottom style='z-index:10000;'>
            <v-flex class="text-right">
                <v-icon color="white" @click="snackbar = false;">mdi-close</v-icon>
            </v-flex>
            <pre style="overflow-y: hidden; text-align: center;">{{error_message}}</pre>
        </v-snackbar>
    </main>
</template>

<script>
import { MglMap, MglPopup, MglMarker } from "vue-mapbox";

export default{
    name: "Index",

    components: {
        // Mapbox components
        MglMap,
        MglMarker,
        MglPopup
    },

    data() {
        return {
            //Mapbox data
            accessToken: 'pk.eyJ1Ijoibmlja3lqb3ZhbnVzIiwiYSI6ImNrZnFqc2Z6cTBqamUyeXBiaGNidzljOHEifQ.EmKNctj3vwr2nPn0beNhAQ',
            mapStyle: 'mapbox://styles/mapbox/streets-v11',
            coordinates: [110.416169, -7.779292],
            //Snackbar
            error_message:    '',
            color:            '',
            snackbar:      false,
            //Login
            email:            '',
            password:         '',
            valid:         false,
            collapsed:      true,
            load:          false,
            progressBar:   false,
            loading:        true,
            menus:            [],
            customers:      null,
            dishes:           [],
            loggedIn:      false,
            unloaded:       true,
            passType: 'password',
        }
    },

    mounted() {
        if(localStorage.getItem('topmenu')       !== null 
        && localStorage.getItem('dishes')        !== null 
        && localStorage.getItem('customercount') !== null)
            this.unloaded = false
        this.loadData();

        import('../assets/js/carouselfade.js');
        import('../assets/js/loginform.js');
        import('../assets/js/navbarfade.js');
        import('mapbox-gl/dist/mapbox-gl.css');

        this.menus     = JSON.parse(localStorage.getItem('topmenu'));
        this.dishes    = JSON.parse(localStorage.getItem('dishes'));
        this.customers = JSON.parse(localStorage.getItem('customercount'));
    },

    methods: {
        loadData() {
            var url  = this.$api + '/menu/top';
            var url2 = this.$api + '/customercount';
            var url3 = this.$api + '/servedDishes';

            this.loading = this.unloaded;

            this.$http.get(url, {
            }).then(response => {
                this.menus = response.data.data;
                localStorage.setItem('topmenu', JSON.stringify(response.data.data));
                this.loading = false;
            }).catch(error => {
                this.error_message= this.error_message + error.response.data.message;
                this.color="red"
                this.snackbar= true;
                this.loading = false;
            });

            this.$http.get(url2, {
            }).then(response => {
                this.customers = response.data.data;
                localStorage.setItem('customercount', JSON.stringify(response.data.data));
            }).catch(()=> {
                this.loading = false;
            });
            
            this.$http.get(url3, {
            }).then(response => {
                this.dishes = response.data.data;
                localStorage.setItem('dishes', JSON.stringify(response.data.data));
            }).catch(()=> {
                this.loading = false;
            });
            
            if(localStorage.getItem('token') != null) {
                this.loggedIn = true;
            }
            this.clear();
        },

        login() {
            this.snackbar      = false;
            this.error_message =    '';
            this.load          =  true;
            this.progressBar   =  true;
            this.$http.post(this.$api + '/login', {

                email_karyawan: this.email,
                password: this.password,

            }).then(response => {
                localStorage.setItem('id',    response.data.karyawan.id_karyawan);    // menyimpan id user yang sedang login
                localStorage.setItem('role',  response.data.karyawan.peran_karyawan); // menyimpan id user yang sedang login
                localStorage.setItem('name',  response.data.karyawan.nama_karyawan);  // menyimpan id user yang sedang login
                localStorage.setItem('token', response.data.access_token);            // menyimpan auth token
                localStorage.setItem('loginload', true);                              // menyimpan login untuk reload dashboard(read data)

                this.error_message='Logged in as ' + localStorage.getItem('name'); 
                this.color="green"
                this.snackbar=true;
                this.load = false;
                this.progressBar = false;
                this.clear();

                location.href="/dashboard";
            }).catch(error => {
                if (error.response.data.message.email_karyawan)
                    this.error_message= this.error_message + error.response.data.message.email_karyawan;
                if (error.response.data.message.password)
                    this.error_message= this.error_message + '\n' + error.response.data.message.password;
                if(!error.response.data.message.password && !error.response.data.message.email_karyawan)
                    this.error_message= this.error_message + error.response.data.message;
                this.color="red"
                this.snackbar=true;
                localStorage.removeItem('token');
                this.load = false;
                this.progressBar = false;
            });
        },

        clear() {
            this.email = '',
            this.password = ''
        },

        menuRedirect() {
            this.$router.push({
                path: '/menu',
            })
        },

        redirectDashboard() {
            this.$router.push({
                path: '/dashboard',
            });
        }
    },
}
</script>

<style scoped>
  @import '../assets/css/index.css';

.mgl-map-wrapper {
    box-shadow: 0 0 20px 4px black;
    position: absolute;
    border: solid;
}

.mapboxgl-popup-content {
    position: relative;
    background: #1e1e1ead !important;
    border-radius: 3px;
    box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
    padding: 2px 5px;
    pointer-events: auto;
}

.mapboxgl-canvas, .mapboxgl-marker .mapboxgl-marker-anchor-center {
  position: absolute i !important;
}

.mapboxgl-popup-content {
    background: #00000000 !important;
}

.mapboxgl-popup-content {
    background: #1b1b1b;
}

.mapboxgl-popup-close-button {
    color: red !important;
}
</style>
