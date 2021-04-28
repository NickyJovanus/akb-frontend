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
                <h2>Pesanan Management</h2>
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
                            clearable
                            width="0px"
                            class="ml-5 mr-3"
                        ></v-text-field>
                    </v-card-title>
                        <v-data-table :headers="headers" 
                            :items="pesanan"
                            :loading="loading"
                            :search="search">
                            <v-progress-linear v-show="loading" slot="progress" color="red" indeterminate></v-progress-linear>
                            <template v-slot:[`item.detail_pesanan`]="{ item }">
                                <span v-for="item2 in detail_pesanan" :key="item2.id_detail_pesanan">
                                    <span v-if="item.id_pesanan == item2.id_pesanan">
                                        <span v-for="item3 in menus" :key="item3.id_menu">
                                            <div v-if="item2.id_menu == item3.id_menu">
                                                - {{item3.nama_menu}} x{{item2.jumlah_item}}
                                            </div>
                                        </span>
                                    </span>
                                </span>
                            </template>
                            <template v-slot:[`item.status_item`]="{ item }">
                                <span v-for="item2 in detail_pesanan" :key="item2.id_detail_pesanan">
                                    <div v-if="item.id_pesanan == item2.id_pesanan">
                                        <v-btn v-if="item2.status_item != 'Served'" 
                                            class="ma-1"
                                            :style="item2.status_item == 'Preparing' ? {'background': '#ffa722 !important'} : {'background': '#31bb31 !important'}"
                                            style="color: white !important;"
                                            disabled>
                                            {{item2.status_item}}
                                        </v-btn>
                                        <v-btn v-else
                                            class="ma-1"
                                            style="background: #33529a !important; color: white !important;"
                                            disabled>
                                            {{item2.status_item}}
                                        </v-btn>
                                    </div>
                                </span>
                            </template>
                            <template v-slot:[`item.harga_item`]="{ item }">
                                <span v-for="item2 in detail_pesanan" :key="item2.id_detail_pesanan">
                                    <div v-if="item.id_pesanan == item2.id_pesanan">
                                        {{item2.harga_item == 0 ? 'Free' : 'Rp. ' + item2.harga_item.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + '.00'}}
                                    </div>
                                </span>
                            </template>
                            <template v-slot:[`item.id_meja`]="{ item }">
                                <span v-for="item2 in meja" :key="item2.id_meja">
                                    <div v-if="item.id_meja == item2.id_meja">
                                        No. {{item2.no_meja}}
                                    </div>
                                </span>
                            </template>
                            <template v-slot:[`item.id_reservasi`]="{ item }">
                                <span v-for="item2 in reservasi" :key="item2.id_reservasi">
                                    <div v-if="item.id_pesanan == item2.id_pesanan">
                                        {{item2.id_reservasi}}
                                    </div>
                                </span>
                            </template>
                            <template v-slot:[`item.id_karyawan`]="{ item }">
                                <span v-for="item2 in karyawan" :key="item2.id_karyawan">
                                    <div v-if="item.id_karyawan == item2.id_karyawan">
                                        {{item2.nama_karyawan}}
                                    </div>
                                </span>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon class="yellow--text mr-2 text--lighten-2" @click="editHandler(item)">mdi-pencil-circle-outline</v-icon>
                                <v-icon v-if="role == 'Operational Manager'" class="red--text ml-2" @click="deleteHandler(item.id_pesanan)">mdi-delete-circle-outline</v-icon>
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
                            <a href="https://www.youtube.com/channel/UCocn4CLqmjfQ88-IjVYwRxA/featured" alt="Youtube profile"><span class="fa fa-youtube" aria-hidden="true"></span></a>
                            <a href="https://www.facebook.com/nicky.jovanus/" alt="Facebook profile"><span class="fa fa-facebook" aria-hidden="true"></span></a>
                            <a href="https://github.com/NickyJovanus" alt="GitHub profile"><span class="fa fa-github" aria-hidden="true"></span></a>
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
                        <span class="headline">{{ inputType }} Pesanan</span>
                    </v-card-title>
                    <div style="margin: 30px;">
                        <v-form v-model="valid" ref="form">
                            <v-flex>
                                <v-menu
                                    ref="tanggal_menu"
                                    v-model="tanggal_menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="form.tanggal_pesanan"
                                    transition="slide-x-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="form.tanggal_pesanan"
                                        label="Tanggal Pesanan"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        outlined
                                        clearable
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="rules.tanggalRule"
                                        required
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="form.tanggal_pesanan"
                                        no-title
                                        scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn text color="red" @click="tanggal_menu = false"> Cancel </v-btn>
                                        <v-btn text color="primary" @click="$refs.tanggal_menu.save(form.tanggal_pesanan)"> OK </v-btn>
                                    </v-date-picker>
                                </v-menu>
                                <v-select
                                    v-model="form.id_meja"
                                    label="Nomor Meja"
                                    :items="meja"
                                    item-text="id_meja"
                                    outlined
                                    clearable
                                    three-line
                                    :rules="rules.mejaRule"
                                    required
                                    :value="form.id_meja"
                                >
                                    <template slot="selection" slot-scope="data">
                                        No. {{ data.item.no_meja }}
                                    </template>
                                    <template slot="item" slot-scope="data">
                                        No. {{ data.item.no_meja }}
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
                                    :rules="rules.karyawanRule"
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
                                <v-row v-for="(detail) in detailtext" 
                                    :key="detail.id">
                                    <v-col cols="5">
                                        <v-select
                                            v-model="detail.id_menu"
                                            outlined
                                            label="Nama Menu"
                                            :items="menus"
                                            item-text="id_menu"
                                            three-line
                                            :rules="rules.menuRule"
                                            required
                                        >
                                            <template slot="selection" slot-scope="data">
                                                {{ data.item.nama_menu }}
                                            </template>
                                            <template slot="item" slot-scope="data">
                                                {{ data.item.nama_menu }}
                                            </template>
                                        </v-select>
                                    </v-col>

                                    <v-col cols="2">
                                        <v-text-field
                                            v-model="detail.jumlah_item"
                                            outlined
                                            label="Jumlah Item"
                                            :rules="rules.jumlahRule"
                                            type="number"
                                            required
                                        >
                                        </v-text-field>
                                    </v-col>

                                    <v-col v-if="inputType == 'Edit'" cols="3">
                                        <v-select
                                            v-model="detail.status_item"
                                            outlined
                                            label="Status Item"
                                            :rules="rules.statusRule"
                                            :items="['Preparing', 'Ready to serve', 'Served']"
                                            required
                                        >
                                        </v-select>
                                    </v-col>
                                    <v-col cols="2">
                                        <v-btn color="red" @click="removeDetail(detail)">
                                            X
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-btn @click="addDetail">
                                    Add Item
                                </v-btn>
                            </v-flex>
                        </v-form>
                    </div>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="white darken-1" text @click="cancel">
                            Cancel
                        </v-btn>
                        <v-btn v-if="inputType == 'Add'" color="blue darken-1" text @click="add">
                            Save
                        </v-btn>
                        <v-btn v-if="inputType == 'Edit'" color="yellow darken-1" text @click="update">
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
                    Do you really want to delete this pesanan data?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white darken-1" text @click="cancel">
                        Cancel
                    </v-btn>
                    <v-btn color="red darken-1" text @click="deleteData"> 
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="5000" bottom style='z-index:10000;'>
            <v-flex class="text-right">
                <v-icon color="white" @click="snackbar = false;">mdi-close</v-icon>
            </v-flex>
            <pre style="overflow-y: hidden; text-align: center;">{{error_message}}</pre>
        </v-snackbar>
    </v-main>
