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
                                        <v-btn v-if="showKartu[index].show == false 
                                                  && showKartu[index].id_transaksi == item.id_transaksi
                                                  && item.nomor_kartu != null"
                                            @mouseover="showKartu[index].show = true"
                                            class="cyan--text"
                                            >Hover to Reveal</v-btn>
                                        <span v-show="showKartu[index].show == true && showKartu[index].id_transaksi == item.id_transaksi"
                                            @mouseleave="showKartu[index].show = false;"
                                            class="green--text">
                                            {{item.nomor_kartu}} ({{item.pemilik_kartu}})
                                        </span>
                                    </div>
                                </span>
                            </template>
                            <template v-slot:[`item.subtotal_harga`]="{ item }">
                                    Rp. {{item.subtotal_harga.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00
                            </template>
                            <template v-slot:[`item.pajak`]="{ item }">
                                    Rp. {{item.pajak.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00
                            </template>
                            <template v-slot:[`item.total_harga`]="{ item }">
                                    Rp. {{item.total_harga.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon class="yellow--text mr-2 text--lighten-2" @click="editHandler(item)">mdi-pencil-circle-outline</v-icon>
                                <v-icon class="red--text ml-2" @click="deleteHandler(item.id_transaksi)">mdi-delete-circle-outline</v-icon>
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
                            <v-text-field
                                label="Nama Transaksi"
                                v-model="form.nama_transaksi"
                                outlined
                            ></v-text-field>

                            <v-text-field
                                label="Jumlah Transaksi"
                                v-model="form.jml_transaksi"
                                type="number"
                                outlined
                            ></v-text-field>

                            <v-text-field
                                label="Unit Transaksi"
                                v-model="form.unit_transaksi"
                                outlined
                            ></v-text-field>

                            <v-text-field
                                label="Stok per Unit"
                                v-model="form.stok_per_unit"
                                type="number"
                                outlined
                            ></v-text-field>
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
                    Do you really want to delete this transaksi? <br>
                    Deleting this data will also delete its related content
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
        <v-snackbar v-model="snackbar" v-bind:color="color" timeout="10000" bottom style='z-index:10000;' rounded="pill">
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
                { text: "Subtotal Harga",           value: "subtotal_harga"     },
                { text: "Pajak",                    value: "pajak"              },
                { text: "Total Harga",              value: "total_harga"        },
                { text: "Customer",                 value: "nama_customer"      },
                { text: "Karyawan",                 value: "nama_karyawan"      },
                { text: "Actions", sortable: false, value: "actions"            },
            ],
            transaksi:           [],
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
            showKartu:      [],
        }
    },

    mounted() {
        this.transaksi = JSON.parse(localStorage.getItem('transaksi'));
        this.role = localStorage.getItem('role');
        
        var index = 0
        for(; index < this.transaksi.length; index++) {
            this.showKartu.push({id_transaksi: this.transaksi[index].id_transaksi, show: false});
        }

        if(localStorage.getItem('transaksi') == null) {this.loadData();}
        
        if (this.role != 'Operational Manager' && this.role != 'Chef')
            this.redirectDashboard();
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
                this.emitMenu();
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
                    if(err.response.data.message.nomor_kartu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.nomor_kartu;
                    if(err.response.data.message.nomor_kartu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.nomor_kartu;
                    if(err.response.data.message.nomor_kartu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.nomor_kartu;
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
                if(!err.response.data.message.nama_transaksi 
                && !err.response.data.message.jml_transaksi
                && !err.response.data.message.unit_transaksi
                && !err.response.data.message.stok_per_unit)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.nama_transaksi)
                        this.error_message= err.response.data.message.nama_transaksi + "";
                    if(err.response.data.message.jml_transaksi)
                        this.error_message= this.error_message + '\n' + err.response.data.message.jml_transaksi;
                    if(err.response.data.message.unit_transaksi)
                        this.error_message= this.error_message + '\n' + err.response.data.message.unit_transaksi;
                    if(err.response.data.message.stok_per_unit)
                        this.error_message= this.error_message + '\n' + err.response.data.message.stok_per_unit;
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
        
        emitMenu() {
            EventBus.$emit('transaksi', '');
        }
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