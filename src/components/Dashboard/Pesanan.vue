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
                            <template v-slot:[`meja.id_meja`]="{ meja }"  :dataSource='meja' foreignKeyValue='id_meja'>
                                {{meja.no_meja}}
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
                        <span class="headline">{{ inputType }} Meja</span>
                    </v-card-title>
                    <div style="margin: 30px;">
                        <v-flex>
                            <v-select
                                v-model="form.no_meja"
                                label="Nomor Meja"
                                :items="meja.no_meja"
                                item-text="name"
                                outlined
                                three-line
                                :value="form.no_meja"
                            ></v-select>
                            <v-select
                                v-model="form.nama_karyawan"
                                label="Nama Karyawan"
                                :items="karyawan.nama_karyawan"
                                item-text="name"
                                outlined
                                three-line
                                :value="form.nama_karyawan"
                            ></v-select>
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
                    Do you really want to delete this pesanan?
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

        <v-snackbar v-model="snackbar" :color="color" timeout="3000" bottom>
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
                { text: "Total Menu", value: "total_menu" },
                { text: "Total Item", value: "total_item" },
                { text: "Tanggal Pesanan", value: "tanggal_pesanan" },
                { text: "Nomor Meja", value: "id_meja" },
                { text: "Nama Karyawan", value: "nama_karyawan" },
                { text: "Actions",
                    sortable: false,
                    value: "actions" },
            ],
            pesanan: [],
            meja: [],
            karyawan: [],
            inputType: 'Add',
            dialog: false,
            dialogConfirm: false,
            form: {
                tanggal_pesanan: '',
                no_meja: '',
                nama_karyawan: '',
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
        }
    },
    mounted() {
        this.pesanan = JSON.parse(localStorage.getItem('pesanan'));
        this.meja = JSON.parse(localStorage.getItem('meja'));
        this.karyawan = JSON.parse(localStorage.getItem('karyawan'));
        this.role = localStorage.getItem('role');
        EventBus.$on('load', data => {
            this.meja = JSON.parse(localStorage.getItem('meja'));
        });
        // this.loadData();
    },
    methods: {
        redirectDashboard() {
            this.$router.push({
                path: '/dashboard',
            });
            this.collapsed = true;
        },
        loadData() {
            var url = this.$api + '/pesanan';
            this.loading = true;

            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.pesanan = response.data.data;
                localStorage.setItem('pesanan', JSON.stringify(response.data.data));
                this.emitKetersediaan();
                this.loading = false;
            }).catch(()=> {
                this.loading = false;
            });
        },
        editHandler(item) {
            this.inputType = 'Edit';
            this.editId = item.id_pesanan;
            this.form.nomor_pesanan = item.no_pesanan;
            this.form.status_pesanan = item.status_pesanan;
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
            this.form.no_meja = '';
            this.form.nama_karyawan = '';
        },
        add() {
            this.progressBar = true;
            let addData = {
                tanggal_pesanan: this.form.tanggal_pesanan,
                no_meja: this.form.no_meja,
                nama_karyawan: this.form.nama_karyawan,
            }

            var url = this.$api + '/pesanan'
            this.$http.post(url, addData, {
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
                if(err.response.data.message.no_pesanan)
                    this.error_message= err.response.data.message.no_pesanan;
                if(err.response.data.message.status_pesanan)
                    this.error_message= this.error_message + '\n' + err.response.data.message.status_pesanan;
                if(!err.response.data.message.no_pesanan && !err.response.data.message.status_pesanan)
                    this.error_message= err.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.progressBar = false;
            });
        },
        update() {
            this.progressBar = true;
            let updateData = {
                no_pesanan: this.form.nomor_pesanan,
                status_pesanan: this.form.status_pesanan,
            }

            var url = this.$api + '/pesanan/' + this.editId;
            this.$http.put(url, updateData, {
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
                if(err.response.data.message.no_pesanan)
                    this.error_message= err.response.data.message.no_pesanan;
                if(err.response.data.message.status_pesanan)
                    this.error_message= this.error_message + '\n' + err.response.data.message.status_pesanan;
                if(!err.response.data.message.no_pesanan && !err.response.data.message.status_pesanan)
                    this.error_message= err.response.data.message;
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
    }
}
</script>