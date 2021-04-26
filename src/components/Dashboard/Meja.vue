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
                <h2>Meja Management</h2>
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
                            :items="meja"
                            :loading="loading"
                            :search="search">
                            <v-progress-linear v-show="loading" slot="progress" color="red" indeterminate></v-progress-linear>
                            <template v-slot:[`item.status_meja`]="{ item }">
                                <v-icon v-if="item.status_meja == 'Empty'" class="green--text text--lighten-2">mdi-checkbox-marked-circle-outline</v-icon>
                                <v-icon v-else class="red--text text--lighten-2">mdi-close-circle-outline</v-icon>
                                {{item.status_meja}}
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon class="yellow--text mr-2 text--lighten-2" @click="editHandler(item)">mdi-pencil-circle-outline</v-icon>
                                <v-icon v-if="role == 'Operational Manager'" class="red--text ml-2" @click="deleteHandler(item.id_meja)">mdi-delete-circle-outline</v-icon>
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
                        <span class="headline">{{ inputType }} Meja</span>
                    </v-card-title>
                    <div style="margin: 30px;">
                        <v-flex>
                            <v-text-field
                                label="Nomor Meja"
                                v-model="form.nomor_meja"
                                outlined
                            ></v-text-field>
                            
                            <v-select
                                v-model="form.status_meja"
                                label="Status Meja"
                                :items="status"
                                item-text="name"
                                outlined
                                three-line
                                :value="form.status_meja"
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
                    Do you really want to delete this meja?
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
    name: "Meja",
    data() {
        return {
            role: '',
            headers: [
                { text: "ID",
                    align: "start",
                    value: "id_meja" },
                { text: "Nomor Meja",  value: "no_meja" },
                { text: "Status Meja", value: "status_meja" },
                { text: "Actions",
                    sortable: false,
                    value: "actions" },
            ],
            meja: [],
            inputType: 'Add',
            dialog: false,
            dialogDelete: false,
            form: {
                nomor_meja: '',
                status_meja: '',
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
        this.meja = JSON.parse(localStorage.getItem('meja'));
        this.role = localStorage.getItem('role');

        if(localStorage.getItem('meja') == null) {this.loadData();}

        if (this.role != 'Operational Manager' && this.role != 'Cashier')
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
            var url = this.$api + '/meja';
            this.loading = true;

            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.meja = response.data.data;
                localStorage.setItem('meja', JSON.stringify(response.data.data));
                this.emitKetersediaan();
                this.loading = false;
            }).catch(()=> {
                this.loading = false;
            });
        },
        editHandler(item) {
            this.inputType = 'Edit';
            this.editId           = item.id_meja;
            this.form.nomor_meja  = item.no_meja;
            this.form.status_meja = item.status_meja;
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
            this.form.nomor_meja  = '';
            this.form.status_meja = '';
        },
        add() {
            this.progressBar = true;
            let addData = {
                no_meja: this.form.nomor_meja,
                status_meja: this.form.status_meja,
            }

            var url = this.$api + '/meja'
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
                if(!err.response.data.message.no_meja && !err.response.data.message.status_meja)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.no_meja)
                        this.error_message= err.response.data.message.no_meja + "";
                    if(err.response.data.message.status_meja)
                        this.error_message= this.error_message + '\n' + err.response.data.message.status_meja;
                }
                this.color = "red"
                this.snackbar = true;
                this.progressBar = false;
            });
        },
        update() {
            this.progressBar = true;
            let updateData = {
                no_meja: this.form.nomor_meja,
                status_meja: this.form.status_meja,
            }

            var url = this.$api + '/meja/' + this.editId;
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
                if(!err.response.data.message.no_meja && !err.response.data.message.status_meja)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.no_meja)
                        this.error_message= err.response.data.message.no_meja + "";
                    if(err.response.data.message.status_meja)
                        this.error_message= this.error_message + '\n' + err.response.data.message.status_meja;
                }
                this.color = "red"
                this.snackbar = true;
                this.progressBar = false;
            });
        },
        deleteData() {
            this.progressBar = true;

            var url = this.$api + '/meja/' + this.deleteId;
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
            EventBus.$emit('meja', 'extra data');
        }
    }
}
</script>