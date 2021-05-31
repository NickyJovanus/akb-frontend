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
            <div class="button-group" style="right: 20px; position:absolute;">
                <div class="text" @click="redirectStock"> Stock
                    <i style="
                    border: solid black;
                    border-width: 0 3px 3px 0;
                    display: inline-block;
                    padding: 3px;
                    transform: rotate(315deg);
                    -webkit-transform: rotate(315deg);"></i></div>
            </div>
            <br><br>
            <div style="text-align: center; width: 100%;">
                <h2>History Stock Management</h2>
            </div>
            <div class="mt-5 table-section">
                <v-card class="ma-6">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-icon class="white--text mr-4" @click="loadData">mdi-reload</v-icon>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            width="0px"
                            class="ml-5 mr-3"
                        ></v-text-field>
                    </v-card-title>
                        <v-data-table :headers="headers" 
                            :items="historystok"
                            :loading="loading"
                            :search="search">
                            <v-progress-linear v-show="loading" slot="progress" color="red" indeterminate></v-progress-linear>
                            <template v-slot:[`item.harga_stok`]="{ item }">
                                    Rp. {{item.harga_stok.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00
                            </template>
                        </v-data-table>
                </v-card>
                <br><br>
            </div>
        <br><br>
            <br>
            <!-- start footer -->
            <footer id="contact">
                <div class="container">
                    <div class="row">
                        <p>Contact us at: 180709851@students.uajy.ac.id (Nicky Jovanus)</p>
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

        <!-- snackbar -->
        <v-snackbar v-model="snackbar" v-bind:color="color" timeout="10000" bottom left style='z-index: 10000;'>
            <template v-slot:action="{ btn }">
                <v-btn text v-bind="btn" @click="snackbar = false;"><v-icon color="white">mdi-close</v-icon></v-btn>
            </template>
            <pre style="overflow-y: hidden; text-align: center;">{{error_message}}</pre>
        </v-snackbar>
        <!-- end snackbar -->
    </v-main>
</template>

<script>
import { EventBus } from './bus.js';

export default{
    name: "HistoryStock",
    data() {
        return {
            role: '',
            headers: [
                { text: "ID", align: "start",       value: "id_history_stok" },
                { text: "Nama Bahan",               value: "nama_bahan"      },
                { text: "Harga Stok",               value: "harga_stok"    },
                { text: "Stok Masuk",               value: "stok_masuk"      },
                { text: "Stok Tersisa",             value: "stok_tersisa"    },
                { text: "Stok Terbuang",            value: "stok_terbuang"   },
                { text: "Unit Stok",                value: "unit_stok"       },
                { text: "Tanggal Stok",             value: "tanggal_stok"    },
                { text: "Nama Karyawan",            value: "nama_karyawan"   },
            ],
            historystok:      [],
            bahan:            [],
            karyawan:         [],
            inputType:     'Add',
            dialog:        false,
            dialogDelete:  false,
            dialogConfirm: false,
            dialogRedir:   false,
            editId:        null,
            deleteId:      null,
            passwordId:    null,
            search:          '',
            error_message:   '',
            color:           '',
            suffix:          '',
            snackbar:     false,
            progressBar:  false,
            loading:      false,
            isConfirm:    false,
            tanggal_stok: false,
        }
    },

    mounted() {
        this.historystok = JSON.parse(localStorage.getItem('historystok'));
        this.bahan       = JSON.parse(localStorage.getItem('bahan'));
        this.karyawan    = JSON.parse(localStorage.getItem('karyawan'));
        this.role        = localStorage.getItem('role');

        if(localStorage.getItem('historystok') == null) {this.loadData();}

        if (this.role != 'Operational Manager' && this.role != 'Cashier' && this.role != 'Waiter')
            this.redirectDashboard();

        EventBus.$on('bahan', () => {
            this.bahan = JSON.parse(localStorage.getItem('bahan'));
            this.loadData();
        });

        EventBus.$on('karyawan', () => {
            this.karyawan = JSON.parse(localStorage.getItem('karyawan'));
            this.loadData();
        });

        EventBus.$on('pesanan', () => {this.loadData();});
        EventBus.$on('stok', () => {this.loadData();});
    },

    methods: {
        redirectDashboard() {
            this.$router.push({
                path: '/dashboard',
            });
        },

        redirectStock() {
            this.$router.push({
                path: '/manage/stock',
            });
        },

        loadData() {
            var url = this.$api + '/historystok';
            this.loading = true;

            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.historystok = response.data.data;
                localStorage.setItem('historystok', JSON.stringify(response.data.data));
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },
    },

    created() {
        if (localStorage.getItem('reloaded')) {
            this.loadData();
            localStorage.removeItem('reloaded');
        } else {
            this.loadData();
            localStorage.setItem('reloaded', false);
        }
    },

    destroyed() {
        this.loadData();
    }
}
</script>