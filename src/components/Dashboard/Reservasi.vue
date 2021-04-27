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
                <h2>Reservasi Management</h2>
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
                            :items="reservasi"
                            :loading="loading"
                            :search="search">
                            <v-progress-linear v-show="loading" slot="progress" color="red" indeterminate></v-progress-linear>
                            <template v-slot:[`item.id_meja`]="{ item }">
                                <div v-for="item2 in meja" :key="item2.id_meja">
                                    <div v-if="item.id_meja == item2.id_meja">
                                        No. {{item2.no_meja}}
                                    </div>
                                </div>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon class="yellow--text mr-2 text--lighten-2" @click="editHandler(item)">mdi-pencil-circle-outline</v-icon>
                                <v-icon class="red--text ml-2" @click="deleteHandler(item.id_reservasi)">mdi-delete-circle-outline</v-icon>
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
                        <span class="headline">{{ inputType }} Reservasi</span>
                    </v-card-title>
                    <div style="margin: 30px;">
                        <v-flex>
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="form.sesi_reservasi"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="form.sesi_reservasi"
                                    label="Sesi Reservasi"
                                    prepend-icon="mdi-clock"
                                    readonly
                                    outlined
                                    v-bind="attrs"
                                    v-on="on"
                                    required
                                ></v-text-field>
                                </template>
                                <v-time-picker
                                    label="Sesi Reservasi"
                                    v-model="form.sesi_reservasi"
                                    type="time" 
                                    min="11:00:00"
                                    max="21:00:00"
                                    format="24hr"
                                    use-seconds
                                    outlined
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="menu = false"
                                    > Cancel
                                    </v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.menu.save(form.sesi_reservasi)"
                                    > OK
                                    </v-btn>
                                </v-time-picker>
                            </v-menu>
                            
                            <v-select
                                v-model="form.id_pesanan"
                                label="ID Pesanan"
                                :items="pesanan"
                                item-text="id_pesanan"
                                outlined
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

                            <v-select
                                v-model="form.id_meja"
                                label="Nomor Meja"
                                :items="meja"
                                item-text="id_meja"
                                outlined
                                three-line
                                disabled
                                :value="form.id_meja"
                            >
                                <template slot="selection" slot-scope="data">
                                    No. {{ data.item.id_meja }}
                                </template>
                                <template slot="item" slot-scope="data">
                                    No. {{ data.item.id_meja }}
                                </template>
                            </v-select>

                            <v-text-field
                                v-model="form.tanggal_reservasi"
                                label="Tanggal Reservasi"
                                outlined
                                :value="form.tanggal_reservasi"
                                disabled
                            ></v-text-field>
                            
                            <v-select
                                v-model="form.id_customer"
                                label="Nama Customer"
                                :items="customer"
                                item-text="id_customer"
                                outlined
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
                        </v-flex>
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
                    Do you really want to delete this reservasi?
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
    name: "Reservasi",
    
    data() {
        return {
            role: '',
            headers: [
                { text: "ID", align: "start",       value: "id_reservasi" },
                { text: "Tanggal Reservasi",        value: "tanggal_reservasi" },
                { text: "Sesi Reservasi",           value: "sesi_reservasi" },
                { text: "Nomor Meja",               value: "id_meja" },
                { text: "ID Pesanan",               value: "id_pesanan" },
                { text: "Actions", sortable: false, value: "actions" },
            ],
            reservasi:       [],
            pesanan:         [],
            meja:            [],
            customer:        [],
            inputType:    'Add',
            dialog:       false,
            dialogDelete: false,
            form: {
                sesi_reservasi:     '',
                tanggal_reservasi:  '',
                id_pesanan:         '',
                id_meja:            '',
                id_customer:        '',
            },
            menu:         false,
            loading:      false,
            search:          '',
            editId:        null,
            error_message:   '',
            snackbar:     false,
            color:           '',
            deleteId:      null,
            passwordId:    null,
            progressBar:  false,
        }
    },

    mounted() {
        this.reservasi = JSON.parse(localStorage.getItem('reservasi'));
        this.pesanan   = JSON.parse(localStorage.getItem('pesanan'));
        this.customer  = JSON.parse(localStorage.getItem('customer'));
        this.meja      = JSON.parse(localStorage.getItem('meja'));
        this.role      = localStorage.getItem('role');

        if(localStorage.getItem('reservasi') == null) {this.loadData();}
        
        EventBus.$on('pesanan', () => {
            this.pesanan = JSON.parse(localStorage.getItem('pesanan'));
            this.loadData();
        });
        
        EventBus.$on('customer', () => {
            this.customer = JSON.parse(localStorage.getItem('customer'));
            this.loadData();
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
            var url = this.$api + '/reservasi';
            this.loading = true;

            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.reservasi = response.data.data;
                localStorage.setItem('reservasi', JSON.stringify(response.data.data));
                this.loading = false;
            }).catch(()=> {
                this.loading = false;
            });
        },

        editHandler(item) {
            this.inputType = 'Edit';
            this.editId                 = item.id_reservasi;
            this.form.sesi_reservasi    = item.sesi_reservasi;
            this.form.tanggal_reservasi = item.tanggal_reservasi;
            this.form.id_pesanan        = item.id_pesanan;
            this.form.id_meja           = item.id_meja;
            this.form.id_customer       = item.id_customer;
            this.dialog = true;
        },

        deleteHandler(id) {
            this.deleteId = id;
            this.dialogDelete = true;
        },

        cancel() {
            this.dialogDelete = false;
            this.dialog = false;
            this.resetForm();
            this.inputType = 'Add';
        },

        resetForm() {
            //reset dialog form
            this.form.sesi_reservasi    = '';
            this.form.tanggal_reservasi = '';
            this.form.id_pesanan        = '';
            this.form.id_meja           = '';
            this.form.id_customer       = '';
        },

        fillForm(id) {
            //loop index array
            let index= 0;
            for(; index<this.pesanan.length; index++) {
                //match id
                if(id === this.pesanan[index].id_pesanan) {
                    this.form.tanggal_reservasi = this.pesanan[index].tanggal_pesanan;
                    this.form.id_meja = this.pesanan[index].id_meja;
                }
            }
        },

        add() {
            this.progressBar = true;
            let addData = {
                sesi_reservasi:    this.form.sesi_reservasi,
                tanggal_reservasi: this.form.tanggal_reservasi,
                id_pesanan:        this.form.id_pesanan,
                id_meja:           this.form.id_meja,
                id_customer:       this.form.id_customer,
            }

            var url = this.$api + '/reservasi'
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
                if(!err.response.data.message.no_reservasi 
                && !err.response.data.message.status_reservasi
                && !err.response.data.message.tanggal_reservasi
                && !err.response.data.message.id_pesanan
                && !err.response.data.message.id_meja
                && !err.response.data.message.id_customer)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.sesi_reservasi)
                        this.error_message= err.response.data.message.sesi_reservasi + "";
                    if(err.response.data.message.tanggal_reservasi)
                        this.error_message= this.error_message + '\n' + err.response.data.message.tanggal_reservasi;
                    if(err.response.data.message.id_pesanan)
                        this.error_message= this.error_message + '\n' + err.response.data.message.id_pesanan;
                    if(err.response.data.message.id_meja)
                        this.error_message= this.error_message + '\n' + err.response.data.message.id_meja;
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
                sesi_reservasi:    this.form.sesi_reservasi,
                tanggal_reservasi: this.form.tanggal_reservasi,
                id_pesanan:        this.form.id_pesanan,
                id_meja:           this.form.id_meja,
                id_customer:       this.form.id_customer,
            }

            var url = this.$api + '/reservasi/' + this.editId;
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
                if(!err.response.data.message.no_reservasi 
                && !err.response.data.message.status_reservasi
                && !err.response.data.message.tanggal_reservasi
                && !err.response.data.message.id_pesanan
                && !err.response.data.message.id_meja
                && !err.response.data.message.id_customer)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.sesi_reservasi)
                        this.error_message= err.response.data.message.sesi_reservasi + "";
                    if(err.response.data.message.tanggal_reservasi)
                        this.error_message= this.error_message + '\n' + err.response.data.message.tanggal_reservasi;
                    if(err.response.data.message.id_pesanan)
                        this.error_message= this.error_message + '\n' + err.response.data.message.id_pesanan;
                    if(err.response.data.message.id_meja)
                        this.error_message= this.error_message + '\n' + err.response.data.message.id_meja;
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

            var url = this.$api + '/reservasi/' + this.deleteId;
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

        emitPesanan() {
            EventBus.$emit('reservasi', 'extra data');
        }
    },
}

</script>