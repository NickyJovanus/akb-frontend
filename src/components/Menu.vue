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
            <section id="portfolio">
                <div class="container-fluid portfolio-ct">
                    <h2>MAKANAN UTAMA</h2>
                    <div class="row">

                        <!-- start first portfolio item -->
                        <div>
                            <div class="col-sm-6 col-md-4 grid-portfolio"  v-for="(menu) in makanan" :key="menu">
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

                        <!-- start first portfolio item -->
                        <div class="col-sm-6 col-md-4 grid-portfolio"  v-for="(menu) in sidedish" :key="menu">
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

                        <!-- start first portfolio item -->
                        <div class="col-sm-6 col-md-4 grid-portfolio"  v-for="(menu) in minuman" :key="menu">
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
            items: [
                { title: "Menu", to: "/menu" },
            ],
        }
    },
    mounted() {
        this.loadData();
        import('../assets/js/carouselfade.js');
        import('../assets/js/navbarfade.js');
    },
    methods: {
        loadData() {
            var url = this.$api + '/menu';

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
    },
    computed: {
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
    watch: {
    },
    created() {
    },
}
</script>

<style scoped>
  @import '../assets/css/index.css';
  @import '../assets/css/login.css';
  @import '../assets/css/scrollbar.css';
</style>