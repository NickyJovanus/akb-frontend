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
                        <v-data-table :headers="headers" 
                            :items="karyawan" 
                            :loading="loading"
                            :search="search">
                            <v-progress-linear v-show="loading" slot="progress" color="red" indeterminate></v-progress-linear>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon class="green--text mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                                <v-icon class="red--text ml-2" @click="deleteHandler(item.id)">mdi-delete</v-icon>
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
                        <p id="copyright">For Development Purposes Only.</p>
                    </div>
                    <!-- end row contact -->
                </div>
                <!-- end container footer section -->
            </footer>
            <!-- end footer -->



            


        
        <!-- register and edit data -->
        <v-dialog v-model="dialog" persistent max-width="700px" class="mt-15">
            <v-card>
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
                    <v-container>
                        <v-text-field
                            label="Nama Karyawan"
                            v-model="form.name_karyawan"
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
                                label="Tanggal Rekrut"
                                prepend-icon="mdi-calendar"
                                readonly
                                outlined
                                v-bind="attrs"
                                v-on="on"
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
                        <v-text-field
                            label="No. Telpon"
                            v-model="form.telpon_karyawan"
                            outlined
                        ></v-text-field>
                        <v-select
                            v-model="form.status_karyawan"
                            label="Status"
                            :items="status"
                            item-text="name"
                            outlined
                            three-line
                            :value="form.status_karyawan"
                        >
                        </v-select>
                        <v-text-field
                            label="Email"
                            v-model="form.email_karyawan"
                            autocomplete="off"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="Password"
                            v-model="form.password"
                            type="password"
                            outlined
                        ></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white darken-1" text @click="cancel">
                        Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="register">
                        Save
                    </v-btn>
                </v-card-actions>
                <v-flex>
                    <v-progress-linear v-show="loading" slot="progress" color="blue" indeterminate></v-progress-linear>
                </v-flex>
            </v-card>
        </v-dialog>

        </div>


    </v-main>
</template>


<script>
export default{
    name: "Karyawan",
    data() {
        return {
            role: '',
            headers: [
                { text: "ID",
                    align: "start",
                    sortable: true,
                    value: "id_karyawan" },
                { text: "Nama", value: "nama_karyawan" },
                { text: "Jenis Kelamin", value: "jenis_kelamin_karyawan" },
                { text: "Tanggal Rekrut", value: "tanggal_rekrut_karyawan" },
                { text: "No. Telpon", value: "telpon_karyawan" },
                { text: "Peran", value: "peran_karyawan" },
                { text: "Status", value: "status_karyawan" },
                { text: "E-mail", value: "email_karyawan" },
                { text: "Actions",
                    sortable: false,
                    value: "actions" },
            ],
            karyawan: [],
            inputType: 'Register',
            dialog: false,
            form: {
                nama_karyawan: '',
                jenis_kelamin_karyawan: '',
                tanggal_rekrut_karyawan: '',
                telpon_karyawan: '',
                peran_karyawan: '',
                status_karyawan: '',
                email_karyawan: '',
                password: '',
            },
            status: [
                {name: 'Active'},
                {name: 'Inactive'}
            ],
            jenis_kelamin: [
                {name: 'Laki-laki'},
                {name: 'Perempuan'}
            ],
            loading: false,
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            search: '',
        }
    },
    mounted() {
        this.loadData();
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
                this.loading = false;
            }).catch(()=> {
                this.loading = false;
            });
        },
        cancel() {
            this.resetForm();
            this.loadData();
            this.dialog = false;
            this.inputType = 'Add';
        },
        resetForm() {
            this.form.nama_karyawan = '';
            this.form.jenis_kelamin_karyawan = '';
            this.form.tanggal_rekrut_karyawan = '';
            this.form.telpon_karyawan = '';
            this.form.peran_karyawan = '';
            this.form.status_karyawan = '';
            this.form.email_karyawan = '';
            this.form.password = '';
        },
        register() {
            //
        }
    }
}
</script>


<style scoped>
  @import '~@/assets/css/index.css';
</style>