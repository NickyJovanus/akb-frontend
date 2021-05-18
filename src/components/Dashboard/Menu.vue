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
                <h2>Menu Management</h2>
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
                            :items="menu"
                            :loading="loading"
                            :search="search">
                            <v-progress-linear v-show="loading" slot="progress" color="red" indeterminate></v-progress-linear>

                            <template v-slot:[`item.kategori_menu`]="{ item }">
                                {{item.kategori_menu.charAt(0).toUpperCase() + item.kategori_menu.slice(1)}}
                            </template>
                            
                            <template v-slot:[`item.harga_menu`]="{ item }">
                                <span v-if="item.harga_menu === 0">Free</span>
                                <span v-else>Rp. {{item.harga_menu.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}}.00</span>
                            </template>
                            <template v-slot:[`item.id_bahan`]="{ item }">
                                <div v-for="item2 in bahan" :key="item2.id_bahan">
                                    <div v-if="item.id_bahan == item2.id_bahan">
                                        {{item2.nama_bahan}}
                                    </div>
                                </div>
                            </template>
                            <template v-slot:[`item.gambar_menu`]="{ item }">
                                <div style="width: 50px; height: 50px; cursor: pointer;" @click="gambarHandler(item)">
                                    <img :src="item.gambar_menu == null ? require('@/assets/images/no-image.png') : item.gambar_menu" 
                                        :style="{
                                        'width': '100%', 
                                        'height': '100%',
                                        'display': 'table',
                                        'background-size': 'cover', 
                                        'border-radius': '100%',
                                        'object-fit': 'cover',
                                        'padding': '5px',
                                    }"
                                    >
                                </div>
                            </template>
                            <template v-slot:[`item.actions`]="{ item }">
                                <v-icon class="yellow--text mr-2 text--lighten-2" @click="editHandler(item)">mdi-pencil-circle-outline</v-icon>
                                <v-icon class="red--text ml-2" @click="deleteHandler(item.id_menu)">mdi-delete-circle-outline</v-icon>
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
                        <span class="headline">{{ inputType }} Menu</span>
                    </v-card-title>
                    <div style="margin: 30px;">
                        <v-flex>
                            <v-text-field
                                label="Nama Menu"
                                v-model="form.nama_menu"
                                outlined
                                clearable
                            ></v-text-field>

                            <v-text-field
                                label="Deskripsi Menu"
                                v-model="form.deskripsi_menu"
                                outlined
                                clearable
                            ></v-text-field>

                            <v-text-field
                                label="Unit Menu"
                                v-model="form.unit_menu"
                                outlined
                                clearable
                            ></v-text-field>

                            <v-text-field
                                label="Harga Menu"
                                v-model="form.harga_menu"
                                type="number"
                                outlined
                                clearable
                            ></v-text-field>

                            <v-select
                                v-model="form.kategori_menu"
                                label="Kategori Menu"
                                :items="kategori"
                                outlined
                                clearable
                                three-line
                            >
                                <template slot="selection" slot-scope="data">
                                    {{ data.item.charAt(0).toUpperCase() + data.item.slice(1) }}
                                </template>
                                <template slot="item" slot-scope="data">
                                    {{ data.item.charAt(0).toUpperCase() + data.item.slice(1) }}
                                </template>
                            </v-select>

                            <v-select
                                v-model="form.id_bahan"
                                label="Nama Bahan"
                                :items="bahan"
                                item-text="id_bahan"
                                outlined
                                three-line
                                clearable
                                @input="fillStok($event)"
                            >
                                <template slot="selection" slot-scope="data">
                                    {{ data.item.nama_bahan }}
                                </template>
                                <template slot="item" slot-scope="data">
                                    {{ data.item.nama_bahan }}
                                </template>
                            </v-select>

                            <v-text-field
                                label="Stok Menu"
                                v-model="form.stok_menu"
                                type="number"
                                outlined
                                clearable
                                disabled
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
                    Do you really want to delete this menu?
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

        
        <v-dialog v-model="dialogImage" persistent max-width="700px" style='z-index:8000;'>
            <v-card>
                <v-flex>
                    <v-progress-linear v-show="progressBar" slot="progress" color="primary" indeterminate></v-progress-linear>
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
                    <span class="headline">{{imgTitle}}'s Image</span>
                </v-card-title>
                <v-card-text>
                    <img v-if="gambar_menu !== null" :src="gambar_menu" 
                        style="width: 100%; max-width: 650px; object-fit: cover; max-height: 400px; border-radius: 5px;">
                    <h5 v-else><br>No Image Found</h5>
                </v-card-text>
                <v-expand-transition>
                    <div class="ml-10 mr-10" v-show="addImg === true">
                        <input class="ma-5" type="file" label="File" placeholder="Select file here..." @change='upload_image'>
                    </div>
                </v-expand-transition>
                <v-card-actions>
                    <v-btn v-show="addImg == false ? true : false" @click="addImg = true" color="primary darken-1">{{gambar_menu !== null ? 'Change' : 'Add'}} Image</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="white darken-1" text @click="cancel">
                        {{ addImg == false ? 'Close' : 'Cancel' }}
                    </v-btn>
                    <v-btn v-if="addImg== true" color="primary darken-1" :disabled="progressBar" text @click="save_image">
                        Save
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
    name: "Menu",

    data() {
        return {
            role: '',
            headers: [
                { text: "ID", align: "start",       value: "id_menu"        },
                { text: "Nama Menu",                value: "nama_menu"      },
                { text: "Deskripsi Menu",           value: "deskripsi_menu" },
                { text: "Stok Menu",                value: "stok_menu"      },
                { text: "Unit Menu",                value: "unit_menu"      },
                { text: "Harga Menu",               value: "harga_menu"     },
                { text: "Kategori Menu",            value: "kategori_menu"  },
                { text: "Nama Bahan",               value: "id_bahan"       },
                { text: "Gambar",                   value: "gambar_menu"    },
                { text: "Actions", sortable: false, value: "actions"        },
            ],
            menu:              [],
            bahan:             [],
            inputType:      'Add',
            dialog:         false,
            dialogDelete:   false,
            dialogImage:    false,
            form: {
                nama_menu:      '',
                unit_menu:      '',
                deskripsi_menu: '',
                harga_menu:     '',
                kategori_menu:  '',
                id_bahan:       '',
                gambar_bahan:   '',
                stok_menu:      '',
            },
            kategori: [
                'makanan',
                'side dish',
                'minuman'
            ],
            editId:       null,
            deleteId:     null,
            passwordId:   null,
            gambarId:     null,
            imgTitle:     null,
            search:         '',
            gambar_menu:    '',
            error_message:  '',
            color:          '',
            snackbar:    false,
            progressBar: false,
            addImg:      false,
            loading:     false,
            imgData: new FormData,
        }
    },

    mounted() {
        this.menu  = JSON.parse(localStorage.getItem('menu'));
        this.bahan = JSON.parse(localStorage.getItem('bahan'));
        this.role  = localStorage.getItem('role');

        if(localStorage.getItem('menu') == null) {this.loadData();}
        
        if (this.role != 'Operational Manager' && this.role != 'Chef')
            this.redirectDashboard();
        
        EventBus.$on('bahan', () => {
            this.bahan = JSON.parse(localStorage.getItem('bahan'));
            this.loadData();
        });
        
        EventBus.$on('pesanan', () => {
            this.loadData();
        });
    },

    methods: {
        redirectDashboard() {
            this.$router.push({
                path: '/dashboard',
            });
        },

        loadData() {
            var url = this.$api + '/menu';
            this.loading = true;

            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.menu = response.data.data;
                localStorage.setItem('menu', JSON.stringify(response.data.data));
                this.emitMenu();
                this.loading = false;
            }).catch(()=> {
                this.loading = false;
            });
        },

        editHandler(item) {
            this.inputType = 'Edit';
            this.editId              = item.id_menu;
            this.form.nama_menu      = item.nama_menu;
            this.form.deskripsi_menu = item.deskripsi_menu;
            this.form.unit_menu      = item.unit_menu;
            this.form.harga_menu     = item.harga_menu;
            this.form.kategori_menu  = item.kategori_menu;
            this.form.id_bahan       = item.id_bahan;
            this.dialog              = true;
            this.fillStok(item.id_bahan);
        },

        gambarHandler(item) {
            this.imgTitle    = item.nama_menu;
            this.gambar_menu = item.gambar_menu;
            this.gambarId    = item.id_menu;
            this.dialogImage = true;
        },

        deleteHandler(id) {
            this.deleteId     = id;
            this.dialogDelete = true;
        },

        cancel() {
            this.dialogDelete = false;
            this.dialogImage  = false;
            this.dialog       = false;
            this.inputType    = 'Add';
            this.addImg       = false;
            this.resetForm();
        },

        resetForm() {
            this.form.nama_menu      = '';
            this.form.deskripsi_menu = '';
            this.form.unit_menu      = '';
            this.form.harga_menu     = '';
            this.form.kategori_menu  = '';
            this.form.id_bahan       = '';
            this.form.stok_menu      = '';
            this.form.gambar_bahan   = '';
            this.gambar_menu         = '';
        },

        fillStok(id_bahan) {
            let index=0;
            for(; index<this.bahan.length;index++) {
                if(id_bahan == this.bahan[index].id_bahan)
                    this.form.stok_menu = 
                        Math.floor(this.bahan[index].jml_bahan / 
                            this.bahan[index].stok_per_unit);
            }
        },

        add() {
            this.progressBar = true;
            let addData = {
                nama_menu:      this.form.nama_menu,
                deskripsi_menu: this.form.deskripsi_menu,
                unit_menu:      this.form.unit_menu,
                harga_menu:     this.form.harga_menu,
                kategori_menu:  this.form.kategori_menu,
                id_bahan:       this.form.id_bahan,
            }

            var url = this.$api + '/menu'
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
                if(!err.response.data.message.nama_menu 
                && !err.response.data.message.deskripsi_menu
                && !err.response.data.message.unit_menu
                && !err.response.data.message.harga_menu
                && !err.response.data.message.kategori_menu
                && !err.response.data.message.id_bahan)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.nama_menu)
                        this.error_message= err.response.data.message.nama_menu + "";
                    if(err.response.data.message.deskripsi_menu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.deskripsi_menu;
                    if(err.response.data.message.unit_menu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.unit_menu;
                    if(err.response.data.message.harga_menu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.harga_menu;
                    if(err.response.data.message.kategori_menu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.kategori_menu;
                    if(err.response.data.message.id_bahan)
                        this.error_message= this.error_message + '\n' + err.response.data.message.id_bahan;
                }
                this.color = "red"
                this.snackbar = true;
                this.progressBar = false;
            });
        },

        update() {
            this.progressBar = true;
            let updateData = {
                nama_menu:      this.form.nama_menu,
                deskripsi_menu: this.form.deskripsi_menu,
                unit_menu:      this.form.unit_menu,
                harga_menu:     this.form.harga_menu,
                kategori_menu:  this.form.kategori_menu,
                id_bahan:       this.form.id_bahan,
            }

            var url = this.$api + '/menu/' + this.editId;
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
                if(!err.response.data.message.nama_menu 
                && !err.response.data.message.deskripsi_menu
                && !err.response.data.message.unit_menu
                && !err.response.data.message.harga_menu
                && !err.response.data.message.kategori_menu
                && !err.response.data.message.id_bahan)
                    this.error_message= err.response.data.message;
                else {
                    if(err.response.data.message.nama_menu)
                        this.error_message= err.response.data.message.nama_menu + "";
                    if(err.response.data.message.deskripsi_menu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.deskripsi_menu;
                    if(err.response.data.message.unit_menu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.unit_menu;
                    if(err.response.data.message.harga_menu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.harga_menu;
                    if(err.response.data.message.kategori_menu)
                        this.error_message= this.error_message + '\n' + err.response.data.message.kategori_menu;
                    if(err.response.data.message.id_bahan)
                        this.error_message= this.error_message + '\n' + err.response.data.message.id_bahan;
                }
                this.color = "red"
                this.snackbar = true;
                this.progressBar = false;
            });
        },

        deleteData() {
            this.progressBar = true;

            var url = this.$api + '/menu/' + this.deleteId;
            this.$http.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message = response.data.message;
                this.color = "green"
                this.snackbar = true;
                this.cancel();
                this.loadData();
                this.progressBar = false;
            }).catch(err => {
                this.error_message = err.response.data.message;
                this.color = "red"
                this.snackbar = true;
                this.progressBar = false;
            });

        },

        upload_image(evt) {
            let file = evt.target.files[0];
            let reader = new FileReader();

            if (file['size'] < 2111775) {
                reader.onloadend = (file) => {
                    this.form.gambar_bahan = reader.result;
                }
                this.imgData.append("gambar_menu", file);
                reader.readAsDataURL(file);
            } else {
                this.error_message = "File cannot be larger than 2MB";
                this.color         = "red";
                this.snackbar      = true;
            }
        },

        save_image() {
            this.progressBar = true;
            this.$http.post(this.$api + '/menu/img/' + this.gambarId, this.imgData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }).then(response => {
                this.error_message =      '';
                this.error_message = response.data.message;
                this.snackbar      =    true;
                this.progressBar   =   false;
                this.color         = "green";
                this.loadData();
                this.cancel();
            }).catch(err => {
                this.error_message = '';
                this.error_message = err.response.data.message;
                this.color         = "red";
                this.snackbar      = true;
                this.progressBar   = false;
            });
        },

        emitMenu() {
            EventBus.$emit('menu', '');
        }
    },

    created() {
        if (localStorage.getItem('reloaded')) {
            this.loadData();
            localStorage.removeItem('reloaded');
        } else {
            this.loadData();
            localStorage.setItem('reloaded', false);
        }
    },

    destroyed() {
        this.loadData();
    }
}
</script>
<style scoped>

button, input, select, textarea {
    color: gray;
}
</style>