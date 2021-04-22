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
                                <div v-for="item2 in detail_pesanan" :key="item2.id_detail_pesanan">
                                    <div v-if="item.id_pesanan == item2.id_pesanan">
                                        <div v-for="item3 in menus" :key="item3.id_menu">
                                            <div v-if="item2.id_menu == item3.id_menu">
                                                - {{item3.nama_menu}} x{{item2.jumlah_item}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-slot:[`item.status_item`]="{ item }">
                                <div v-for="item2 in detail_pesanan" :key="item2.id_detail_pesanan">
                                    <div v-if="item.id_pesanan == item2.id_pesanan">
                                        [{{item2.status_item}}]
                                    </div>
                                </div>
                            </template>
                            <template v-slot:[`item.harga_item`]="{ item }">
                                <div v-for="item2 in detail_pesanan" :key="item2.id_detail_pesanan">
                                    <div v-if="item.id_pesanan == item2.id_pesanan">
                                        Rp. {{item2.harga_item.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00
                                    </div>
                                </div>
                            </template>
                            <template v-slot:[`item.id_meja`]="{ item }">
                                <div v-for="item2 in meja" :key="item2.id_meja">
                                    <div v-if="item.id_meja == item2.id_meja">
                                        No. {{item2.no_meja}}
                                    </div>
                                </div>
                            </template>
                            <template v-slot:[`item.id_karyawan`]="{ item }">
                                <div v-for="item2 in karyawan" :key="item2.id_karyawan">
                                    <div v-if="item.id_karyawan == item2.id_karyawan">
                                        {{item2.nama_karyawan}}
                                    </div>
                                </div>
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
            <v-dialog v-model="dialog" persistent max-width="600px" mt-10 style='z-index:9999;'>
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
                                    ref="menu"
                                    v-model="menu"
                                    :close-on-content-click="false"
                                    :return-value.sync="date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="date"
                                        label="Tanggal Pesanan"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        outlined
                                        v-bind="attrs"
                                        v-on="on"
                                        :rules="rules.tanggalRule"
                                        required
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="date"
                                        no-title
                                        scrollable
                                    >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="menu = false"
                                    >
                                        Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu.save(date)"
                                    >
                                        OK
                                    </v-btn>
                                    </v-date-picker>
                                </v-menu>
                                <v-select
                                    v-model="form.id_meja"
                                    label="Nomor Meja"
                                    :items="meja"
                                    item-text="id_meja"
                                    outlined
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
                                    <v-col>
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

                                    <v-col>
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
                                    <v-col>
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

        
        
        <v-dialog v-model="dialogConfirm" persistent max-width="600px" style='z-index:9999;'>
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

        <v-snackbar v-model="snackbar" :color="color" timeout="3000" bottom style='z-index:10000;'>
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
                { text: "ID",
                    align: "start",
                    sortable: true,
                    value: "id_pesanan" },
                { text: "Detail Pesanan", value: "detail_pesanan" },
                { text: "Status", value: "status_item" },
                { text: "Harga Item", value: "harga_item" },
                { text: "Total Menu", value: "total_menu" },
                { text: "Total Item", value: "total_item" },
                { text: "Tanggal Pesanan", value: "tanggal_pesanan" },
                { text: "Nomor Meja", value: "id_meja" },
                { text: "Nama Karyawan", value: "id_karyawan" },
                { text: "Actions",
                    sortable: false,
                    value: "actions" },
            ],
            pesanan: [],
            detail_pesanan: [],
            menus: [],
            meja: [],
            karyawan: [],
            inputType: 'Add',
            dialog: false,
            dialogConfirm: false,
            form: {
                tanggal_pesanan: '',
                id_meja: '',
                id_karyawan: '',
            },
            status: [
                {name: 'Empty'},
                {name: 'In-use'}
            ],
            loading: false,
            search: '',
            editId: null,
            error_message: '',
            snackbar: false,
            color: '',
            deleteId: null,
            passwordId: null,
            progressBar: false,
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            detailtext: [],
            textfield: {
                id: 0,
                id_menu: '',
                jumlah_item: '',
            },
            rules: {
                tanggalRule: [
                    (v) => !!v || 'Tanggal Pesanan field is required.',
                ],
                mejaRule: [
                    (v) => !!v || 'Nomor Meja field is required.',
                ],
                karyawanRule: [
                    (v) => !!v || 'Nama Karyawan field is required.',
                ],
                menuRule: [
                    (v) => !!v || 'Nama Menu field is required.',
                ],
                jumlahRule: [
                    (v) => !!v || 'Jumlah Item field is required.',
                ],
            },
            valid: false,
        }
    },
    mounted() {
        this.pesanan = JSON.parse(localStorage.getItem('pesanan'));
        this.meja = JSON.parse(localStorage.getItem('meja'));
        this.karyawan = JSON.parse(localStorage.getItem('karyawan'));
        this.role = localStorage.getItem('role');
        this.detail_pesanan = JSON.parse(localStorage.getItem('detailpesanan'));
        this.menus = JSON.parse(localStorage.getItem('menu'));

        if(localStorage.getItem('pesanan') == null) {this.loadData();}

        EventBus.$on('load', data => {
            this.meja = JSON.parse(localStorage.getItem('meja'));
        });
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
            this.inputType = 'Edit';
            this.editId = item.id_pesanan;
            this.date = item.tanggal_pesanan;
            this.form.id_meja = item.id_meja;
            this.form.id_karyawan = item.id_karyawan;
            this.dialog = true;
        },
        deleteHandler(id) {
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        cancel() {
            this.dialogConfirm = false;
            this.dialog = false;
            this.resetForm();
            this.inputType = 'Add';
        },
        resetForm() {
            this.form.tanggal_pesanan = '';
            this.form.id_meja = '';
            this.form.id_karyawan = '';
            this.detailtext = [];
            this.textfield.id = 0;
            this.textfield.id_menu = '';
            this.textfield.jumlah_item = '';
        },
        add() {
            if (this.$refs.form.validate()) {
                let pesananmade = 0;
                let id_pesanan = null;
                this.progressBar = true;
                let addData = {
                    tanggal_pesanan: this.date,
                    id_meja: this.form.id_meja,
                    id_karyawan: this.form.id_karyawan,
                }
                
                if(this.detailtext.length > 0) {
                    let i = 0;
                    for(i = 0; i<=this.detailtext.length; i++) {
                        let detailData = {
                            id_pesanan: id_pesanan,
                            id_menu: this.detailtext[i].id_menu,
                            jumlah_item: this.detailtext[i].jumlah_item,
                        }

                        var url = this.$api + '/detailpesanan'
                        this.$http.post(url, detailData, {
                            headers: {
                                'Authorization': 'Bearer ' + localStorage.getItem('token')
                            }
                        }).then(() => {
                            this.progressBar = false;
                            this.loadData();
                            this.cancel();
                        }).catch(err => {
                            this.error_message = '';
                            if(!err.response.data.message.id_pesanan && !err.response.data.message.jumlah_item)
                                this.error_message= err.response.data.message;
                            else {
                                if(err.response.data.message.id_menu) {
                                    this.error_message= this.error_message + err.response.data.message.id_menu;
                                    this.color="red"
                                    this.snackbar=true;
                                    this.progressBar = false;
                                    return;
                                }
                                if(err.response.data.message == "Jumlah item exceeds available stock") {
                                    this.error_message= this.error_message + '\n' + err.response.data.message.jumlah_item;
                                    this.color="red"
                                    this.snackbar=true;
                                    this.progressBar = false;
                                    return;
                                }
                                if(err.response.data.message.jumlah_item) {
                                    this.error_message= this.error_message + '\n' + err.response.data.message.jumlah_item;
                                    this.color="red"
                                    this.snackbar=true;
                                    this.progressBar = false;
                                    return;
                                }
                                else if(err.response.data.message.id_pesanan && pesananmade == 0) {
                                    i-=1;
                                    
                                    var url2 = this.$api + '/pesanan'
                                    this.$http.post(url2, addData, {
                                        headers: {
                                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                                        }
                                    }).then(response => {
                                        this.error_message = '';
                                        this.error_message= response.data.message;
                                        id_pesanan = response.data.data.id_pesanan;
                                        this.color="green"
                                        this.snackbar=true;
                                        this.loadData();
                                        pesananmade = 1;
                                    }).catch(err => {
                                        this.error_message = '';
                                        if(!err.response.data.message.no_pesanan && !err.response.data.message.status_pesanan)
                                            this.error_message= err.response.data.message;
                                        else {
                                            if(err.response.data.message.no_pesanan)
                                                this.error_message= err.response.data.message.no_pesanan;
                                            if(err.response.data.message.status_pesanan)
                                                this.error_message= this.error_message + '\n' + err.response.data.message.status_pesanan;
                                        }
                                        this.color="red"
                                        this.snackbar=true;
                                        this.progressBar = false;
                                    });

                                } else if(err.response.data.message.id_pesanan) {
                                    this.error_message= this.error_message + '\n' + err.response.data.message.id_pesanan;
                                    this.color="red"
                                    this.snackbar=true;
                                    this.progressBar = false;
                                    return;
                                }
                            }
                        });
                    }
                } else {
                    var url3 = this.$api + '/pesanan'
                    this.$http.post(url3, addData, {
                        headers: {
                            'Authorization': 'Bearer ' + localStorage.getItem('token')
                        }
                    }).then(response => {
                        this.error_message = '';
                        this.error_message= response.data.message;
                        id_pesanan = response.data.data.id_pesanan;
                        this.color="green"
                        this.snackbar=true;
                        this.cancel();
                        this.loadData();
                        pesananmade = 1;
                    }).catch(err => {
                        this.error_message = '';
                        if(!err.response.data.message.no_pesanan && !err.response.data.message.status_pesanan)
                            this.error_message= err.response.data.message;
                        else {
                            if(err.response.data.message.no_pesanan)
                                this.error_message= err.response.data.message.no_pesanan;
                            if(err.response.data.message.status_pesanan)
                                this.error_message= this.error_message + '\n' + err.response.data.message.status_pesanan;
                        }
                        this.color="red"
                        this.snackbar=true;
                        this.progressBar = false;
                    });
                }
            }
        },
        update() {
            this.progressBar = true;
            let updateData = {
                tanggal_pesanan: this.date,
                id_meja: this.form.id_meja,
                id_karyawan: this.form.id_karyawan,
            }

            var url = this.$api + '/pesanan/' + this.editId;
            this.$http.put(url, updateData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = '';
                this.error_message= response.data.message;
                this.color="green"
                this.snackbar=true;
                this.cancel();
                this.loadData();
                this.progressBar = false;
            }).catch(err => {
                this.error_message = '';
                if(!err.response.data.message.no_pesanan && !err.response.data.message.status_pesanan)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.no_pesanan)
                        this.error_message= err.response.data.message.no_pesanan;
                    if(err.response.data.message.status_pesanan)
                        this.error_message= this.error_message + '\n' + err.response.data.message.status_pesanan;
                }
                this.color="red"
                this.snackbar=true;
                this.progressBar = false;
            });
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
                // this.error_message='This pesanan is currently under reservation.'
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
            console.log(this.detailtext[0].id_menu);
        },
        removeDetail(item) {
            this.detailtext.splice(this.detailtext.indexOf(item), 1);
        }
    },
}
</script>