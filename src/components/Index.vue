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
                    <div class="col-sm-6 col-md-4 grid-portfolio" v-for="menu in menus" :key="menu">
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
            <div class="testimonials-bg" style="background: url(https://images.unsplash.com/photo-1527578054032-8d8f044e013d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80) no-repeat top center scroll;
            background-position: center center;
            background-size: cover;
            background-attachment: fixed;">
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
            <div class="testimonials-bg" style="background: url(https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1600&q=80) no-repeat top center scroll;
            background-position: center center;
            background-size: cover;
            background-attachment: fixed;">
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
        <!-- start about me -->
        <section id="about-me">
            <div class="container">
                <div class="row">
                    <h2>ABOUT ATMA KOREAN BBQ</h2>
                    <div class="col-lg-6 about-intro">
                        <div class="about-inner">
                            <div class="about-ct">
                                <img src="https://atmakoreanbucket.s3-ap-southeast-1.amazonaws.com/AKB-logo+1080.png" class="img-responsive">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 about-intro-text">
                        <br><br>
                        <p>Atma Korean BBQ is <span>indeed</span> a <span>Korean</span> restaurant.<br>
                            건배! <span class="fa fa-beer" aria-hidden="true"></span></p>
                        <!--<div class="button-group">
                            <div class="text">Download CV</div>
                            <div class="icon-cv"><a href="http://marinamarques.pt/assets/MarinaMarques_CV.pdf" alt="Marina Marques CV" target="_blank"><span class="fa fa-arrow-circle-down" aria-hidden="true"></span></a></div>
                        </div> -->
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
                            <div class="counter" data-count="999" v-for="dishes in dishes" :key="dishes">{{dishes.jml}}</div>
                            <h5>Dishes served</h5>
                        </div>
                    </div>
                    <!-- end row counter stats -->
                </div>
                <!-- end container counter stats -->
            </section>
            <!-- end cont stats -->
        </section>
        <!-- end about me -->
        <!-- start work experience -->
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
                                      <div class="ma-2">Atma Korean BBQ</div>
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
                                    <div class="timeline-experience-img"><img src="http://www.pngall.com/wp-content/uploads/4/World-Wide-Web-PNG-Picture.png"></div>
                                    <div class="timeline-experience-info clear-after">
                                        <h5>Website Published</h5>
                                        <div class="timeline-role">The official website of Atma Korean BBQ is published</div>
                                        <p>April 2021</p>
                                    </div>
                                    <!-- experience-info -->
                                </div>
                                <!-- experience -->
                                <time datetime="2020">2020</time>
                                <div class="timeline-experience">
                                    <span class="timeline-circle"></span>
                                    <div class="timeline-experience-img"><img src="http://logos-vector.com/images/logo/lar/9/9/5/99575/UAJY_c0f3f_250x250.png" style="border-radius: 20px; border: 2px solid #ff6161;"></div>
                                    <div class="timeline-experience-info clear-after">
                                        <h5>Collaboration with UAJY</h5>
                                        <div class="timeline-role">Atma Korean BBQ collaborated with Universitas Atma Jaya Yogyakarta</div>
                                        <p>May 2020</p>
                                    </div>
                                    <!-- experience-info -->
                                </div>
                                <!-- experience -->
                            </div>
                            <!-- year -->
                            <div class="timeline-year timeline-year1">
                                <time datetime="2018">2018</time>
                                <div class="timeline-experience">
                                    <span class="timeline-circle"></span>
                                    <div class="timeline-experience-img"><img src="https://atmakoreanbucket.s3-ap-southeast-1.amazonaws.com/AKB-logo+white+text.png"></div>
                                    <div class="timeline-experience-info clear-after">
                                        <h5>Established</h5>
                                        <div class="timeline-role">Establishment of Atma Korean BBQ</div>
                                        <p>March 2018</p>
                                    </div>
                                    <!-- experience-info -->
                                </div>
                                <!-- experience -->
                                <!-- experience -->
                            </div>
                            <!-- year -->
                        </div>
                    </div>
                    <!-- end row of two columns -->
                </div>
                <!-- end experience container of two columns -->
            </div>
            <!-- end container experience -->
        </section>
        <!-- end work experience -->
        
        <!-- start login -->
        <section id="login">
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
                        <input class="password" type="password"  v-model="password" autocomplete="off" placeholder="Password"/>
                        <button class="password-button">Reveal</button>
                      </label>
                      <button class="login-button" @click="login">Login</button>
                    </div>
                </div>
            </div>
            <!-- end div login section -->
        </section>
        <!-- end login -->
        <section class="testimonials">
            <div class="testimonials-bg" style="background: url(https://images.unsplash.com/photo-1590577976322-3d2d6e2130d5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80) no-repeat top center scroll;
            background-position: center center;
            background-size: cover;">
                <div class="container testimonials-bg-opacity">
                    <h2>OUR COMMITMENT</h2>
                    <div>
                        <span class="fa fa-quote-left quotes hidden" aria-hidden="true"></span>
                    </div>
                    <div id="slider-testimonials" class="carousel slide" data-ride="carousel">
                        <!-- wrapper for slides -->
                        <div class="carousel-inner" role="listbox">
                            <!-- start first testimional -->
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
            <!-- end div container testimonials -->
        </section>
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
                    <p id="copyright">For Development Purposes Only.</p>
                </div>
                <!-- end row contact -->
            </div>
            <!-- end container footer section -->
        </footer>
        <!-- end footer -->
    </div>
        <v-snackbar v-model="snackbar" :color="color" timeout="3000" bottom>
            <p>{{error_message}}</p>
        </v-snackbar>
    </main>
