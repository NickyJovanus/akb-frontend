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
                <h2>Customers Management</h2>
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
                            :items="customers"
                            :loading="loading"
                            :search="search">
                            <v-progress-linear v-show="loading" slot="progress" color="red" indeterminate></v-progress-linear>
                            <template v-slot:[`item.status_customer`]="{ item }">
                                <v-icon v-if="item.status_customer == 'Empty'" class="green--text text--lighten-2">mdi-checkbox-marked-circle-outline</v-icon>
                                <v-icon v-else class="red--text text--lighten-2">mdi-close-circle-outline</v-icon>
                                {{item.status_customer}}
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon class="yellow--text mr-2 text--lighten-2" @click="editHandler(item)">mdi-pencil-circle-outline</v-icon>
                                <v-icon class="red--text ml-2" @click="deleteHandler(item.id_customer)">mdi-delete-circle-outline</v-icon>
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
                        <span class="headline">{{ inputType }} Customer</span>
                    </v-card-title>
                    <div style="margin: 30px;">
                        <v-flex>
                            <v-text-field
                                label="Nama Customer"
                                v-model="form.nama_customer"
                                outlined
                            ></v-text-field>
                            <v-text-field
                                label="No. Telepon"
                                v-model="form.telpon_customer"
                                outlined
                            ></v-text-field>
                            <v-text-field
                                label="E-mail Address"
                                v-model="form.email_customer"
                                outlined
                            ></v-text-field>
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
                    Do you really want to delete this data?
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
    name: "customers",
    data() {
        return {
            role: '',
            headers: [
                { text: "ID",
                    align: "start",
                    sortable: true,
                    value: "id_customer" },
                { text: "Nama", value: "nama_customer" },
                { text: "No. Telepon", value: "telpon_customer" },
                { text: "E-mail", value: "email_customer" },
                { text: "Actions",
                    sortable: false,
                    value: "actions" },
            ],
            customers: [],
            inputType: 'Add',
            dialog: false,
            dialogDelete: false,
            form: {
                nama_customer: '',
                telpon_customer: '',
                email_customer: '',
            },
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
        this.customers = JSON.parse(localStorage.getItem('customer'));
        if(localStorage.getItem('customer') == null) {this.loadData();}
    },
    methods: {
        redirectDashboard() {
            this.$router.push({
                path: '/dashboard',
            });
            this.collapsed = true;
        },
        loadData() {
            var url = this.$api + '/customer';
            this.loading = true;
            this.role = localStorage.getItem('role');

            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.customers = response.data.data;
                localStorage.setItem('customer', JSON.stringify(response.data.data));
                this.emitCustomer();
                this.loading = false;
            }).catch(()=> {
                this.loading = false;
            });
        },
        editHandler(item) {
            this.inputType = 'Edit';
            this.editId = item.id_customer;
            this.form.nama_customer = item.nama_customer;
            this.form.telpon_customer = item.telpon_customer;
            this.form.email_customer = item.email_customer;
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
            this.form.nama_customer = '';
            this.form.telpon_customer = '';
            this.form.email_customer = '';
        },
        add() {
            this.progressBar = true;
            let addData = {
                nama_customer: this.form.nama_customer,
                telpon_customer: this.form.telpon_customer,
                email_customer: this.form.email_customer,
            }

            var url = this.$api + '/customer'
            this.$http.post(url, addData, {
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
                if(!err.response.data.message.nama_customer
                    && !err.response.data.message.telpon_customer
                    && !err.response.data.message.email_customer)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.nama_customer)
                        this.error_message= err.response.data.message.nama_customer;
                    if(err.response.data.message.telpon_customer)
                        this.error_message= this.error_message + '\n' + err.response.data.message.telpon_customer;
                    if(err.response.data.message.email_customer)
                        this.error_message= this.error_message + '\n' + err.response.data.message.email_customer;
                }
                this.color="red"
                this.snackbar=true;
                this.progressBar = false;
            });
        },
        update() {
            this.progressBar = true;
            let updateData = {
                nama_customer: this.form.nama_customer,
                telpon_customer: this.form.telpon_customer,
                email_customer: this.form.email_customer,
            }

            var url = this.$api + '/customer/' + this.editId;
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
                if(!err.response.data.message.nama_customer
                    && !err.response.data.message.telpon_customer
                    && !err.response.data.message.email_customer)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.nama_customer)
                        this.error_message= err.response.data.message.nama_customer;
                    if(err.response.data.message.telpon_customer)
                        this.error_message= this.error_message + '\n' + err.response.data.message.telpon_customer;
                    if(err.response.data.message.email_customer)
                        this.error_message= this.error_message + '\n' + err.response.data.message.email_customer;
                }
                this.color="red"
                this.snackbar=true;
                this.progressBar = false;
            });
        },
        deleteData() {
            this.progressBar = true;

            var url = this.$api + '/customer/' + this.deleteId;
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
        // Send update signal through event bus (reload data for <keep-alive>)
        emitCustomer() {
            EventBus.$emit('customer', 'extra data');
        }
    }
}
</script>