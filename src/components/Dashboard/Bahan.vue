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
                <h2>Bahan Management</h2>
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
                            :items="bahan"
                            :loading="loading"
                            :search="search">
                            <v-progress-linear v-show="loading" slot="progress" color="red" indeterminate></v-progress-linear>
                            <template v-slot:[`item.jml_bahan`]="{ item }">
                                {{item.jml_bahan}} {{item.unit_bahan}}
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon class="yellow--text mr-2 text--lighten-2" @click="editHandler(item)">mdi-pencil-circle-outline</v-icon>
                                <v-icon class="red--text ml-2" @click="deleteHandler(item.id_bahan)">mdi-delete-circle-outline</v-icon>
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
                        <span class="headline">{{ inputType }} Bahan</span>
                    </v-card-title>
                    <div style="margin: 30px;">
                        <v-flex>
                            <v-text-field
                                label="Nama Bahan"
                                v-model="form.nama_bahan"
                                outlined
                            ></v-text-field>

                            <v-text-field
                                label="Jumlah Bahan"
                                v-model="form.jml_bahan"
                                type="number"
                                outlined
                            ></v-text-field>

                            <v-text-field
                                label="Unit Bahan"
                                v-model="form.unit_bahan"
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
                    Do you really want to delete this bahan? <br>
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
    name: "Bahan",
    data() {
        return {
            role: '',
            headers: [
                { text: "ID", align: "start",       value: "id_bahan"       },
                { text: "Nama Bahan",               value: "nama_bahan"     },
                { text: "Jumlah Bahan",             value: "jml_bahan"      },
                { text: "Stok per Unit",            value: "stok_per_unit"  },
                { text: "Actions", sortable: false, value: "actions"        },
            ],
            bahan:           [],
            inputType:    'Add',
            dialog:       false,
            dialogDelete: false,
            form: {
                nama_bahan:    '',
                jml_bahan:     '',
                unit_bahan:    '',
                stok_per_unit: '',
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
        }
    },
    mounted() {
        this.bahan = JSON.parse(localStorage.getItem('bahan'));
        this.role = localStorage.getItem('role');

        if(localStorage.getItem('bahan') == null) {this.loadData();}
        
        if (this.role != 'Operational Manager' && this.role != 'Chef')
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

            var url = this.$api + '/bahan';
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.bahan   = response.data.data;
                localStorage.setItem('bahan', JSON.stringify(response.data.data));
                this.emitMenu();
                this.loading = false;
            }).catch(()=> {
                this.loading = false;
            });
        },
        editHandler(item) {
            this.inputType          = 'Edit';
            this.editId             = item.id_bahan;
            this.form.nama_bahan    = item.nama_bahan;
            this.form.jml_bahan     = item.jml_bahan;
            this.form.unit_bahan    = item.unit_bahan;
            this.form.stok_per_unit = item.stok_per_unit;
            this.dialog             = true;
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
            this.form.nama_bahan    = '';
            this.form.jml_bahan     = '';
            this.form.unit_bahan    = '';
            this.form.stok_per_unit = '';
        },
        add() {
            this.progressBar = true;
            let addData = {
                nama_bahan:    this.form.nama_bahan,
                jml_bahan:     this.form.jml_bahan,
                unit_bahan:    this.form.unit_bahan,
                stok_per_unit: this.form.stok_per_unit,
            }

            var url = this.$api + '/bahan'
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
                if(!err.response.data.message.nama_bahan 
                && !err.response.data.message.jml_bahan
                && !err.response.data.message.unit_bahan
                && !err.response.data.message.stok_per_unit)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.nama_bahan)
                        this.error_message= err.response.data.message.nama_bahan + "";
                    if(err.response.data.message.jml_bahan)
                        this.error_message= this.error_message + '\n' + err.response.data.message.jml_bahan;
                    if(err.response.data.message.unit_bahan)
                        this.error_message= this.error_message + '\n' + err.response.data.message.unit_bahan;
                    if(err.response.data.message.stok_per_unit)
                        this.error_message= this.error_message + '\n' + err.response.data.message.stok_per_unit;
                }
                this.color       = "red";
                this.snackbar    =  true;
                this.progressBar = false;
            });
        },
        update() {
            this.progressBar = true;
            let updateData = {
                nama_bahan:    this.form.nama_bahan,
                jml_bahan:     this.form.jml_bahan,
                unit_bahan:    this.form.unit_bahan,
                stok_per_unit: this.form.stok_per_unit,
            }

            var url = this.$api + '/bahan/' + this.editId;
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
                if(!err.response.data.message.nama_bahan 
                && !err.response.data.message.jml_bahan
                && !err.response.data.message.unit_bahan
                && !err.response.data.message.stok_per_unit)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.nama_bahan)
                        this.error_message= err.response.data.message.nama_bahan + "";
                    if(err.response.data.message.jml_bahan)
                        this.error_message= this.error_message + '\n' + err.response.data.message.jml_bahan;
                    if(err.response.data.message.unit_bahan)
                        this.error_message= this.error_message + '\n' + err.response.data.message.unit_bahan;
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

            var url = this.$api + '/bahan/' + this.deleteId;
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
            EventBus.$emit('bahan', '');
        }
    }
}
</script>