</template>

<script>
import { MglMap, MglPopup, MglMarker } from "vue-mapbox";

export default{
    name: "Index",
    components: {
      MglMap,
      MglMarker,
      MglPopup
    },
    data() {
        return {
            accessToken: 'pk.eyJ1Ijoibmlja3lqb3ZhbnVzIiwiYSI6ImNrZnFqc2Z6cTBqamUyeXBiaGNidzljOHEifQ.EmKNctj3vwr2nPn0beNhAQ',
            mapStyle: 'mapbox://styles/mapbox/streets-v11',
            coordinates: [110.416169, -7.779292],
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
        import('../assets/js/carouselfade.js');
        import('../assets/js/loginform.js');
        import('../assets/js/navbarfade.js');
        import('mapbox-gl/dist/mapbox-gl.css');
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
            }).catch(()=> {
                this.loading = false;
            });

            var url2 = this.$api + '/customercount'

            this.$http.get(url2, {
                headers: {
                    //
                }
            }).then(response => {
                this.customers = response.data.data;
            }).catch(()=> {
                this.loading = false;
            });

            var url3 = this.$api + '/servedDishes'

            this.$http.get(url3, {
                headers: {
                    //
                }
            }).then(response => {
                this.dishes = response.data.data;
                this.loading = false;
            }).catch(()=> {
                this.loading = false;
            });
        },
        login() {
            this.snackbar=false;
            this.error_message = '';
            this.load = true;
            this.progressBar = true;
            this.$http.post(this.$api + '/login', {
                email_karyawan: this.email,
                password: this.password,
            }).then(response => {
                localStorage.setItem('id', response.data.karyawan.id_karyawan); //menyimpan id user yang sedang login
                localStorage.setItem('role', response.data.karyawan.peran_karyawan); //menyimpan id user yang sedang login
                localStorage.setItem('token', response.data.access_token); //menyimpan auth token
                this.error_message=response.data.message; 
                this.color="green"
                this.snackbar=true;
                this.load = false;
                this.progressBar = false;
                this.clear();
                this.$router.push({
                    path: '/products',
                })
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
    },
    created() {
    //   if (localStorage.getItem('reloaded')) {
    //       // The page was just reloaded. Clear the value from local storage
    //       // so that it will reload the next time this page is visited.
    //       localStorage.removeItem('reloaded');
    //   } else {
    //       // Set a flag so that we know not to reload the page twice.
    //       localStorage.setItem('reloaded', '1');
    //       location.reload();
    //   }
    }
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
</style>
