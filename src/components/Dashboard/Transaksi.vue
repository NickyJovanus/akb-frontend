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
                <h2>Transaksi Management</h2>
            </div>
            <div class="mt-5 table-section">
                <v-card class="ma-6">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-btn dark @click="dialog = true">
                            Add
                        </v-btn>
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
                            :items="transaksi"
                            :loading="loading"
                            :search="search">
                            <v-progress-linear v-show="loading" slot="progress" color="red" indeterminate></v-progress-linear>
                            <template v-slot:[`item.detail_kartu`]="{ item }">
                                <span  v-if="item.nomor_kartu != null">
                                    <div v-for="(transaksi, index) in transaksi" :key="index">
                                        <div v-if="showKartu[index].show == false 
                                                  && showKartu[index].id_transaksi == item.id_transaksi
                                                  && item.nomor_kartu != null"
                                            @mouseover="showKartu[index].show = true"
                                            class="cyan--text"
                                            >Hover to Reveal</div>
                                        <span v-show="showKartu[index].show == true && showKartu[index].id_transaksi == item.id_transaksi"
                                            @mouseleave="showKartu[index].show = false;"
                                            class="green--text">
                                            {{item.nomor_kartu}} ({{item.pemilik_kartu}})
                                        </span>
                                    </div>
                                </span>
                            </template>
                            <template v-slot:[`item.tipe_pembayaran`]="{ item }">
                                <v-btn 
                                    :disabled="true" 
                                    style="color: white !important;"
                                    :style="{'background-color':`${filterbg(item.tipe_pembayaran)} !important`}">
                                    {{item.tipe_pembayaran}}
                                </v-btn>
                            </template>
                            <template v-slot:[`item.subtotal_harga`]="{ item }">
                                    Rp. {{item.subtotal_harga.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00
                            </template>
                            <template v-slot:[`item.service`]="{ item }">
                                    Rp. {{item.service.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00
                            </template>
                            <template v-slot:[`item.pajak`]="{ item }">
                                    Rp. {{item.pajak.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00
                            </template>
                            <template v-slot:[`item.total_harga`]="{ item }">
                                    Rp. {{item.total_harga.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon class="purple--text mr-2 text--lighten-2" @click="printStruk(item)">mdi-printer</v-icon>
                                <v-icon class="yellow--text mr-2 text--lighten-2" @click="editHandler(item)">mdi-pencil-circle-outline</v-icon>
                                <v-icon class="red--text" @click="deleteHandler(item.id_transaksi)">mdi-delete-circle-outline</v-icon>
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

        <!-- add and edit data -->
            <v-dialog v-model="dialog" persistent max-width="600px" mt-10 style='z-index:8000;'>
                <v-card>
                    <v-flex>
                        <v-progress-linear v-if="inputType == 'Add'" v-show="progressBar" slot="progress" color="blue" indeterminate></v-progress-linear>
                        <v-progress-linear v-else v-show="progressBar" slot="progress" color="yellow" indeterminate></v-progress-linear>
                    </v-flex>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-flex class="text-right">
                            <v-icon color="red" @click="cancel">mdi-close</v-icon>
                        </v-flex>
                    </v-card-actions>
                    <v-card-title>
                        <span class="headline">{{ inputType }} Transaksi</span>
                    </v-card-title>
                    <div style="margin: 30px;">
                        <v-flex>
                            <v-select
                                v-model="form.id_pesanan"
                                label="ID Pesanan"
                                :items="pesanan"
                                item-text="id_pesanan"
                                outlined
                                clearable
                                three-line
                                v-on:change="fillForm($event)"
                            >
                                <template slot="item" slot-scope="data">
                                    {{ data.item.id_pesanan }} - No.
                                    <span v-for="item2 in meja" :key="item2.id_meja">
                                        <span v-if="data.item.id_meja == item2.id_meja"> 
                                            {{item2.no_meja}} 
                                        </span>
                                    </span> - [{{data.item.tanggal_pesanan}}]
                                </template>
                            </v-select>

                            <v-menu
                                ref="tanggal_menu"
                                v-model="tanggal_menu"
                                :close-on-content-click="false"
                                :return-value.sync="form.tanggal_pembayaran"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="form.tanggal_pembayaran"
                                    label="Tanggal Pembayaran"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    outlined
                                    clearable
                                    v-bind="attrs"
                                    v-on="on"
                                    required
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="form.tanggal_pembayaran"
                                    no-title
                                    scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn text color="red" @click="tanggal_menu = false"> Cancel </v-btn>
                                    <v-btn text color="primary" @click="$refs.tanggal_menu.save(form.tanggal_pembayaran)"> OK </v-btn>
                                </v-date-picker>
                            </v-menu>

                            <v-select
                                v-model="form.tipe_pembayaran"
                                label="Tipe Pembayaran"
                                :items="['Cash','Credit','Debit',]"
                                outlined
                                three-line
                                clearable
                            >
                            </v-select>

                            <v-text-field
                                v-show="form.tipe_pembayaran == 'Debit' || form.tipe_pembayaran == 'Credit'"
                                label="Nomor Kartu"
                                v-model="form.nomor_kartu"
                                outlined
                                clearable
                            ></v-text-field>

                            <v-text-field
                                v-show="form.tipe_pembayaran == 'Debit' || form.tipe_pembayaran == 'Credit'"
                                label="Pemilik Kartu"
                                v-model="form.pemilik_kartu"
                                outlined
                                clearable
                            ></v-text-field>

                            <v-select
                                v-model="form.id_customer"
                                label="Nama Customer"
                                :items="customer"
                                item-text="id_customer"
                                outlined
                                clearable
                                three-line
                                :value="form.id_customer"
                            >
                                <template slot="selection" slot-scope="data">
                                    {{ data.item.nama_customer }}
                                </template>
                                <template slot="item" slot-scope="data">
                                    {{ data.item.nama_customer }}
                                </template>
                            </v-select>

                            <v-select
                                v-model="form.id_karyawan"
                                label="Nama Karyawan"
                                :items="karyawan"
                                item-text="id_karyawan"
                                outlined
                                clearable
                                three-line
                                required
                                :value="form.id_karyawan"
                            >
                                <template slot="selection" slot-scope="data">
                                    {{ data.item.nama_karyawan }}
                                </template>
                                <template slot="item" slot-scope="data">
                                    {{ data.item.nama_karyawan }}
                                </template>
                            </v-select>
                        </v-flex>
                    </div>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="white darken-1" text @click="cancel">
                            Cancel
                        </v-btn>
                        <v-btn v-if="inputType == 'Add'" :disabled="progressBar" color="blue darken-1" text @click="add">
                            Save
                        </v-btn>
                        <v-btn v-if="inputType == 'Edit'" :disabled="progressBar" color="yellow darken-1" text @click="update">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        
        <v-dialog v-model="dialogDelete" persistent max-width="600px" style='z-index:8000;'>
            <v-card>
                <v-flex>
                    <v-progress-linear v-show="progressBar" slot="progress" color="red" indeterminate></v-progress-linear>
                </v-flex>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-flex class="text-right">
                        <v-icon color="red" @click="cancel">mdi-close</v-icon>
                    </v-flex>
                </v-card-actions>
                <v-card-title>
                    <span class="headline">Delete Confirmation</span>
                </v-card-title>
                <v-card-text>
                    Do you really want to delete this transaction data? <br>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white darken-1" text @click="cancel">
                        Cancel
                    </v-btn>
                    <v-btn color="red darken-1" :disabled="progressBar" text @click="deleteData"> 
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

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
    name: "Transaksi",
    data() {
        return {
            role: '',
            headers: [
                { text: "ID", align: "start",       value: "id_transaksi"       },
                { text: "ID Pesanan",               value: "id_pesanan"         },
                { text: "Tanggal Pembayaran",       value: "tanggal_pembayaran" },
                { text: "Tipe Pembayaran",          value: "tipe_pembayaran"    },
                { text: "Detail Kartu",             value: "detail_kartu"       },
                { text: "Sub Total",                value: "subtotal_harga"     },
                { text: "Service",                  value: "service"            },
                { text: "Pajak",                    value: "pajak"              },
                { text: "Total",                    value: "total_harga"        },
                { text: "Customer",                 value: "nama_customer"      },
                { text: "Karyawan",                 value: "nama_karyawan"      },
                { text: "Actions", sortable: false, value: "actions"            },
            ],
            transaksi:       [],
            pesanan:         [],
            customer:        [],
            detail:          [],
            menu:            [],
            inputType:    'Add',
            dialog:       false,
            dialogDelete: false,
            form: {
                id_pesanan:         '',
                tanggal_pembayaran: '',
                tipe_pembayaran:    '',
                nomor_kartu:        '',
                pemilik_kartu:      '',
                subtotal_harga:     '',
                pajak:              '',
                total_harga:        '',
                id_customer:        '',
                id_karyawan:        '',
            },
            loading:     false,
            search:         '',
            editId:       null,
            deleteId:     null,
            passwordId:   null,
            error_message:  '',
            color:          '',
            snackbar:    false,
            progressBar: false,
            tanggal_menu:false,
            showKartu:      [],
        }
    },

    mounted() {
        this.transaksi = JSON.parse(localStorage.getItem('transaksi'));
        this.pesanan   = JSON.parse(localStorage.getItem('pesanan'));
        this.customer  = JSON.parse(localStorage.getItem('customer'));
        this.karyawan  = JSON.parse(localStorage.getItem('karyawan'));
        this.detail    = JSON.parse(localStorage.getItem('detailpesanan'));
        this.menu      = JSON.parse(localStorage.getItem('menu'));
        this.role      = localStorage.getItem('role');
        
        var index = 0
        for(; index < this.transaksi.length; index++) {
            this.showKartu.push({id_transaksi: this.transaksi[index].id_transaksi, show: false});
        }

        if(localStorage.getItem('transaksi') == null) {this.loadData();}
        
        if (this.role != 'Operational Manager' && this.role != 'Cashier')
            this.redirectDashboard();
        
        EventBus.$on('customer', () => {
            this.customer = JSON.parse(localStorage.getItem('customer'));
            this.loadData();
        });
        
        EventBus.$on('karyawan', () => {
            this.karyawan = JSON.parse(localStorage.getItem('karyawan'));
            this.loadData();
        });
        
        EventBus.$on('pesanan', () => {
            this.pesanan = JSON.parse(localStorage.getItem('pesanan'));
            this.loadData();
        });
        
        EventBus.$on('detail', () => {this.detail = JSON.parse(localStorage.getItem('detail'));});     
        EventBus.$on('menu', () => {this.detail = JSON.parse(localStorage.getItem('menu'));});
    },
    
    methods: {
        redirectDashboard() {
            this.$router.push({
                path: '/dashboard',
            });
        },

        loadData() {
            this.loading = true;

            var url = this.$api + '/transaksi';
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.transaksi   = response.data.data;
                localStorage.setItem('transaksi', JSON.stringify(response.data.data));
                this.loading = false;
            }).catch(()=> {
                this.loading = false;
            });
        },

        editHandler(item) {
            this.inputType                  = 'Edit';
            this.editId                     = item.id_transaksi;
            this.form.id_pesanan            = item.id_pesanan;
            this.form.tanggal_pembayaran    = item.tanggal_pembayaran;
            this.form.tipe_pembayaran       = item.tipe_pembayaran;
            this.form.nomor_kartu           = item.nomor_kartu;
            this.form.pemilik_kartu         = item.pemilik_kartu;
            this.form.subtotal_harga        = item.subtotal_harga;
            this.form.pajak                 = item.pajak;
            this.form.total_harga           = item.total_harga;
            this.form.id_customer           = item.id_customer;
            this.form.id_karyawan           = item.id_karyawan;
            this.form.stok_per_unit         = item.stok_per_unit;
            this.dialog                     = true;
        },

        deleteHandler(id) {
            this.deleteId     = id;
            this.dialogDelete = true;
        },

        cancel() {
            this.dialogDelete = false;
            this.dialog       = false;
            this.inputType    = 'Add';
            this.resetForm();
        },

        resetForm() {
            this.form.id_pesanan            = '';
            this.form.tanggal_pembayaran    = '';
            this.form.tipe_pembayaran       = '';
            this.form.nomor_kartu           = '';
            this.form.pemilik_kartu         = '';
            this.form.id_customer           = '';
            this.form.id_karyawan           = '';
            this.form.subtotal_harga        = '';
            this.form.pajak                 = '';
            this.form.total_harga           = '';
        },

        
        fillForm(id) {
            //loop index array
            let index= 0;
            for(; index<this.pesanan.length; index++) {
                //match id
                if(id === this.pesanan[index].id_pesanan) {
                    this.form.subtotal_harga = this.pesanan[index].tanggal_pesanan;
                    this.form.id_meja = this.pesanan[index].id_meja;
                }
            }
        },

        add() {
            this.progressBar = true;
            let addData = {
                id_pesanan:         this.form.id_pesanan,
                tanggal_pembayaran: this.form.tanggal_pembayaran,
                tipe_pembayaran:    this.form.tipe_pembayaran,
                nomor_kartu:        this.form.nomor_kartu,
                pemilik_kartu:      this.form.pemilik_kartu,
                id_customer:        this.form.id_customer,
                id_karyawan:        this.form.id_karyawan,
            }

            var url = this.$api + '/transaksi'
            this.$http.post(url, addData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message =      '';
                this.error_message = response.data.message;
                this.color         = "green";
                this.snackbar      =    true;
                this.progressBar   =   false;
                this.cancel();
                this.loadData();
            }).catch(err => {
                this.error_message = '';
                if(!err.response.data.message.id_pesanan 
                && !err.response.data.message.tanggal_pembayaran
                && !err.response.data.message.tipe_pembayaran
                && !err.response.data.message.nomor_kartu
                && !err.response.data.message.pemilik_kartu
                && !err.response.data.message.id_karyawan
                && !err.response.data.message.id_customer)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.id_pesanan)
                        this.error_message= err.response.data.message.id_pesanan + "";
                    if(err.response.data.message.tanggal_pembayaran)
                        this.error_message= this.error_message + '\n' + err.response.data.message.tanggal_pembayaran;
                    if(err.response.data.message.tipe_pembayaran)
                        this.error_message= this.error_message + '\n' + err.response.data.message.tipe_pembayaran;
                    if(err.response.data.message.nomor_kartu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.nomor_kartu;
                    if(err.response.data.message.pemilik_kartu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.pemilik_kartu;
                    if(err.response.data.message.id_karyawan)
                        this.error_message= this.error_message + '\n' + err.response.data.message.id_karyawan;
                    if(err.response.data.message.id_customer)
                        this.error_message= this.error_message + '\n' + err.response.data.message.id_customer;
                }
                this.color       = "red";
                this.snackbar    =  true;
                this.progressBar = false;
            });
        },

        update() {
            this.progressBar = true;
            let updateData = {
                id_pesanan:         this.form.id_pesanan,
                tanggal_pembayaran: this.form.tanggal_pembayaran,
                tipe_pembayaran:    this.form.tipe_pembayaran,
                nomor_kartu:        this.form.nomor_kartu,
                pemilik_kartu:      this.form.pemilik_kartu,
                id_customer:        this.form.id_customer,
                id_karyawan:        this.form.id_karyawan,
            }

            var url = this.$api + '/transaksi/' + this.editId;
            this.$http.put(url, updateData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message =      '';
                this.error_message = response.data.message;
                this.color         = "green";
                this.snackbar      =    true;
                this.progressBar   =   false;
                this.cancel();
                this.loadData();
            }).catch(err => {
                this.error_message = '';
                if(!err.response.data.message.id_pesanan 
                && !err.response.data.message.tanggal_pembayaran
                && !err.response.data.message.tipe_pembayaran
                && !err.response.data.message.nomor_kartu
                && !err.response.data.message.pemilik_kartu
                && !err.response.data.message.id_karyawan
                && !err.response.data.message.id_customer)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.id_pesanan)
                        this.error_message= err.response.data.message.id_pesanan + "";
                    if(err.response.data.message.tanggal_pembayaran)
                        this.error_message= this.error_message + '\n' + err.response.data.message.tanggal_pembayaran;
                    if(err.response.data.message.tipe_pembayaran)
                        this.error_message= this.error_message + '\n' + err.response.data.message.tipe_pembayaran;
                    if(err.response.data.message.nomor_kartu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.nomor_kartu;
                    if(err.response.data.message.pemilik_kartu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.pemilik_kartu;
                    if(err.response.data.message.id_karyawan)
                        this.error_message= this.error_message + '\n' + err.response.data.message.id_karyawan;
                    if(err.response.data.message.id_customer)
                        this.error_message= this.error_message + '\n' + err.response.data.message.id_customer;
                }
                this.color       = "red";
                this.snackbar    =  true;
                this.progressBar = false;
            });
        },

        deleteData() {
            this.progressBar = true;

            var url = this.$api + '/transaksi/' + this.deleteId;
            this.$http.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color         = "green";
                this.snackbar      =    true;
                this.progressBar   =   false;
                this.cancel();
                this.loadData();
            }).catch(err => {
                this.error_message = err.response.data.message;
                this.color         = "red";
                this.snackbar      =  true;
                this.progressBar   = false;
            });

        },

        printStruk(item) {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const date = new Date();
            const month = monthNames[date.getMonth()];
            var currentDate = date.getDate();
            currentDate = ("0" + currentDate).slice(-2);
            var currentMonth = date.getMonth()+1;
            currentMonth = ("0" + currentMonth).slice(-2);
            var currentYear = date.getFullYear();
            currentYear = ("0" + currentYear).slice(-2);
            var currentHours = date.getHours();
            currentHours = ("0" + currentHours).slice(-2);
            var currentMinutes = date.getMinutes();
            currentMinutes = ("0" + currentMinutes).slice(-2);
            var currentSeconds = date.getSeconds();
            currentSeconds = ("0" + currentSeconds).slice(-2);
            var ampm = "";
            if(date.getHours() >= 12)
                ampm = "PM";
            else
                ampm = "AM";
            var mywindow = window.open('', 'PRINT', 'height=1000,width=750');

            var count = localStorage.getItem("count")==null?1:localStorage.getItem("count");
            if(localStorage.getItem("dateincrement") != currentDate) {
                localStorage.setItem("dateincrement", currentDate);
                localStorage.setItem("count", 1);
            } else {
                count=Number(count)+1;
                localStorage.setItem("count", count);
            }
            count = ("0" + count).slice(-2);

            var currentDetail = [];

            var index = 0;
            for(; index<this.detail.length; index++) {
                if(item.id_pesanan == this.detail[index].id_pesanan) {
                    currentDetail.push(this.detail[index]);
                }
            }

            mywindow.document.write(`
            <html>
                <head><title> Cetak Struk Transaksi #AKB-`+currentDate+``+currentMonth+``+currentYear+`-`+count+` - Atma Korean BBQ</title></head>
                
                <body>
                    <div style="width: 100%; text-align: -webkit-center; font-family: sans-serif;">
                        <div style="border: solid 3px black; margin: 50px;">
                            <br>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style="border-bottom: black 3px dashed;">
                                            <img src="` + require("@/assets/images/AKB-logo 1080.png")  + `" style="width: 200; height: 200;"/>
                                            <br><br>
                                        </td>
                                        <td style="text-align: center; border-bottom: black 3px dashed;">
                                            <h1 style="color: #4b4b77; margin: 0;">ATMA KOREAN BBQ</h1><br>
                                            <h4 style="color: #d24848; margin: 0;">FUN PLACE TO GRILL!</h4><br>
                                            Jl. Babarsari No.43 Yogyakarta<br>
                                            552181<br>
                                            Telp. (0274) 487711<br>
                                            https://atmakoreanbbq.web.app/
                                        </td>
                                    </tr>
                                    <tr>
                                        
                                    </tr>
                                </tbody>
                            </table>
                            <table style="margin-left: 50px; margin-right: 50px";>
                                <tbody>
                                    <tr>
                                        <td><h4>Receipt # </h4></td>
                                        <td><p style="margin-left: 20px; margin-right: 20px;">AKB-`+currentDate+``+currentMonth+``+currentYear+`-`+count+`</p></td>
                                        <td><h4 style="margin-left: 50px;">Date </h4></td>
                                        <td><p style="margin-left: 20px;">`+date.getDate()+`/`+ (date.getMonth()+1) +`/`+date.getFullYear()+`</p></td>
                                    </tr>
                                    <tr class="wtr">
                                        <td><h4>Waiter </h4></td>
                                        <td><p style="margin-left: 20px;">`+ item.nama_waiter +`</p></td>
                                        <td><h4 style="margin-left: 50px;">Time </h4></td>
                                        <td><p style="margin-left: 20px;">`+currentHours+`:`+currentMinutes+`</p></td>
                                    </tr>
                                    <style>.wtr td {border-bottom: black 3px dashed;}</style>
                                    <tr></tr>
                                    <tr>
                                        <td><h4>Table # </h4></td>
                                        <td><p style="margin-left: 20px;">`+ item.no_meja +`</p></td>
                                        <td><h4 style="margin-left: 50px;">Customer </h4></td>
                                        <td><p style="margin-left: 20px;">`+ item.nama_customer +`</p></td>
                                    </tr>
                                </tbody>
                                <style>h4 {margin: 4px;}</style>
                            </table>

                            <table style="border-top: double 3px black; border-bottom: double 3px black;">
                                <thead>
                                    <tr class="tablehead">
                                        <th><h4 style="margin-right: 25px;">Qty</h4></th>
                                        <th><h4 style="margin-right: 175px;">Item Menu</h4></th>
                                        <th><h4 style="margin-right: 25px;">Harga</h4></th>
                                        <th><h4 style="margin-left: 50px;">Sub Total</h4></th>
                                    </tr>
                                    <style>.tablehead th {border-bottom: solid 1px black;}</style>
                                </thead>
                                <tbody>
                                    `);
            for(index=0; index<currentDetail.length; index++) {
                mywindow.document.write(`   
                    <tr>
                        <td><p>`+ currentDetail[index].jumlah_item +`</p></td>
                        <td><p>`+ currentDetail[index].nama_menu +`</p></td>
                        <td  style="text-align: right;">`+ currentDetail[index].harga_menu +`</td>
                        <td><p style="margin-left: 50px; text-align: right;">`+ currentDetail[index].harga_item +`</p></td>
                    </tr>`);
            }
                                    
            mywindow.document.write(`

                                    <tr class="bottomtable">
                                        <td></td><td></td><td></td><td></td>
                                    </tr>
                                    <style>.bottomtable td{ border-bottom: black 3px dashed;}</style>
                                    <tr>
                                        <td></td><td></td>
                                        <td>Sub Total</td>
                                        <td style="text-align: right;">`+ item.subtotal_harga +`</td>
                                    </tr>
                                    <tr>
                                        <td></td><td></td>
                                        <td>Service 5%</td>
                                        <td style="text-align: right;">`+ item.service +`</td>
                                    </tr>
                                    <tr>
                                        <td></td><td></td>
                                        <td>Tax 10%</td>
                                        <td style="text-align: right;">`+ item.pajak +`</td>
                                    </tr>

                                    <tr class="bottomtable">
                                        <td></td><td></td><td></td><td></td>
                                    </tr>

                                    <tr>
                                        <td></td><td></td>
                                        <td><h4>Total</h4></td>
                                        <td style="text-align: right;"><h4>`+ item.total_harga +`</h4></td>
                                    </tr>
                                </tbody>
                            </table>
                            <br>
                            <div style="text-align: right; margin-right: 50px; font-size: 14px;">
                                Total Qty: `+ item.total_item +`<br>
                                Total Item: `+ item.total_menu +`
                                <h5>Printed `+ month +` `+ date.getDate() +`, `+ date.getFullYear() +` `+ currentHours +`:`+ currentMinutes +`:`+ currentSeconds +` `+ ampm +`</h5>
                                <p>Cashier: `+ item.nama_karyawan +`</p>
                            </div>
                            <br>
                            <p  style="margin: 0;">-----------------------------------------------------------------------------------------------------</p>
                            <h4> THANK YOU FOR YOUR VISIT </h4>
                            <p  style="margin: 0;">-----------------------------------------------------------------------------------------------------</p>
                            <br><br><br>
                        </div>
                    </div>
                </body>
                <style>table {border-collapse: collapse;}</style>
            </html>
            `);

            mywindow.document.close();
            mywindow.focus();

            mywindow.print();

            return true;
        },

        filterbg(type) {
            switch(type) {
                case 'Cash'   : return 'green';
                case 'Credit' : return '#185fff';
                case 'Debit'  : return 'rgb(255 58 58)';
                default       : return 'purple';
            }
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
        console.log("transaksi component destroyed");
    }
}
</script>