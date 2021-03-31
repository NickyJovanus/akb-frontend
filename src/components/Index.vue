<!-- @format -->
  
<template>
    <main>
    <div id="container">
        <v-snackbar v-model="snackbar" :color="color" timeout="2000" bottom>
            {{error_message}}
        </v-snackbar>
        <!-- navigation -->
        <!-- start Fixed navbar -->
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <!-- Brand and toggle get grouped for mobile display -->
                <div class="navbar-header">
                    <a class="navbar-brand" href="">
                        <img class="navbar-brand" src="https://atmakoreanbucket.s3-ap-southeast-1.amazonaws.com/AKB-logo+white+text.png">
                    </a>
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#ResponsiveNav">
                        <p id="myAccount"><span class="fa fa-user" aria-hidden="true"></span> My Account</p>
                    </button>
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse navbar-right" id="ResponsiveNav">
                    <ul class="nav navbar-nav">
                        <li><a href="#login" class="page-scroll">SIGN IN</a></li>
                        <li><a href="#contact" class="page-scroll">CONTACT</a></li>
                    </ul>
                </div>
                <!-- end collapse -->
            </div>
            <!-- end container fluid -->
        </nav>
        <!-- end navigation -->
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
                    <div class="col-sm-6 col-md-4 grid-portfolio">
                        <div class="portfolio-item-ct">
                            <div class="thumbnail">
                                <img src="https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=20" alt="Portfolio - IBV MEXICO" class="img-responsive">
                            </div>
                            <div class="caption portfolio-details">
                                <h3>TENDERLOIN</h3>
                                <p>Tenderloin description.
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- end first portfolio item -->
                    <!-- start second portfolio item -->
                    <div class="col-sm-6 col-md-4 grid-portfolio">
                        <div class="portfolio-item-ct">
                            <div class="thumbnail">
                                <img src="https://images.unsplash.com/photo-1569263900347-06b1e8c825ab?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=20" alt="Portfolio - ARE YOU FEELING LOW?" class="img-responsive">
                            </div>
                            <div class="caption portfolio-details">
                                <h3>SQUID</h3>
                                <p>Squid description.
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- end second portfolio item -->
                    <!-- start third portfolio item -->
                    <div class="col-sm-6 col-md-4 grid-portfolio">
                        <div class="portfolio-item-ct">
                            <div class="thumbnail">
                                <img src="https://images.unsplash.com/photo-1604253412047-e4c697600f0b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=20" alt="Portfolio - PERSONAL WEBSITE" class="img-responsive">
                            </div>
                            <div class="caption portfolio-details">
                                <h3>ORANGE JUICE</h3>
                                <p>Orange juice description.
                                </p>
                            </div>
                        </div>
                    </div>
                    <!-- end third portfolio item -->
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
                                            <p>We are pleased to present our guests to an experience they will never forget.</p>
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
                            <div class="counter" data-count="999">20</div>
                            <h5>Happy clients</h5>
                        </div>
                        <div class="col-lg-6 stats">
                            <span class="fa fa-coffee" aria-hidden="true"></span>
                            <div class="counter" data-count="999">102</div>
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
                            <h4>location</h4>
                            <div style="overflow: hidden; width: 100%; height: 350px; position: absolute;">
                              <MglMap id="map"
                                :accessToken="this.accessToken"
                                :mapStyle.sync="this.mapStyle"
                                :center="this.coordinates"
                                :zoom="12"
                              >
                                <MglMarker :coordinates="coordinates" color="orange">
                                  <MglPopup :style="{'background': '#000'}" dark>
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
                                <time datetime="2016">2016</time>
                                <div class="timeline-experience">
                                    <span class="timeline-circle"></span>
                                    <div class="timeline-experience-img"><img src="http://marinamarques.pt/img/bnp_paribas.png" alt="BNP Paribas"></div>
                                    <div class="timeline-experience-info clear-after">
                                        <h5>BNP Paribas</h5>
                                        <div class="timeline-role">Team Manager & Front End Developer</div>
                                        <p>January 2016 - Present</p>
                                    </div>
                                    <!-- experience-info -->
                                </div>
                                <!-- experience -->
                                <time datetime="2015">2015</time>
                                <div class="timeline-experience">
                                    <span class="timeline-circle"></span>
                                    <div class="timeline-experience-img"><img src="http://marinamarques.pt/img/bnp_paribas.png" alt="BNP Paribas"></div>
                                    <div class="timeline-experience-info clear-after">
                                        <h5>BNP Paribas</h5>
                                        <div class="timeline-role">Jr. Front End Developer & Content Administrator</div>
                                        <p>May 2015 - December 2015</p>
                                    </div>
                                    <!-- experience-info -->
                                </div>
                                <!-- experience -->
                            </div>
                            <!-- year -->
                            <div class="timeline-year timeline-year1">
                                <time datetime="2014">2014</time>
                                <div class="timeline-experience">
                                    <span class="timeline-circle"></span>
                                    <div class="timeline-experience-img"><img src="http://marinamarques.pt/img/paginas_amarelas.png" alt="Páginas Amarelas"></div>
                                    <div class="timeline-experience-info clear-after">
                                        <h5>Páginas Amarelas</h5>
                                        <div class="timeline-role">Internal Communication Technician</div>
                                        <p>March 2014 - May 2015</p>
                                    </div>
                                    <!-- experience-info -->
                                </div>
                                <!-- experience -->
                                <time datetime="2013">2013</time>
                                <div class="timeline-experience">
                                    <span class="timeline-circle"></span>
                                    <div class="timeline-experience-img"><img src="http://marinamarques.pt/img/paginas_amarelas.png" alt="Páginas Amarelas"></div>
                                    <div class="timeline-experience-info clear-after">
                                        <h5>Páginas Amarelas</h5>
                                        <div class="timeline-role">Jr. Web Developer & Content Producer</div>
                                        <p>February 2013 - March 2014</p>
                                    </div>
                                    <!-- experience-info -->
                                </div>
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
                      <button class="login-button">Login</button>
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
            mapStyle: 'mapbox://styles/mapbox/dark-v9',
            coordinates: [110.416169, -7.779292],
            images: {
              image1: "https://images.unsplash.com/photo-1563253814-b3055eafce93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
              image2: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
              image3: "https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80",
              image4: "https://images.unsplash.com/photo-1463573230746-1049c264?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            },
            error_message: '',
            color: '',
            valid: false,
            password: '',
            email: '',
            snackbar: false,
        }
    },
    mounted() {
        // let mapboxScript = document.createElement('script')
        // mapboxScript.setAttribute('src', 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js')
        // document.head.appendChild(mapboxScript);

        import('../assets/js/carouselfade.js');
        import('../assets/js/loginform.js');
        import('../assets/js/navbarfade.js');
        import('mapbox-gl/dist/mapbox-gl.css');
    },
    methods: {
      //
    },
    created() {
      if (localStorage.getItem('reloaded')) {
          // The page was just reloaded. Clear the value from local storage
          // so that it will reload the next time this page is visited.
          localStorage.removeItem('reloaded');
      } else {
          // Set a flag so that we know not to reload the page twice.
          localStorage.setItem('reloaded', '1');
          location.reload();
      }
    }
}
</script>

<style scoped>
  @import '../assets/css/index.css';
  @import '../assets/css/login.css';
  @import '../assets/css/scrollbar.css';

  
.mapboxgl-popup-content {
    background: #00000000 !important;
}

.mgl-map-wrapper {
    box-shadow: 0 0 20px 4px black;
    position: absolute;
    border: solid;
}
.mapboxgl-canvas, .mapboxgl-marker .mapboxgl-marker-anchor-center {
  position: absolute i !important;
}

.mapboxgl-popup-content {
    background: #00000000 !important;
}
</style>
