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
                <div class="text" @click="redirectHistory"> Stock History
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
                <h2>Stock Management</h2>
            </div>
            <div class="mt-5 table-section">
                <v-card class="ma-6">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-icon class="white--text mr-4" @click="loadData">mdi-reload</v-icon>
                        <v-btn dark v-if="role == 'Operational Manager' || role == 'Owner'" @click="dialog = true">
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
                            :items="stok"
                            :loading="loading"
                            :search="search">
                            <v-progress-linear v-show="loading" slot="progress" color="red" indeterminate></v-progress-linear>
                            <template v-slot:[`item.harga_stok`]="{ item }">
                                    Rp. {{item.harga_stok.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon class="green--text mr-1 text--lighten-2" @click="confirmHandler(item)">mdi-checkbox-marked-circle-outline</v-icon>
                                <v-icon class="yellow--text ml-1 mr-1 text--lighten-2" @click="editHandler(item)">mdi-pencil-circle-outline</v-icon>
                                <v-icon class="red--text ml-1" @click="deleteHandler(item.id_stok)">mdi-delete-circle-outline</v-icon>
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
                        <span class="headline">{{ inputType }} Stok</span>
                    </v-card-title>
                    <div style="margin: 30px;">
                        <v-flex>
                            <v-select
                                v-model="form.id_bahan"
                                label="Nama Bahan"
                                :items="bahan"
                                item-text="id_bahan"
                                outlined
                                three-line
                                clearable
                                @input="fillStok($event)"
                            >
                                <template slot="selection" slot-scope="data">
                                    {{ data.item.nama_bahan }}
                                </template>
                                <template slot="item" slot-scope="data">
                                    {{ data.item.nama_bahan }}
                                </template>
                            </v-select>

                            <v-text-field
                                label="Harga Stok"
                                v-model="form.harga_stok"
                                type="number"
                                prefix="Rp. "
                                outlined
                                clearable
                            ></v-text-field>

                            <v-text-field
                                label="Stok Tersisa"
                                v-model="form.stok_tersisa"
                                type="number"
                                :suffix="suffix"
                                outlined
                                clearable
                                disabled
                            ></v-text-field>

                            <v-text-field
                                label="Stok Masuk"
                                v-model="form.stok_masuk"
                                type="number"
                                :suffix="suffix"
                                outlined
                                clearable
                            ></v-text-field>

                            <v-text-field
                                v-if="inputType=='Edit'"
                                label="Stok Terbuang"
                                v-model="form.stok_terbuang"
                                type="number"
                                :suffix="suffix"
                                outlined
                                clearable
                                disabled
                            ></v-text-field>
                            
                            <v-menu
                                ref="tanggal_stok"
                                v-model="tanggal_stok"
                                :close-on-content-click="false"
                                :return-value.sync="form.tanggal_stok"
                                transition="slide-x-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="form.tanggal_stok"
                                    label="Tanggal Stok Masuk"
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
                                    v-model="form.tanggal_stok"
                                    no-title
                                    scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn text color="red"     @click="tanggal_stok = false"> Cancel </v-btn>
                                    <v-btn text color="primary" @click="$refs.tanggal_stok.save(form.tanggal_stok)"> OK </v-btn>
                                </v-date-picker>
                            </v-menu>

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
                    Do you really want to delete this stok?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white darken-1" text @click="cancel">
                        Cancel
                    </v-btn>
                    <v-btn color="red darken-1" text :disabled="progressBar" @click="deleteData"> 
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <v-dialog v-model="dialogConfirm" persistent max-width="600px" style='z-index:8000;'>
            <v-card>
                <v-flex>
                    <v-progress-linear v-show="progressBar" slot="progress" color="green" indeterminate></v-progress-linear>
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
                    <span class="headline">Stock Confirmation</span>
                </v-card-title>
                <v-card-text>
                    Confirm this stock data?
                    (confirmed data will be moved to stock and you won't be able to make any changes.)
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white darken-1" text @click="cancel">
                        Cancel
                    </v-btn>
                    <v-btn color="green darken-1" text :disabled="progressBar" @click="confirmStok"> 
                        Confirm
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
    name: "Stok",
    data() {
        return {
            role: '',
            headers: [
                { text: "ID", align: "start",       value: "id_stok"       },
                { text: "Nama Bahan",               value: "nama_bahan"    },
                { text: "Harga Stok",               value: "harga_stok"    },
                { text: "Stok Masuk",               value: "stok_masuk"    },
                { text: "Stok Tersisa",             value: "stok_tersisa"  },
                { text: "Stok Terbuang",            value: "stok_terbuang" },
                { text: "Unit Stok",                value: "unit_stok"     },
                { text: "Tanggal Stok",             value: "tanggal_stok"  },
                { text: "Nama Karyawan",            value: "nama_karyawan" },
                { text: "Actions", sortable: false, value: "actions"       },
            ],
            stok:             [],
            bahan:            [],
            karyawan:         [],
            inputType:     'Add',
            dialog:        false,
            dialogDelete:  false,
            dialogConfirm: false,
            dialogRedir:   false,
            form: {
                id_bahan:      '',
                harga_stok:    '',
                stok_masuk:    '',
                stok_tersisa:  '',
                stok_terbuang: '',
                unit_stok:     '',
                tanggal_stok:  '',
                id_karyawan:   '',
            },
            confirmForm: {
                id_bahan:      '',
                harga_stok:    '',
                stok_masuk:    '',
                stok_tersisa:  '',
                stok_terbuang: '',
                unit_stok:     '',
                tanggal_stok:  '',
                id_karyawan:   '',
            },
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
        this.stok     = JSON.parse(localStorage.getItem('stok'));
        this.bahan    = JSON.parse(localStorage.getItem('bahan'));
        this.karyawan = JSON.parse(localStorage.getItem('karyawan'));
        this.role     = localStorage.getItem('role');

        if(localStorage.getItem('stok') == null) {this.loadData();}

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

        EventBus.$on('pesanan', () => {
            this.loadData();
        });
    },

    methods: {
        redirectDashboard() {
            this.$router.push({
                path: '/dashboard',
            });
        },

        redirectHistory() {
            this.$router.push({
                path: '/manage/history-stock',
            });
        },

        loadData() {
            var url = this.$api + '/stok';
            this.loading = true;

            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.stok = response.data.data;
                localStorage.setItem('stok', JSON.stringify(response.data.data));
                this.emitStok();
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },

        editHandler(item) {
            this.inputType          = 'Edit';
            this.editId             = item.id_stok;
            this.form.id_bahan      = item.id_bahan;
            this.form.harga_stok    = item.harga_stok;
            this.form.stok_masuk    = item.stok_masuk;
            this.form.stok_tersisa  = item.stok_tersisa;
            this.form.stok_terbuang = item.stok_terbuang;
            this.form.unit_stok     = this.suffix;
            this.form.tanggal_stok  = item.tanggal_stok;
            this.form.id_karyawan   = item.id_karyawan;
            this.fillStok(item.id_bahan);
            this.dialog             = true;
        },

        deleteHandler(id) {
            this.deleteId     =   id;
            this.dialogDelete = true;
        },

        confirmHandler(item) {
            this.isConfirm                 = true;
            this.deleteId                  = item.id_stok;
            this.confirmForm.id_bahan      = item.id_bahan;
            this.confirmStok.harga_stok    = item.harga_stok;
            this.confirmForm.stok_masuk    = item.stok_masuk;
            this.confirmForm.stok_tersisa  = item.stok_tersisa;
            this.confirmForm.stok_terbuang = item.stok_terbuang;
            this.confirmForm.unit_stok     = item.unit_stok;
            this.confirmForm.tanggal_stok  = item.tanggal_stok;
            this.confirmForm.id_karyawan   = item.id_karyawan;
            this.dialogConfirm = true;
        },
        
        fillStok(id_bahan) {
            let index=0;
            for(; index<this.bahan.length;index++) {
                if(id_bahan == this.bahan[index].id_bahan) {
                    this.form.stok_tersisa = this.bahan[index].jml_bahan;
                    this.suffix = this.bahan[index].unit_bahan;
                }
            }
        },

        cancel() {
            this.dialogDelete   = false;
            this.dialog         = false;
            this.dialogConfirm  = false;
            this.isConfirm      = false;
            this.inputType      = 'Add';
            this.suffix         =    '';
            this.resetForm();
        },

        resetForm() {
            this.form.id_bahan             = '';
            this.form.harga_stok           = '';
            this.form.stok_masuk           = '';
            this.form.stok_tersisa         = '';
            this.form.stok_terbuang        = '';
            this.form.unit_stok            = '';
            this.form.tanggal_stok         = '';
            this.form.id_karyawan          = '';

            this.confirmForm.id_bahan      = '';
            this.confirmForm.harga_stok    = '';
            this.confirmForm.stok_masuk    = '';
            this.confirmForm.stok_tersisa  = '';
            this.confirmForm.stok_terbuang = '';
            this.confirmForm.unit_stok     = '';
            this.confirmForm.tanggal_stok  = '';
            this.confirmForm.id_karyawan   = '';
        },

        add() {
            this.progressBar = true;
            let addData = {
                id_bahan:       this.form.id_bahan     ,
                harga_stok:     this.form.harga_stok   ,
                stok_masuk:     this.form.stok_masuk   ,
                stok_tersisa:   this.form.stok_tersisa ,
                stok_terbuang:  '0'                    ,
                unit_stok:      this.suffix            ,
                tanggal_stok:   this.form.tanggal_stok ,
                id_karyawan:    this.form.id_karyawan  ,
            }

            var url = this.$api + '/stok'
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
                if(!err.response.data.message.id_bahan 
                && !err.response.data.message.stok_masuk
                && !err.response.data.message.stok_tersisa
                && !err.response.data.message.stok_terbuang
                && !err.response.data.message.unit_stok
                && !err.response.data.message.tanggal_stok
                && !err.response.data.message.id_karyawan)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.id_bahan)
                        this.error_message= err.response.data.message.id_bahan + "";
                    if(err.response.data.message.harga_stok)
                        this.error_message= this.error_message + '\n' + err.response.data.message.harga_stok;
                    if(err.response.data.message.stok_masuk)
                        this.error_message= this.error_message + '\n' + err.response.data.message.stok_masuk;
                    if(err.response.data.message.stok_tersisa)
                        this.error_message= this.error_message + '\n' + err.response.data.message.stok_tersisa;
                    if(err.response.data.message.stok_terbuang)
                        this.error_message= this.error_message + '\n' + err.response.data.message.stok_terbuang;
                    if(err.response.data.message.unit_stok)
                        this.error_message= this.error_message + '\n' + err.response.data.message.unit_stok;
                    if(err.response.data.message.tanggal_stok)
                        this.error_message= this.error_message + '\n' + err.response.data.message.tanggal_stok;
                    if(err.response.data.message.id_karyawan)
                        this.error_message= this.error_message + '\n' + err.response.data.message.id_karyawan;
                }
                this.color          = "red";
                this.snackbar       =  true;
                this.progressBar    = false;
            });
        },

        confirmStok() {
            this.progressBar = true;
            let confData = {
                id_bahan:       this.confirmForm.id_bahan     ,
                harga_stok:     this.confirmForm.harga_stok   ,
                stok_masuk:     this.confirmForm.stok_masuk   ,
                stok_tersisa:   this.confirmForm.stok_tersisa ,
                stok_terbuang:  this.confirmForm.stok_terbuang,
                unit_stok:      this.confirmForm.unit_stok    ,
                tanggal_stok:   this.confirmForm.tanggal_stok ,
                id_karyawan:    this.confirmForm.id_karyawan  ,
            }

            var url = this.$api + '/historystok'
            this.$http.post(url, confData, {
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            }).then(response => {
                this.error_message =      '';
                this.error_message = response.data.message;
                this.color         = "green";
                this.snackbar      =    true;
                this.progressBar   =   false;
                this.emitStok();
                this.deleteData();
            }).catch(err => {
                this.error_message = '';
                if(!err.response.data.message.id_bahan 
                && !err.response.data.message.stok_masuk
                && !err.response.data.message.stok_tersisa
                && !err.response.data.message.stok_terbuang
                && !err.response.data.message.unit_stok
                && !err.response.data.message.tanggal_stok
                && !err.response.data.message.id_karyawan)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.id_bahan)
                        this.error_message= err.response.data.message.id_bahan + "";
                    if(err.response.data.message.harga_stok)
                        this.error_message= this.error_message + '\n' + err.response.data.message.harga_stok;
                    if(err.response.data.message.stok_masuk)
                        this.error_message= this.error_message + '\n' + err.response.data.message.stok_masuk;
                    if(err.response.data.message.stok_tersisa)
                        this.error_message= this.error_message + '\n' + err.response.data.message.stok_tersisa;
                    if(err.response.data.message.stok_terbuang)
                        this.error_message= this.error_message + '\n' + err.response.data.message.stok_terbuang;
                    if(err.response.data.message.unit_stok)
                        this.error_message= this.error_message + '\n' + err.response.data.message.unit_stok;
                    if(err.response.data.message.tanggal_stok)
                        this.error_message= this.error_message + '\n' + err.response.data.message.tanggal_stok;
                    if(err.response.data.message.id_karyawan)
                        this.error_message= this.error_message + '\n' + err.response.data.message.id_karyawan;
                }
                this.color          = "red";
                this.snackbar       =  true;
                this.progressBar    = false;
            });

        },

        update() {
            this.progressBar = true;
            let updateData = {
                id_bahan:       this.form.id_bahan     ,
                harga_stok:     this.form.harga_stok   ,
                stok_masuk:     this.form.stok_masuk   ,
                stok_tersisa:   this.form.stok_tersisa ,
                stok_terbuang:  this.form.stok_terbuang,
                unit_stok:      this.suffix            ,
                tanggal_stok:   this.form.tanggal_stok ,
                id_karyawan:    this.form.id_karyawan  ,
            }

            var url = this.$api + '/stok/' + this.editId;
            this.$http.put(url, updateData, {
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
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
                if(!err.response.data.message.id_bahan 
                && !err.response.data.message.stok_masuk
                && !err.response.data.message.stok_tersisa
                && !err.response.data.message.stok_terbuang
                && !err.response.data.message.unit_stok
                && !err.response.data.message.tanggal_stok
                && !err.response.data.message.id_karyawan)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.id_bahan)
                        this.error_message= err.response.data.message.id_bahan + "";
                    if(err.response.data.message.harga_stok)
                        this.error_message= this.error_message + '\n' + err.response.data.message.harga_stok;
                    if(err.response.data.message.stok_masuk)
                        this.error_message= this.error_message + '\n' + err.response.data.message.stok_masuk;
                    if(err.response.data.message.stok_tersisa)
                        this.error_message= this.error_message + '\n' + err.response.data.message.stok_tersisa;
                    if(err.response.data.message.stok_terbuang)
                        this.error_message= this.error_message + '\n' + err.response.data.message.stok_terbuang;
                    if(err.response.data.message.unit_stok)
                        this.error_message= this.error_message + '\n' + err.response.data.message.unit_stok;
                    if(err.response.data.message.tanggal_stok)
                        this.error_message= this.error_message + '\n' + err.response.data.message.tanggal_stok;
                    if(err.response.data.message.id_karyawan)
                        this.error_message= this.error_message + '\n' + err.response.data.message.id_karyawan;
                }
                this.color          = "red";
                this.snackbar       =  true;
                this.progressBar    = false;
            });
        },

        deleteData() {
            this.progressBar = true;

            var url = this.$api + '/stok/' + this.deleteId;
            this.$http.delete(url, {
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            }).then(response => {
                this.error_message= response.data.message;
                this.color = "green"
                this.snackbar = true;
                this.loadData();
                this.emitStok();
                this.progressBar = false;
                this.dialogDelete = false;
                this.cancel();
            }).catch(err => {
                this.error_message= err.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.progressBar = false;
            });
        },

        emitStok() {
            EventBus.$emit('stok', 'data');
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
    }
}
</script>