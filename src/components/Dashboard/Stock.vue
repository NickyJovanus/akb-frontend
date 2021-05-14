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
                <h2>Stock Management</h2>
            </div>
            <div class="mt-5 table-section">
                <v-card class="ma-6">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
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
                            <template v-slot:[`item.status_stok`]="{ item }">
                                <v-icon v-if="item.status_stok == 'Empty'" class="green--text text--lighten-2">mdi-checkbox-marked-circle-outline</v-icon>
                                <v-icon v-else class="red--text text--lighten-2">mdi-close-circle-outline</v-icon>
                                {{item.status_stok}}
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon class="yellow--text mr-2 text--lighten-2" @click="editHandler(item)">mdi-pencil-circle-outline</v-icon>
                                <v-icon v-if="role == 'Operational Manager'" class="red--text ml-2" @click="deleteHandler(item.id_stok)">mdi-delete-circle-outline</v-icon>
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
                            <v-text-field
                                label="Nomor Stok"
                                v-model="form.nomor_stok"
                                type="number"
                                outlined
                                clearable
                            ></v-text-field>
                            
                            <v-select
                                v-model="form.status_stok"
                                label="Status Stok"
                                :items="status"
                                item-text="name"
                                outlined
                                three-line
                                clearable
                                :value="form.status_stok"
                            ></v-select>
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

        <!-- snackbar -->
        <v-snackbar v-model="snackbar" v-bind:color="color" timeout="10000" bottom style='z-index:10000;'>
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
                { text: "Nama Bahan",               value: "id_bahan"      },
                { text: "Stok Masuk",               value: "stok_masuk"    },
                { text: "Stok Tersisa",             value: "stok_tersisa"  },
                { text: "Stok Terbuang",            value: "stok_terbuang" },
                { text: "Unit Stok",                value: "unit_stok"     },
                { text: "Tanggal Stok",             value: "tanggal_stok"  },
                { text: "Nama Karyawan",            value: "nama_karyawan" },
                { text: "Actions", sortable: false, value: "actions"       },
            ],
            stok:            [],
            bahan:           [],
            karyawan:        [],
            inputType:    'Add',
            dialog:       false,
            dialogDelete: false,
            form: {
                nomor_stok:  '',
                status_stok: '',
            },
            status: [
                {name: 'Empty'},
                {name: 'In-use'}
            ],
            editId:       null,
            deleteId:     null,
            passwordId:   null,
            search:         '',
            error_message:  '',
            color:          '',
            snackbar:    false,
            progressBar: false,
            loading:     false,
        }
    },
    mounted() {
        this.stok     = JSON.parse(localStorage.getItem('stok'));
        this.bahan    = JSON.parse(localStorage.getItem('bahan'));
        this.karyawan = JSON.parse(localStorage.getItem('karyawan'));
        this.role = localStorage.getItem('role');

        if(localStorage.getItem('stok') == null) {this.loadData();}

        if (this.role != 'Operational Manager' && this.role != 'Cashier' && this.role != 'Waiter')
            this.redirectDashboard();
        
        this.appendAttr();
    },
    methods: {
        redirectDashboard() {
            this.$router.push({
                path: '/dashboard',
            });
            this.collapsed = true;
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
                this.emitKetersediaan();
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            });
        },

        editHandler(item) {
            this.inputType = 'Edit';
            this.editId           = item.id_stok;
            this.form.nomor_stok  = item.no_stok;
            this.form.status_stok = item.status_stok;
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
            this.form.nomor_stok  = '';
            this.form.status_stok = '';
        },

        add() {
            this.progressBar = true;
            let addData = {
                no_stok:     this.form.nomor_stok,
                status_stok: this.form.status_stok,
            }

            var url = this.$api + '/stok'
            this.$http.post(url, addData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = '';
                this.error_message = response.data.message;
                this.color = "green"
                this.snackbar = true;
                this.progressBar = false;
                this.cancel();
                this.loadData();
            }).catch(err => {
                this.error_message = '';
                if(!err.response.data.message.no_stok && !err.response.data.message.status_stok)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.no_stok)
                        this.error_message= err.response.data.message.no_stok + "";
                    if(err.response.data.message.status_stok)
                        this.error_message= this.error_message + '\n' + err.response.data.message.status_stok;
                }
                this.color = "red"
                this.snackbar = true;
                this.progressBar = false;
            });
        },

        update() {
            this.progressBar = true;
            let updateData = {
                no_stok:     this.form.nomor_stok,
                status_stok: this.form.status_stok,
            }

            var url = this.$api + '/stok/' + this.editId;
            this.$http.put(url, updateData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = '';
                this.error_message = response.data.message;
                this.color = "green"
                this.snackbar = true;
                this.progressBar = false;
                this.cancel();
                this.loadData();
            }).catch(err => {
                this.error_message = '';
                if(!err.response.data.message.no_stok && !err.response.data.message.status_stok)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.no_stok)
                        this.error_message= err.response.data.message.no_stok + "";
                    if(err.response.data.message.status_stok)
                        this.error_message= this.error_message + '\n' + err.response.data.message.status_stok;
                }
                this.color = "red"
                this.snackbar = true;
                this.progressBar = false;
            });
        },

        deleteData() {
            this.progressBar = true;

            var url = this.$api + '/stok/' + this.deleteId;
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

        emitKetersediaan() {
            EventBus.$emit('stok', 'extra data');
        },

        appendAttr() {
            var index = 0;
            for(index = 0; index < this.stok.length; index++) {
                for(let x = 0; x < this.bahan.length; x++) {
                    if(this.bahan[x].id_bahan === this.stok[index].id_bahan)
                        this.$set(this.stok, {'id_bahan': this.bahan[x].id_bahan}, {'id_bahan': this.bahan[x].nama_bahan});
                }
            }

            for(index = 0; index < this.stok.length; index++) {
                for(let x = 0; x < this.karyawan.length; x++) {
                    if(this.karyawan[x].id_karyawan === this.stok[index].id_karyawan)
                        this.$set(this.stok, {'id_karyawan': this.karyawan[x].id_karyawan}, {'nama_karyawan': this.karyawan[x].nama_karyawan} );
                }
            }

        },
    }
}
</script>