</template>

<script>
import { EventBus } from './bus.js';

export default{
    name: "Pesanan",
    data() {
        return {
            role: '',
            headers: [
                { text: "ID", align: "start",       value: "id_pesanan"      },
                { text: "Detail Pesanan",           value: "detail_pesanan"  },
                { text: "Status",                   value: "status_item"     },
                { text: "Harga Item",               value: "harga_item"      },
                { text: "Total Menu",               value: "total_menu"      },
                { text: "Total Item",               value: "total_item"      },
                { text: "Tanggal Pesanan",          value: "tanggal_pesanan" },
                { text: "Nomor Meja",               value: "id_meja"         },
                { text: "ID Reservasi",             value: "id_reservasi"    },
                { text: "Nama Karyawan",            value: "id_karyawan"     },
                { text: "Actions", sortable: false, value: "actions"         },
            ],
            pesanan:         [],
            detail_pesanan:  [],
            menus:           [],
            meja:            [],
            karyawan:        [],
            reservasi:       [],
            inputType:    'Add',
            dialog:       false,
            dialogDelete: false,
            form: {
                tanggal_pesanan: '',
                id_meja:         '',
                id_karyawan:     '',
            },
            search:          '',
            editId:        null,
            editItem:      null,
            deleteId:      null,
            passwordId:    null,
            error_message:   '',
            color:           '',
            loading:      false,
            snackbar:     false,
            progressBar:  false,
            tanggal_menu: false,
            valid:        false,
            isRevert:     false,
            detailtext:      [],
            deleteIds:       [],
            revertUpdate:    [],
            textfield: {
                id:           0,
                id_detail:   '',
                id_menu:     '',
                jumlah_item: '',
                status_item: '',
            },
            rules: {
                tanggalRule:  [ (v) => !!v || 'Tanggal Pesanan field is required.', ],
                mejaRule:     [ (v) => !!v || 'Nomor Meja field is required.',      ],
                karyawanRule: [ (v) => !!v || 'Nama Karyawan field is required.',   ],
                menuRule:     [ (v) => !!v || 'Nama Menu field is required.',       ],
                jumlahRule:   [ (v) => !!v || 'Jumlah Item field is required.',     ],
                statusRule:   [ (v) => !!v || 'Status Item field is required.',     ],
            },
        }
    },
    mounted() {
        this.pesanan        = JSON.parse(localStorage.getItem('pesanan'));
        this.meja           = JSON.parse(localStorage.getItem('meja'));
        this.karyawan       = JSON.parse(localStorage.getItem('karyawan'));
        this.detail_pesanan = JSON.parse(localStorage.getItem('detailpesanan'));
        this.reservasi      = JSON.parse(localStorage.getItem('reservasi'));
        this.menus          = JSON.parse(localStorage.getItem('menu'));
        this.role           = localStorage.getItem('role');

        if(localStorage.getItem('pesanan') == null) {this.loadData();}

        EventBus.$on('load', data => {
            this.meja = JSON.parse(localStorage.getItem('meja'));
            this.loadData();
        });

        EventBus.$on('reservasi', data => {
            this.reservasi = JSON.parse(localStorage.getItem('reservasi'));
        });

        if (this.role == 'Owner')
            this.redirectDashboard();
    },
    methods: {
        redirectDashboard() {
            this.$router.push({
                path: '/dashboard',
            });
            this.collapsed = true;
        },
        loadData() {
            this.loading = true;

            var url = this.$api + '/pesanan';
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.pesanan = response.data.data;
                localStorage.setItem('pesanan', JSON.stringify(response.data.data));
                this.emitPesanan();
                this.loading = false;
            }).catch(()=> {
                this.loading = false;
            });

            this.$http.get(this.$api + '/detailpesanan', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.detail_pesanan = response.data.data;
                localStorage.setItem('detailpesanan', JSON.stringify(response.data.data));
            });

            this.$http.get(this.$api + '/menu', {
            }).then(response => {
                this.menus = response.data.data;
                localStorage.setItem('menu', JSON.stringify(response.data.data));
            });
        },
        
        editHandler(item) {
            this.inputType            = 'Edit';
            this.editId               = item.id_pesanan;
            this.editItem             = item;
            this.form.tanggal_pesanan = item.tanggal_pesanan;
            this.form.id_meja         = item.id_meja;
            this.form.id_karyawan     = item.id_karyawan;
            this.dialog               = true;

            let i = 0;
            for(; i<this.detail_pesanan.length; i++) {
                if(this.detail_pesanan[i].id_pesanan == item.id_pesanan) {     
                    let data = {
                        id:          this.textfield.id ++,
                        id_menu:     this.detail_pesanan[i].id_menu,
                        id_detail:   this.detail_pesanan[i].id_detail_pesanan,
                        status_item: this.detail_pesanan[i].status_item,
                        jumlah_item: this.detail_pesanan[i].jumlah_item,
                    }
                    this.detailtext.push(data);
                    this.revertUpdate.push(data);
                }
            }

        },

        deleteHandler(id) {
            this.deleteId     =   id;
            this.dialogDelete = true;
        },

        cancel() {
            this.dialogDelete = false;
            this.dialog       = false;
            this.inputType    = 'Add';
            this.isRevert     = false;
            this.resetForm();
        },

        resetForm() {
            this.form.tanggal_pesanan  = '';
            this.form.id_meja          = '';
            this.form.id_karyawan      = '';
            this.detailtext            = [];
            this.deleteIds             = [];
            this.revertUpdate          = [];
            this.textfield.id          =  0;
            this.textfield.id_detail   =  0;
            this.textfield.id_menu     = '';
            this.textfield.jumlah_item = '';
            this.$refs.form.reset()
        },

        add() {
            if (this.$refs.form.validate()) {
                var idPesanan = null;
                this.progressBar = true;
                let addData = {
                    tanggal_pesanan: this.form.tanggal_pesanan,
                    id_meja:         this.form.id_meja,
                    id_karyawan:     this.form.id_karyawan,
                }

                var url   = this.$api + '/pesanan'
                var url2  = this.$api + '/detailpesanan'
                
                this.$http.post(url, addData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(response => {

                    idPesanan = response.data.data.id_pesanan;
                    if(this.detailtext.length > 0) {

                        let i = 0;
                        for(; i < this.detailtext.length; i++) {

                            let detail = this.detailtext[i];
                            let detailData = {
                                id_pesanan:  idPesanan,
                                id_menu:     detail.id_menu,
                                jumlah_item: detail.jumlah_item,
                            }

                            this.$http.post(url2, detailData, {
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                }
                            }).then(() => {
                                this.error_message =      '';
                                this.error_message = 'Add Pesanan Success';
                                this.color         = "green";
                                this.snackbar      =    true;
                                this.progressBar   =   false;
                                this.cancel();
                                this.loadData();
                            }).catch(err => {
                                
                                this.error_message = '';

                                if(!err.response.data.message.id_menu 
                                && !err.response.data.message.jumlah_item
                                && !err.response.data.message.id_pesanan) {
                                    this.error_message= err.response.data.message;
                                } else {
                                    if(err.response.data.message.id_menu) 
                                        this.error_message= this.error_message + err.response.data.message.id_menu;
                                    if(err.response.data.message == "Jumlah item exceeds available stock") 
                                        this.error_message= this.error_message + '\n' + err.response.data.message.jumlah_item;
                                    if(err.response.data.message.jumlah_item) 
                                        this.error_message= this.error_message + '\n' + err.response.data.message.jumlah_item;
                                    if(err.response.data.message.id_pesanan) 
                                        this.error_message= this.error_message + '\n' + err.response.data.message.id_pesanan;
                                }
                                
                                var url3 = this.$api + '/pesanan/cancel/' + idPesanan;
                                this.$http.delete(url3, {
                                    headers: {
                                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                                    }
                                }).then(() => {

                                    this.progressBar   = false;
                                    this.loadData();

                                }).catch(err => {

                                    this.error_message = err.response.data.message;
                                    this.color         = "red";
                                    this.snackbar      =  true;
                                    this.progressBar   = false;

                                });

                                this.color       = "red";
                                this.snackbar    =  true;
                                this.progressBar = false;

                            });
                    }
                } else {

                    this.error_message = response.data.message;
                    this.color         = "green";
                    this.snackbar      =    true;
                    this.progressBar   =   false;
                    this.cancel();
                    this.loadData();

                }
                }).catch(err => {
                    this.error_message = '';

                    if(!err.response.data.message.tanggal_pesanan 
                        && !err.response.data.message.id_meja 
                        && !err.response.data.message.id_karyawan)
                        this.error_message= err.response.data.message;
                    else {
                        if(err.response.data.message.tanggal_pesanan)
                            this.error_message= err.response.data.message.tanggal_pesanan;
                        if(err.response.data.message.id_meja)
                            this.error_message= this.error_message + '\n' + err.response.data.message.id_meja;
                        if(err.response.data.message.id_karyawan)
                            this.error_message= this.error_message + '\n' + err.response.data.message.id_karyawan;
                    }

                    this.color       = "red";
                    this.snackbar    =  true;
                    this.progressBar = false;
                });
                
            }
        },

        update() {
            this.progressBar = true;
            var url  = this.$api + '/pesanan/' + this.editId, url2, urldel;

            try {
                let index = 0;
                for(; index < this.detailtext.length; index++) {
                    let currentDetail = this.detailtext[index];
                    let updateDetailData = {
                        id_pesanan:  this.editId,
                        id_menu:     currentDetail.id_menu,
                        status_item: currentDetail.status_item,
                        jumlah_item: currentDetail.jumlah_item,
                    }

                    url2 = this.$api + '/detailpesanan/' + currentDetail.id_detail;
                    this.$http.put(url2, updateDetailData, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(() => {
                        
                    }).catch(err => {

                        this.error_message = '';
                        if(err.response.data.message === 'Detail Pesanan Not Found') {

                            let postDetailData = {
                                id_pesanan:  this.editId,
                                id_menu:     currentDetail.id_menu,
                                jumlah_item: currentDetail.jumlah_item,
                            }
                            
                            this.$http.post(this.$api + '/detailpesanan', postDetailData, {
                                headers: {
                                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                                }
                            }).then(response => {
                                
                                this.$http.put(this.$api + '/detailpesanan/' + response.data.data.id_detail_pesanan, updateDetailData, {
                                    headers: {
                                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                                    }
                                }).then(() => {
                                    this.loadData();
                                });

                            });

                        } else if(!err.response.data.message.id_menu 
                            && !err.response.data.message.jumlah_item
                            && !err.response.data.message.id_pesanan) {

                            this.error_message = err.response.data.message;
                            this.isRevert      =  true;
                            this.color         = "red";
                            this.snackbar      =  true;
                            this.progressBar   = false;

                        } else {

                            if(err.response.data.message.id_menu) 
                                this.error_message = this.error_message + err.response.data.message.id_menu;
                            if(err.response.data.message == "Jumlah item exceeds available stock") 
                                this.error_message = this.error_message + '\n' + err.response.data.message.jumlah_item;
                            if(err.response.data.message.jumlah_item) 
                                this.error_message = this.error_message + '\n' + err.response.data.message.jumlah_item;
                            if(err.response.data.message.id_pesanan) 
                                this.error_message = this.error_message + '\n' + err.response.data.message.id_pesanan;
                            this.isRevert    =  true;
                            this.color       = "red";
                            this.snackbar    =  true;
                            this.progressBar = false;

                        }
                    });
                }

            } finally {

                try {

                    setTimeout(()=>{
                        if(!this.isRevert) {
                            for(var index =  0; index < this.deleteIds.length; index++) {
                                urldel = this.$api + '/detailpesanan/' + this.deleteIds[index];
                                this.$http.delete(urldel, {
                                    headers: {
                                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                                    }
                                });
                            }
                        }
                    }, 500);

                } finally {
                    var tempArray = this.revertUpdate;

                    setTimeout(()=>{
                        console.log(this.isRevert)
                        if(this.isRevert == false) {

                            let updateData = {
                                tanggal_pesanan: this.form.tanggal_pesanan,
                                id_meja:         this.form.id_meja,
                                id_karyawan:     this.form.id_karyawan,
                            }
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
                                if(!err.response.data.message.tanggal_pesanan 
                                    && !err.response.data.message.id_meja 
                                    && !err.response.data.message.id_karyawan)
                                    this.error_message= err.response.data.message;
                                else {
                                    if(err.response.data.message.tanggal_pesanan)
                                        this.error_message= err.response.data.message.tanggal_pesanan;
                                    if(err.response.data.message.id_meja)
                                        this.error_message= this.error_message + '\n' + err.response.data.message.id_meja;
                                    if(err.response.data.message.id_karyawan)
                                        this.error_message= this.error_message + '\n' + err.response.data.message.id_karyawan;
                                }
                                this.color       = "red";
                                this.snackbar    =  true;
                                this.progressBar = false;
                            });

                        } else {

                            for(var x =  0; x < this.revertUpdate.length; x++) {

                                let currentRev = this.revertUpdate[x];
                                
                                var urlrev = this.$api + '/detailpesanan/' + this.revertUpdate[x].id_detail;
                                let updateDetailData = {
                                    id_pesanan:  this.editId,
                                    id_menu:     tempArray[x].id_menu,
                                    status_item: tempArray[x].status_item,
                                    jumlah_item: tempArray[x].jumlah_item,
                                };

                                this.$http.put(urlrev, updateDetailData, {
                                    headers: {
                                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                                    }
                                }).then(() => {

                                    this.loadData();
                                    this.cancel();

                                }).catch(() => {

                                    this.$http.post(this.$api + '/detailpesanan', updateDetailData, {
                                        headers: {
                                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                                        }
                                    }).then(response => {
                                        
                                        this.$http.put(this.$api + '/detailpesanan/' + response.data.data.id_detail_pesanan, updateDetailData, {
                                            headers: {
                                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                                            }
                                        }).then(() => {

                                            this.loadData();

                                        });
                                    }).catch(() => {});
                                });
                            }

                        }

                    }, 4000);
                }

            }
            
        },

        deleteData() {
            this.progressBar = true;

            var url = this.$api + '/pesanan/' + this.deleteId;
            this.$http.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message= response.data.message;
                this.color="green"
                this.snackbar=true;
                this.cancel();
                this.loadData();
                this.progressBar = false;
            }).catch(err => {
                this.error_message= err.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.progressBar = false;
            });

        },

        addDetail() {
            this.detailtext.push({
                id: this.textfield.id ++,
                id_menu: '',
                jumlah_item: '',
            });
        },

        removeDetail(item) {
            if(this.inputType == 'Edit') 
                this.deleteIds.push(item.id_detail);
            
            this.detailtext.splice(this.detailtext.indexOf(item), 1);
        },

        emitPesanan() {
            EventBus.$emit('pesanan', null);
        }

    },
}
</script>