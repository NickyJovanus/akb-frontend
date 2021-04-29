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
                <h2>Karyawan Management</h2>
            </div>

            <div class="mt-5 table-section">
                <v-card class="ma-6">
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-btn dark @click="dialog = true">
                            Register
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
                        <transition name="fade">
                        <v-data-table :headers="headers" 
                            :items="karyawan" 
                            :loading="loading"
                            :search="search">
                            <v-progress-linear v-show="loading" slot="progress" color="red" indeterminate></v-progress-linear>

                            <template v-slot:[`item.jenis_kelamin_karyawan`]="{ item }">
                                {{item.jenis_kelamin_karyawan}}
                                <v-icon v-if="item.jenis_kelamin_karyawan == 'Perempuan'" color="pink">mdi-gender-female</v-icon>
                                <v-icon v-else color="blue">mdi-gender-male</v-icon>
                            </template>

                            <template v-slot:[`item.peran_karyawan`]="{ item }">
                                <v-btn 
                                    :disabled="true" 
                                    style="color: white !important;"
                                    :style="{'background-color':`${filterbg(item.peran_karyawan)} !important`}">
                                    {{item.peran_karyawan}}
                                </v-btn>
                            </template>

                            <template v-slot:[`item.status_karyawan`]="{ item }">
                                <v-icon v-if="item.status_karyawan == 'Active'" class="green--text text--lighten-2">mdi-checkbox-marked-circle-outline</v-icon>
                                <v-icon v-else class="red--text text--lighten-2">mdi-close-circle-outline</v-icon>
                            </template>

                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon class="yellow--text mr-2 text--lighten-2" @click="editHandler(item)">mdi-pencil-circle-outline</v-icon>
                                <v-icon class="green--text ml-2" @click="changePasswordHandler(item.id_karyawan)">mdi-key-variant</v-icon>
                                <v-icon class="red--text ml-2" @click="deleteHandler(item.id_karyawan)">mdi-close-circle-outline</v-icon>
                            </template>
                        </v-data-table>
                        </transition>
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

        
            <!-- register and edit data -->
            <v-dialog v-model="dialog" persistent max-width="600px" mt-10 style='z-index:8000;'>
                <v-card>
                    
                    <v-flex>
                        <v-progress-linear v-show="progressBar" slot="progress" :color="inputType == 'Edit' ? 'yellow' : 'blue'" indeterminate></v-progress-linear>
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
                        <span class="headline">{{ inputType }} Karyawan</span>
                    </v-card-title>

                    <v-card-text>
                            <v-text-field
                                label="Nama Karyawan"
                                v-model="form.nama_karyawan"
                                clearable
                                outlined
                            ></v-text-field>
                            
                            <v-select
                                v-model="form.jenis_kelamin_karyawan"
                                label="Jenis Kelamin"
                                :items="jenis_kelamin"
                                item-text="name"
                                outlined
                                three-line
                                :value="form.jenis_kelamin_karyawan"
                            ></v-select>

                            <v-menu
                                ref="tanggal_menu"
                                v-model="tanggal_menu"
                                :close-on-content-click="false"
                                :return-value.sync="form.tanggal_rekrut_karyawan"
                                transition="slide-x-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="form.tanggal_rekrut_karyawan"
                                    label="Tanggal Rekrut"
                                    prepend-icon="mdi-calendar"
                                    clearable
                                    readonly
                                    outlined
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="form.tanggal_rekrut_karyawan"
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="red"
                                    @click="tanggal_menu = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.tanggal_menu.save(form.tanggal_rekrut_karyawan)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>

                            <v-text-field
                                label="No. Telpon"
                                v-model="form.telpon_karyawan"
                                clearable
                                outlined
                            ></v-text-field>

                            <v-select v-if="inputType != 'Register'"
                                v-model="form.status_karyawan"
                                label="Status"
                                :items="status"
                                item-text="name"
                                outlined
                                three-line
                                :value="form.status_karyawan"
                            >
                            </v-select>

                            <v-select
                                v-model="form.peran_karyawan"
                                label="Peran"
                                :items="peran"
                                item-text="name"
                                outlined
                                three-line
                                :value="form.peran_karyawan"
                            >
                            </v-select>

                            <v-text-field
                                label="E-mail"
                                v-model="form.email_karyawan"
                                autocomplete="off"
                                clearable
                                onfocus="this.removeAttribute('readonly');"
                                outlined
                            ></v-text-field>

                            <v-text-field
                                v-if="inputType == 'Register'"
                                label="Password"
                                v-model="form.password_karyawan"
                                :type="passwordtype"
                                clearable
                                outlined
                            >
                                <template v-slot:append v-if="inputType == 'Register'">
                                    <v-btn 
                                        v-if="passwordtype == 'password'" 
                                        @click="passwordtype = 'text'" 
                                        min-width="100"
                                        height="100%"
                                        color="red"
                                        depressed 
                                        tile
                                        class="ma-0">
                                        Reveal
                                    </v-btn>
                                    <v-btn 
                                        v-else 
                                        @click="passwordtype = 'password'"
                                        min-width="100"
                                        height="100%"
                                        color="green"
                                        depressed 
                                        tile
                                        class="ma-0">
                                        Hide
                                    </v-btn>
                                </template>
                            </v-text-field>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="white darken-1" text @click="cancel">
                            Cancel
                        </v-btn>
                        <v-btn v-if="inputType == 'Register'" :disabled="progressBar" color="blue darken-1" text @click="register">
                            Save
                        </v-btn>
                        <v-btn v-if="inputType == 'Edit'" :disabled="progressBar" color="yellow darken-1" text @click="update">
                            Save
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog>

        
            <v-dialog v-model="dialogPassword" persistent max-width="600px" style='z-index:8000;'>
                <v-card>

                    <v-flex>
                        <v-progress-linear v-show="progressBar" slot="progress" color="green" indeterminate></v-progress-linear>
                    </v-flex>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-flex class="text-right">
                            <v-icon color="red" @click="dialogPassword = false; resetForm()">mdi-close</v-icon>
                        </v-flex>
                    </v-card-actions>

                    <v-card-title>
                        <span class="headline">Change Password</span>
                    </v-card-title>
                    <div style="margin: 30px;">
                        <v-text-field
                            label="Old Password"
                            v-model="formpass.oldpassword"
                            type="password"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="New Password"
                            v-model="formpass.newpassword"
                            type="password"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="Confirm New Password"
                            v-model="formpass.confirmpassword"
                            type="password"
                            outlined
                        ></v-text-field>
                    </div>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="white darken-1" text @click="dialogPassword = false; resetForm()">
                            Cancel
                        </v-btn>
                        <v-btn color="green darken-1" :disabled="progressBar" text @click="changePass"> 
                            Save
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog>

        
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
                            <v-icon color="red" @click="dialogDelete = false">mdi-close</v-icon>
                        </v-flex>
                    </v-card-actions>

                    <v-card-title>
                        <span class="headline">Deactivation Confirmation</span>
                    </v-card-title>

                    <v-card-text>
                        Do you really want to deactivate this karyawan?
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="white darken-1" text @click="dialogDelete = false">
                            Cancel
                        </v-btn>
                        <v-btn color="red darken-1" :disabled="progressBar" text @click="deleteData"> 
                            Deactivate
                        </v-btn>
                    </v-card-actions>

                </v-card>
            </v-dialog>

        </div>

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
export default{
    name: "Karyawan",
    data() {
        return {
            role: '',
            headers: [
                { text: "ID", align: "start",       value: "id_karyawan" },
                { text: "Nama",                     value: "nama_karyawan" },
                { text: "Jenis Kelamin",            value: "jenis_kelamin_karyawan" },
                { text: "Tanggal Rekrut",           value: "tanggal_rekrut_karyawan" },
                { text: "No. Telpon",               value: "telpon_karyawan" },
                { text: "Peran",                    value: "peran_karyawan" },
                { text: "Status",                   value: "status_karyawan" },
                { text: "E-mail",                   value: "email_karyawan" },
                { text: "Actions", sortable: false, value: "actions" },
            ],
            karyawan:          [],
            inputType: 'Register',
            dialog:         false,
            dialogDelete:   false,
            dialogPassword: false,
            form: {
                nama_karyawan:              '',
                jenis_kelamin_karyawan:     '',
                tanggal_rekrut_karyawan:    '',
                telpon_karyawan:            '',
                peran_karyawan:             '',
                status_karyawan:            '',
                email_karyawan:             '',
                password_karyawan:          '',
            },
            formpass: {
                oldpassword:        '',
                newpassword:        '',
                confirmpassword:    '',
            },
            status: [
                {name: 'Active'  },
                {name: 'Inactive'},
            ],
            jenis_kelamin: [
                {name: 'Laki-laki'},
                {name: 'Perempuan'},
            ],
            peran: [
                {name:               'Owner'},
                {name: 'Operational Manager'},
                {name:                'Chef'},
                {name:              'Waiter'},
                {name:             'Cashier'},
            ],
            loading:           false,
            tanggal_menu:      false,
            modal:             false,
            search:               '',
            editId:             null,
            deleteId:           null,
            passwordId:         null,
            snackbar:          false,
            progressBar:       false,
            error_message:        '',
            color:                '',
            passwordtype: 'password',
        }
    },
    mounted() {
        this.karyawan = JSON.parse(localStorage.getItem('karyawan'));
        this.role     = localStorage.getItem('role');

        if(localStorage.getItem('karyawan') == null) {this.loadData();}

        if (this.role != 'Operational Manager' && this.role != 'Owner')
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
            var url = this.$api + '/karyawan';
            this.loading = true;

            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.karyawan = response.data.data;
                localStorage.setItem('karyawan', JSON.stringify(response.data.data));
                this.loading = false;
            }).catch(()=> {
                this.loading = false;
            });
        },

        cancel() {
            this.dialog       =      false;
            this.dialogDelete =      false;
            this.inputType    = 'Register';
            this.editId       =       null;
            this.passwordtype = 'password';
            this.resetForm();
        },

        resetForm() {
            this.form.nama_karyawan           = '';
            this.form.jenis_kelamin_karyawan  = '';
            this.form.tanggal_rekrut_karyawan = '';
            this.form.telpon_karyawan         = '';
            this.form.peran_karyawan          = '';
            this.form.status_karyawan         = '';
            this.form.email_karyawan          = '';
            this.form.password_karyawan       = '';
            this.formpass.oldpassword         = '';
            this.formpass.newpassword         = '';
            this.formpass.confirmpassword     = '';
        },

        register() {
            this.progressBar = true;
            let addData = {
                nama_karyawan:           this.form.nama_karyawan,
                jenis_kelamin_karyawan:  this.form.jenis_kelamin_karyawan,
                tanggal_rekrut_karyawan: this.form.tanggal_rekrut_karyawan,
                telpon_karyawan:         this.form.telpon_karyawan,
                peran_karyawan:          this.form.peran_karyawan,
                status_karyawan:         this.form.status_karyawan,
                email_karyawan:          this.form.email_karyawan,
                password:                this.form.password_karyawan,
            }

            var url = this.$api + '/karyawan'
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

            }).catch(error => {

                this.error_message = '';
                if(!error.response.data.message.nama_karyawan
                && !error.response.data.message.jenis_kelamin_karyawan
                && !error.response.data.message.tanggal_rekrut_karyawan
                && !error.response.data.message.telpon_karyawan
                && !error.response.data.message.peran_karyawan
                && !error.response.data.message.email_karyawan
                && !error.response.data.message.password)
                    this.error_message= error.response.data.message;

                else {
                    if(error.response.data.message.nama_karyawan)
                        this.error_message= this.error_message + error.response.data.message.nama_karyawan + "";
                    if(error.response.data.message.jenis_kelamin_karyawan)
                        this.error_message= this.error_message + '\n'  + error.response.data.message.jenis_kelamin_karyawan;
                    if(error.response.data.message.tanggal_rekrut_karyawan)
                        this.error_message= this.error_message + '\n'  + error.response.data.message.tanggal_rekrut_karyawan;
                    if(error.response.data.message.telpon_karyawan)
                        this.error_message= this.error_message + '\n'  + error.response.data.message.telpon_karyawan;
                    if(error.response.data.message.peran_karyawan)
                        this.error_message= this.error_message + '\n'  + error.response.data.message.peran_karyawan;
                    if(error.response.data.message.email_karyawan)
                        this.error_message= this.error_message + '\n'  + error.response.data.message.email_karyawan;
                    if(error.response.data.message.password)
                        this.error_message= this.error_message + '\n'  + error.response.data.message.password;
                }

                this.color       = "red";
                this.snackbar    =  true;
                this.progressBar = false;
            });
        },

        editHandler(item){
            this.inputType                    = 'Edit';
            this.editId                       = item.id_karyawan;
            this.form.nama_karyawan           = item.nama_karyawan;
            this.form.jenis_kelamin_karyawan  = item.jenis_kelamin_karyawan;
            this.form.tanggal_rekrut_karyawan = item.tanggal_rekrut_karyawan;
            this.form.telpon_karyawan         = item.telpon_karyawan;
            this.form.peran_karyawan          = item.peran_karyawan;
            this.form.status_karyawan         = item.status_karyawan;
            this.form.email_karyawan          = item.email_karyawan;
            this.dialog = true;
        },

        deleteHandler(id){
            this.deleteId = id;
            this.dialogDelete = true;
        },

        changePasswordHandler(id) {
            this.passwordId = id;
            this.dialogPassword = true;
        },

        update() {
            this.progressBar = true;
            let updateData = {
                nama_karyawan:           this.form.nama_karyawan,
                jenis_kelamin_karyawan:  this.form.jenis_kelamin_karyawan,
                tanggal_rekrut_karyawan: this.form.tanggal_rekrut_karyawan,
                telpon_karyawan:         this.form.telpon_karyawan,
                peran_karyawan:          this.form.peran_karyawan,
                status_karyawan:         this.form.status_karyawan,
                email_karyawan:          this.form.email_karyawan,
            }
            
            var url = this.$api + '/karyawan/' + this.editId;
            this.$http.put(url, updateData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = '';
                this.error_message = response.data.message;
                this.color         = "green"
                this.snackbar      = true;
                this.progressBar   = false;
                this.cancel();
                this.loadData();
            }).catch(error => {

                this.error_message = '';
                if(!error.response.data.message.nama_karyawan
                && !error.response.data.message.jenis_kelamin_karyawan
                && !error.response.data.message.tanggal_rekrut_karyawan
                && !error.response.data.message.telpon_karyawan
                && !error.response.data.message.peran_karyawan
                && !error.response.data.message.email_karyawan
                && !error.response.data.message.password)
                    this.error_message= error.response.data.message;

                else {
                    if(error.response.data.message.nama_karyawan)
                        this.error_message = this.error_message + error.response.data.message.nama_karyawan + "";
                    if(error.response.data.message.jenis_kelamin_karyawan)
                        this.error_message = this.error_message + '\n'  + error.response.data.message.jenis_kelamin_karyawan;
                    if(error.response.data.message.tanggal_rekrut_karyawan)
                        this.error_message = this.error_message + '\n'  + error.response.data.message.tanggal_rekrut_karyawan;
                    if(error.response.data.message.telpon_karyawan)
                        this.error_message = this.error_message + '\n'  + error.response.data.message.telpon_karyawan;
                    if(error.response.data.message.peran_karyawan)
                        this.error_message = this.error_message + '\n'  + error.response.data.message.peran_karyawan;
                    if(error.response.data.message.email_karyawan)
                        this.error_message = this.error_message + '\n'  + error.response.data.message.email_karyawan;
                    if(error.response.data.message.password)
                        this.error_message = this.error_message + '\n'  + error.response.data.message.password;
                }

                this.color       = "red";
                this.snackbar    =  true;
                this.progressBar = false;

            })
        },

        deleteData() {
            this.progressBar = true;
            var url = this.$api + '/karyawan/' + this.deleteId;
            this.$http.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {

                this.error_message =         '';
                this.error_message = response.data.message;
                this.color         =    "green";
                this.snackbar      =       true;
                this.progressBar   =      false;
                this.inputType     = 'Register';
                this.cancel();
                this.loadData();

            }).catch(error => {

                this.error_message =    '';
                this.error_message = error.response.data.message;
                this.color         = "red";
                this.snackbar      =  true;
                this.progressBar   = false;

            })
        },

        changePass() {
            this.progressBar = true;
            let passwordData = {
                old_password: this.formpass.oldpassword,
                new_password: this.formpass.newpassword,
                confirm_password: this.formpass.confirmpassword,
            }

            var url = this.$api + '/karyawan/cp/' + this.passwordId;
            this.$http.put(url, passwordData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {

                this.error_message = '';
                this.error_message = response.data.message;

                if(this.error_message === "Data was successfully updated") {
                    this.color          = "green";
                    this.progressBar    =   false;
                    this.dialogPassword =   false;
                    this.loadData();
                } else {
                    this.color          = "red";
                    this.progressBar    = false;
                }

                this.snackbar  =       true;
                this.inputType = 'Register';
                this.close();
                this.resetForm();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color         = "red";
                this.snackbar      =  true;
                this.progressBar   = false;
                this.resetForm();
            })
        },

        filterbg(role) {
            switch(role) {
                case 'Owner':               return 'green';
                case 'Operational Manager': return '#185fff';
                case 'Chef':                return 'rgb(255 58 58)';
                case 'Waiter':              return '#ff7600';
                case 'Cashier':             return 'purple';
                default:                    return 'purple';
            }
        }
    }
}
</script>


<style scoped>
  @import '~@/assets/css/index.css';
</style>