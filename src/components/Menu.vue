<template>
    <main>
        <div id="container">
            <header class="intro">
                <div class="intro-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8 col-md-offset-2">
                                <br><br>
                                <p class="intro-text">
                                    Atma Korean BBQ's Menu
                                </p>
                                <br>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div class="button-group" style="margin-left: 20px;">
                <div class="text" @click="redirectIndex"><i style="
                    border: solid black;
                    border-width: 0 3px 3px 0;
                    display: inline-block;
                    padding: 3px;
                    transform: rotate(135deg);
                    -webkit-transform: rotate(135deg);"></i> Return</div>
            </div>
            <br>
            <section id="portfolio">
                <div class="container-fluid portfolio-ct">
                    <h2>MAKANAN UTAMA</h2>
                    <div class="row">

                        <div class="col-sm-6 col-md-4 skeletons" v-for="(menu) in 9" :key="menu.id_menu">

                            <!-- Skeletons -->
                            <template class="col-sm-6 col-md-4 grid-portfolio"  v-if="loading == true">
                                    <v-skeleton-loader
                                        class="mx-auto .d-block d-lg-none"
                                        min-width="95vw"
                                        type="card"
                                    ></v-skeleton-loader>
                            </template>

                            <template class="col-sm-6 col-md-4 grid-portfolio" v-if="loading == true">
                                    <v-skeleton-loader
                                        class="mx-auto .d-none d-lg-block"
                                        min-width="600px"
                                        type="card"
                                    ></v-skeleton-loader>
                            </template>

                        </div>

                        <!-- start first portfolio item -->
                        <div>
                            <div class="col-sm-6 col-md-4 grid-portfolio"  v-for="(menu) in makanan" :key="menu.gambar_menu">
                                <div class="portfolio-item-ct">
                                    <div class="thumbnail">
                                        <img :src="menu.gambar_menu" class="img-responsive">
                                    </div>
                                    <div class="caption portfolio-details">
                                        <h3>{{menu.nama_menu}}</h3>
                                        <p> {{menu.unit_menu}}<br>
                                            {{menu.deskripsi_menu}}<br>
                                        </p>
                                        <p v-if="menu.harga_menu > 0">
                                            Rp. {{menu.harga_menu.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00
                                        </p>
                                        <p v-else>
                                            Free
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end first portfolio item -->
                    </div>
                    <!-- end row portfolio -->
                </div>
                <!-- end container portfolio -->
            </section>
            <section id="portfolio">
                <div class="container-fluid portfolio-ct">
                    <h2>SIDE DISHES</h2>
                    <div class="row">

                        <div class="col-sm-6 col-md-4 skeletons" v-for="(menu) in 9" :key="menu.id_menu">

                            <template class="col-sm-6 col-md-4 grid-portfolio"  v-if="loading == true">
                                    <v-skeleton-loader
                                        class="mx-auto .d-block d-lg-none"
                                        min-width="95vw"
                                        type="card"
                                    ></v-skeleton-loader>
                            </template>

                            <template class="col-sm-6 col-md-4 grid-portfolio" v-if="loading == true">
                                    <v-skeleton-loader
                                        class="mx-auto .d-none d-lg-block"
                                        min-width="600px"
                                        type="card"
                                    ></v-skeleton-loader>
                            </template>

                        </div>

                        <!-- start first portfolio item -->
                        <div class="col-sm-6 col-md-4 grid-portfolio"  v-for="(menu) in sidedish" :key="menu.id_menu">
                            <div class="portfolio-item-ct">
                                <div class="thumbnail">
                                    <img :src="menu.gambar_menu" class="img-responsive">
                                </div>
                                <div class="caption portfolio-details">
                                    <h3>{{menu.nama_menu}}</h3>
                                    <p> {{menu.unit_menu}}<br>
                                        {{menu.deskripsi_menu}}<br>
                                    </p>
                                    <p v-if="menu.harga_menu > 0">
                                        Rp. {{menu.harga_menu.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00
                                    </p>
                                    <p v-else>
                                        Free
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
            <section id="portfolio">
                <div class="container-fluid portfolio-ct">
                    <h2>MINUMAN</h2>
                    <div class="row">

                        <div class="col-sm-6 col-md-4 skeletons" v-for="(menu) in 9" :key="menu.id_menu">

                            <template class="col-sm-6 col-md-4 grid-portfolio"  v-if="loading == true">
                                    <v-skeleton-loader
                                        class="mx-auto .d-block d-lg-none"
                                        min-width="95vw"
                                        type="card"
                                    ></v-skeleton-loader>
                            </template>

                            <template class="col-sm-6 col-md-4 grid-portfolio" v-if="loading == true">
                                    <v-skeleton-loader
                                        class="mx-auto .d-none d-lg-block"
                                        min-width="600px"
                                        type="card"
                                    ></v-skeleton-loader>
                            </template>

                        </div>

                        <!-- start first portfolio item -->
                        <div class="col-sm-6 col-md-4 grid-portfolio"  v-for="(menu) in minuman" :key="menu.nama_menu">
                            <div class="portfolio-item-ct">
                                <div class="thumbnail">
                                    <img :src="menu.gambar_menu" class="img-responsive">
                                </div>
                                <div class="caption portfolio-details">
                                    <h3>{{menu.nama_menu}}</h3>
                                    <p> {{menu.unit_menu}}<br>
                                        {{menu.deskripsi_menu}}<br>
                                    </p>
                                    <p v-if="menu.harga_menu > 0">
                                        Rp. {{menu.harga_menu.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00
                                    </p>
                                    <p v-else>
                                        Free
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
    </main>
</template>

<script>
export default{
    name: "Menu",
    data() {
        return {
            menus: [],
            customers: null,
            dishes: [],
            loading: true,
        }
    },
    mounted() {
        this.loadData();
        import('../assets/js/carouselfade.js');
    },
    methods: {
        loadData() {
            var url = this.$api + '/menu';
            this.loading = true;

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
            });
            this.collapsed = true;
        },
    },
    computed: {
        //Filters for category
        makanan() {
            return this.menus.filter(menus => menus.kategori_menu === 'makanan')
        },
        sidedish() {
            return this.menus.filter(menus => menus.kategori_menu === 'side dish')
        },
        minuman() {
            return this.menus.filter(menus => menus.kategori_menu === 'minuman')
        },
    },
}
</script>

<style scoped>
  @import '../assets/css/index.css';
  @import '../assets/css/scrollbar.css';

  .intro .intro-body {
    padding: 5%;
  }
</style>