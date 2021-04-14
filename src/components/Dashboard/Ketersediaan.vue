<template>
    <v-main>
        <div id="container">
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
            
            <v-row class="fill-height overflow-auto">
                <v-col ma-5
                    v-for="(item) in meja"
                    :key="item.id_meja"
                    :cols="(12/itemsPerRow)"
                    class="py-2"
                    :style="{
                        overflow: 'hidden'
                    }"
                > 
                    <v-card
                        v-if="item.status_meja=='Empty'"
                        class="mx-auto"
                        max-width="344"
                        :style="{
                            backgroundColor: 'rgb(50, 255, 50);'
                        }"
                    >
                        <v-card-title>
                            {{item.no_meja}}
                        </v-card-title>

                        <v-card-actions>

                        </v-card-actions>
                    </v-card>
                    <v-card
                        v-else
                        class="mx-auto"
                        max-width="344"
                        :style="{
                            backgroundColor: 'red;'
                        }"
                    >
                        <v-card-title>
                            {{item.no_meja}}
                        </v-card-title>

                        <v-card-actions>

                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </v-main>
</template>

<script>

export default{
    name: "Ketersediaan",
    data() {
        return {
            meja: [],
        }
    },
    mounted() {
        this.loadData();
        import('@/assets/js/navbarfade.js');
    },
    methods: {
        redirectDashboard() {
            this.$router.push({
                path: '/dashboard',
            });
            this.collapsed = true;
        },
        loadData() {
            var url = this.$api + '/meja';
            this.loading = true;
            this.role = localStorage.getItem('role');

            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.meja = response.data.data;
                this.loading = false;
            }).catch(()=> {
                this.loading = false;
            });
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
        })
    },
}

</script>
