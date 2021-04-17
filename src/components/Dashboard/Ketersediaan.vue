<template>
    <v-main>
        <div id="container" @load='loadData'>
            <br><br>
            <div class="button-group" style="margin-left: 20px;">
                <div class="text" @click="redirectDashboard"><i style="
                    border: solid black;
                    border-width: 0 3px 3px 0;
                    display: inline-block;
                    padding: 3px;
                    transform: rotate(135deg);
                    -webkit-transform: rotate(135deg);"></i> Return</div>
            </div>
            <br><br>
            <div style="text-align: center; width: 100%;">
                <h2>Ketersediaan Meja</h2>
            </div>
                <v-row class="overflow-auto">
                    <v-col
                        v-for="(item) in meja"
                        :key="item.id_meja"
                        :cols="(12/itemsPerRow)"
                        class="py-2 ma-5"
                        :style="{
                            overflow: 'hidden'
                        }"
                    > 
                        <transition name="fade">
                            <v-card
                                v-show="cards"
                                class="mx-auto"
                                max-width="250px"
                                height="250px"
                                :color="colorCard(item.status_meja)"
                            >
                                <v-card-title>
                                    <h4>No. {{item.no_meja}}</h4>
                                </v-card-title>
                                <br>
                                <v-card-text class="justify-center text-center">
                                    <h3>{{item.status_meja}}</h3>
                                </v-card-text>
                            </v-card>
                        </transition>
                    </v-col>
                </v-row>
        </div>
    </v-main>
</template>

<script>
import { EventBus } from './bus.js';

export default{
    name: "Ketersediaan",
    data() {
        return {
            meja: [],
            empty: {status_meja: "Loading..."},
            error: {status_meja: "An Unknown Error Occured."},
            loading: true,
            cards: true,
            renderComponent: true,
        }
    },
    mounted() {
        this.meja = JSON.parse(localStorage.getItem('meja'));
        // this.reload();
        // this.loadData();
    },
    methods: {
        redirectDashboard() {
            this.$router.push({
                path: '/dashboard',
            });
        },
        reload() {
            this.meja = [];
            let i = 0;
            for(i = 0; i<8; i++)
                this.meja.push(this.empty);
        },
        loadData() {
            var url = this.$api + '/meja';
            this.loading = true;

            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.cards = false;
                setTimeout(() => this.cards = true, 50);
                this.meja = [];
                this.meja = response.data.data;
                this.loading = false;
            }).catch(()=> {
                this.meja = [];
                this.meja.push(this.error);
                this.loading = false;
            });
        },
        colorCard(status) {
            switch(status) {
                case 'Empty': return 'green'; 
                case 'In-use': return 'red';
                default:  return 'grey';
            }
        },
        calcRowsPerPage() {
            let container = document.getElementById('container')
            let minItemHeight = 170
            if (container) {
                let containerHeight = parseInt(container.clientHeight, 0)
                this.rpp = Math.floor(containerHeight/minItemHeight)
            }
            else {
                this.rpp = 4
            }
        },
        randomColor(id) {
            const r = () => Math.floor(256 * Math.random());
            return this.colorCache[id] || (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()})`);
        },
        shadeBox(color) {
            return '0 0 0px 1px '+color;
        },
        forceRerender() {
            // Remove my-component from the DOM
            this.renderComponent = false;

            this.$nextTick(() => {
                // Add the component back in
                this.renderComponent = true;
            });
        }
    },

    activated: function() {
        this.forceRerender();
    },

    computed: {
        numberOfPages () {
            return Math.ceil(this.meja.length / this.ipp);
        },
        rowsPerPage () {
            return this.rpp;
        },
        itemsPerRow () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 1;
                case 'sm': return 2;
                case 'md': return 3;
                case 'lg': return 4;
                case 'xl': return 6;
            }
            return 1;
        },
        ipp () {
            return Math.ceil(this.rowsPerPage * this.itemsPerRow);
        },
    },

    created () {
        window.addEventListener('resize', () => {
            this.calcRowsPerPage()
        });
        EventBus.$on('load', data => {
            this.meja = JSON.parse(localStorage.getItem('meja'));
            // this.reload();
            // this.loadData()
        });
    },
}

</script>

<style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

</style>
