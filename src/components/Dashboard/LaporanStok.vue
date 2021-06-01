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
                <h2>Laporan Stok {{ group }}</h2>
            </div>
            <div class="mt-5 table-section justify-center">
                
                <v-card class="ma-6 text-center">
                    
                    <v-card-actions>
                        <VSpacer/>
                        <v-radio-group v-model="group">
                            <v-radio
                                v-for="type in ['Bulanan','Custom']"
                                :key="type"
                                :label="`${type}`"
                                :value="type"
                            ></v-radio>
                        </v-radio-group>
                        <VSpacer/>
                    </v-card-actions>

                    <transition name="bounce">
                        <v-card-actions>
                            <VSpacer/>
                            <v-row v-show="group == 'Bulanan'">
                                
                                <v-col>
                                    <v-select
                                        v-model="form.bulan"
                                        outlined
                                        label="Bulan"
                                        :items="bulan"
                                        :disabled="progressBar"
                                        item-text="index"
                                        three-line
                                        required
                                    >
                                        <template slot="selection" slot-scope="data">
                                            {{ data.item.bulan }}
                                        </template>
                                        <template slot="item" slot-scope="data">
                                            {{ data.item.bulan }}
                                        </template>
                                    </v-select>
                                </v-col>

                                <v-col>
                                    <v-text-field
                                        label="Tahun"
                                        v-model="form.tahun"
                                        :disabled="progressBar"
                                        type="number"
                                        outlined
                                        clearable
                                    ></v-text-field>
                                </v-col>
                            </v-row>

                            <v-menu
                                ref="tanggal_menu1"
                                v-model="menu1"
                                :close-on-content-click="false"
                                :return-value.sync="form.date_from"
                                transition="scale-transition"
                                offset-y
                                min-width="290px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-show="group == 'Custom'"
                                    label="Date (From)"
                                    v-model="form.date_from"
                                    prepend-icon="mdi-calendar"
                                    :disabled="progressBar"
                                    clearable
                                    readonly
                                    outlined
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="form.date_from"
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="red"
                                    @click="menu1 = false"
                                >Cancel</v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.tanggal_menu1.save(form.date_from)"
                                >OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                            <VSpacer/>
                        </v-card-actions>
                    </transition>

                    <transition name="bounce">
                        <v-card-actions v-show="group == 'Custom'">
                            <VSpacer/>
                                <v-menu
                                    ref="tanggal_menu2"
                                    v-model="menu2"
                                    :close-on-content-click="false"
                                    :return-value.sync="form.date_to"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-show="group == 'Custom'"
                                        label="Date (To)"
                                        v-model="form.date_to"
                                        prepend-icon="mdi-calendar"
                                        :disabled="progressBar"
                                        clearable
                                        readonly
                                        outlined
                                        v-bind="attrs"
                                        v-on="on"
                                    ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        v-model="form.date_to"
                                    >
                                    <v-spacer></v-spacer>
                                    <v-btn
                                        text
                                        color="red"
                                        @click="menu2 = false"
                                    >Cancel</v-btn>
                                    <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.tanggal_menu2.save(form.date_to)"
                                    >OK</v-btn>
                                    </v-date-picker>
                                </v-menu>
                            <VSpacer/>
                        </v-card-actions>

                    </transition>

                    
                    <transition name="bounce">
                        <v-card-actions v-show="group == 'Bulanan'">
                            <v-col></v-col>
                            <v-col></v-col>

                            <v-col>
                                <v-select
                                    v-model="form.id_menu"
                                    outlined
                                    label="Nama Menu"
                                    :disabled="isAll || progressBar"
                                    :items="menu"
                                    item-text="id_menu"
                                    three-line
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
                                <v-checkbox
                                    v-model="isAll"
                                    label="All Menu">
                                </v-checkbox>
                            </v-col>

                            
                            <v-col></v-col>

                        </v-card-actions>
                    </transition>

                    <v-card-actions>
                        <VSpacer/>
                        <v-btn @click="submit">Submit</v-btn>
                        <VSpacer/>
                    </v-card-actions>

                    <v-flex>
                        <v-progress-linear v-show="progressBar" slot="progress" color="yellow" indeterminate></v-progress-linear>
                    </v-flex>
                    
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
        </div>

        <!-- snackbar -->
        <v-snackbar v-model="snackbar" v-bind:color="color" timeout="10000" bottom left style='z-index: 10000;'>
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
    name: "LaporanStok",
    data() {
        return {
            role:             '',
            form: {
                id_menu:      '',
                tahun:        '',
                bulan:        '',
                date_from:    '',
                date_to:      '',
            },
            error_message:    '',
            color:            '',
            group:     'Bulanan',
            data:             [],
            menu:             [],
            bahan:            [],
            snackbar:      false,
            progressBar:   false,
            menu1:         false,
            menu2:         false,
            isAll:         false,
            bulan: [{index: 1,  bulan: "Januari"     },
                    {index: 2,  bulan: "Februari"    },
                    {index: 3,  bulan: "Maret"       },
                    {index: 4,  bulan: "April"       },
                    {index: 5,  bulan: "Mei"         },
                    {index: 6,  bulan: "Juni"        },
                    {index: 7,  bulan: "Juli"        }, 
                    {index: 8,  bulan: "Agustus"     },
                    {index: 9,  bulan: "September"   },
                    {index: 10, bulan: "Oktober"     },
                    {index: 11, bulan: "November"    },
                    {index: 12, bulan: "Desember"    }],
        }
    },

    mounted() {
        this.role  = localStorage.getItem('role');
        this.menu  = JSON.parse(localStorage.getItem('menu'));
        this.bahan = JSON.parse(localStorage.getItem('bahan'));

        if(localStorage.getItem('menu') == null || localStorage.getItem('bahan') == null) {this.loadData();}

        if (this.role != 'Operational Manager' && this.role != 'Owner')
            this.redirectDashboard();
    },

    methods: {
        redirectDashboard() {
            this.$router.push({
                path: '/dashboard',
            });
        },

        loadData() {
            var url = this.$api + '/menu';

            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.menu = response.data.data;
                localStorage.setItem('menu', JSON.stringify(response.data.data));
            })

            var url2 = this.$api + '/bahan';

            this.$http.get(url2, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.bahan = response.data.data;
                localStorage.setItem('bahan', JSON.stringify(response.data.data));
            })
        },

        submit() {
            this.progressBar = true;
            var url = "";
            var data;
            if(this.group == "Bulanan") {
                url = this.$api + '/laporan/stok/bulanan'
                data = {
                    allMenu: this.isAll.toString(),
                    id_menu: this.form.id_menu,
                    tahun:   this.form.tahun,
                    bulan:   this.form.bulan,
                }
            } else {
                url = this.$api + '/laporan/stok/custom'
                data = {
                    date_from: this.form.date_from,
                    date_to:   this.form.date_to,
                }
            }

            this.$http.post(url, data, {
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            }).then(response => {
                this.printLaporan(response.data.data);
                this.progressBar = false;
            }).catch(err => {
                this.error_message = "";
                if(err.response.data.message.tahun)
                    this.error_message= err.response.data.message.tahun + "";
                if(err.response.data.message.bulan)
                    this.error_message= this.error_message + '\n' + err.response.data.message.bulan;
                if(err.response.data.message.id_menu)
                    this.error_message= this.error_message + '\n' + "The Nama Menu field is required.";
                if(err.response.data.message.date_from)
                    this.error_message= err.response.data.message.date_from + "";
                if(err.response.data.message.date_to)
                    this.error_message= this.error_message + '\n' + err.response.data.message.date_to;
                this.color       = "red";
                this.snackbar    =  true;
                this.progressBar = false;
            });
        },

        printLaporan(data) {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const fullMonth = ["-","Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            const date = new Date();
            const month = monthNames[date.getMonth()];

            var daysInMonth = new Date(this.form.tahun, this.form.bulan, 0).getDate();

            var currentDate = date.getDate();
            currentDate = ("0" + currentDate).slice(-2);
            var currentMonth = date.getMonth()+1;
            currentMonth = ("0" + currentMonth).slice(-2);
            var currentYear = date.getFullYear();
            currentYear = ("0" + currentYear).slice(-2);
            var currentHours = date.getHours();
            currentHours = ("0" + currentHours).slice(-2);
            var currentMinutes = date.getMinutes();
            currentMinutes = ("0" + currentMinutes).slice(-2);
            var currentSeconds = date.getSeconds();
            currentSeconds = ("0" + currentSeconds).slice(-2);
            var ampm = "";
            if(date.getHours() >= 12)
                ampm = "PM";
            else
                ampm = "AM";
            
            var mywindow = window.open('', 'PRINT', 'height=1000,width=1080');
            var found = false;

            mywindow.document.write(`
            <html>
                <head><title> Laporan Stok Bahan - Atma Korean BBQ</title></head>
                
                <body>
                    <div style="width: 100%; text-align: -webkit-center; font-family: sans-serif;">
                        <div style="border: solid 3px black; margin: 50px;">
                            <br>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style="border-bottom: black 3px dashed;">
                                            <img src="` + require("@/assets/images/AKB-logo 1080.png")  + `" style="width: 200; height: 200;"/>
                                            <br><br>
                                        </td>
                                        <td style="text-align: center; border-bottom: black 3px dashed;">
                                            <h1 style="color: #4b4b77; margin: 0;">ATMA KOREAN BBQ</h1><br>
                                            <h4 style="color: #d24848; margin: 0;">FUN PLACE TO GRILL!</h4><br>
                                            Jl. Babarsari No.43 Yogyakarta<br>
                                            552181<br>
                                            Telp. (0274) 487711<br>
                                            https://atmakoreanbbq.web.app/
                                        </td>
                                    </tr>
                                    <tr>
                                        
                                    </tr>
                                </tbody>
                            </table>
                            
                            <div>
                                <h2>LAPORAN STOK BAHAN</h2>
                            </div>
                            <div>

                                <p>`); 
                    if(this.group == "Bulanan" && !this.isAll) {
                        for(let indexMenu = 0; indexMenu < this.menu.length; indexMenu++) {
                            if(this.menu[indexMenu].id_menu == this.form.id_menu)
                            mywindow.document.write(`ITEM: `  + this.menu[indexMenu].nama_menu);
                        }
                    }
                    else mywindow.document.write(`ITEM: ALL`);

                    mywindow.document.write(`</p>
                            </div>

                            <div>
                                <p>`); 
                    if(this.group == "Bulanan")
                        mywindow.document.write(`PERIODE: ` + fullMonth[this.form.bulan] + ` ` +this.form.tahun)
                    else mywindow.document.write(`PERIODE: CUSTOM (` + this.form.date_from + ' s/d ' + this.form.date_to +`)`);

                    mywindow.document.write(`</p>
                            </div>`);

                    if(this.group == "Custom") {
                    mywindow.document.write(`
                <table style="border-top: solid 1px black; border-bottom: double 3px black; margin: 25px;">
                    <thead>
                        <tr class="tabletitle">
                            <th style="text-align: left;">MAKANAN</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <style>.tabletitle th {border-bottom: solid 1px black; background: rgb(226, 226, 226); margin: 0;}
                                .tabletitle{ background: rgb(226, 226, 226); }</style>
                    </thead>
                    <thead>
                        <tr class="tablehead">
                            <th><h4 style="margin-right: 10px;">No</h4></th>
                            <th><h4 style="margin-left: 10px;;">Item Menu</h4></th>
                            <th><h4 style="margin-left: 5px;">Unit</h4></th>
                            <th><h4 style="margin-left: 10px;">Incoming Stock</h4></th>
                            <th><h4 style="margin-left: 10px;">Remaining Stock</h4></th>
                            <th><h4 style="margin-left: 10px;">Waste Stock</h4></th>
                        </tr>
                        <style>.tablehead th {border-bottom: double 3px black;}</style>
                    </thead>
                    <tbody>`);

                    var noMakanan = 1;
                    for(let indexMakanan = 0; indexMakanan < this.menu.length; indexMakanan++) {
                        found = false;
                        if(this.menu[indexMakanan].kategori_menu == 'makanan') {

                            for(let indexData = 0; indexData < data.length; indexData++) {
                                if(data[indexData].Item_id  == this.menu[indexMakanan].id_bahan 
                                && data[indexData].Kategori == this.menu[indexMakanan].kategori_menu) {

                                    if(data[indexData].Incoming_stock == null
                                        || data[indexData].Incoming_stock == 0)
                                        data[indexData].Incoming_stock   = "-";
                                    
                                    if(data[indexData].Remaining_stock == null
                                        || data[indexData].Remaining_stock == 0)
                                        data[indexData].Remaining_stock  = "-";
                                    
                                    if(data[indexData].Waste_stock == null
                                        || data[indexData].Waste_stock == 0)
                                        data[indexData].Waste_stock      = "-";

                                    mywindow.document.write(`
                                            <tr class="itemrow">
                                                <td><p>`+ noMakanan +`</p></td>
                                                <td><p>`+ data[indexData].Item_menu +`</p></td>
                                                <td><p style="text-align: right;">`+ data[indexData].Unit +`</p></td>
                                                <td><p style="text-align: right;">`+ data[indexData].Incoming_stock +`</p></td>
                                                <td><p style="text-align: right;">`+ data[indexData].Remaining_stock +`</p></td>
                                                <td><p style="text-align: right;">`+ data[indexData].Waste_stock +`</p></td>
                                            </tr>`);
                                    found = true;
                                }
                            }

                            if(!found) {
                                for(let indexBahan = 0; indexBahan < this.bahan.length; indexBahan++) {
                                    if(this.menu[indexMakanan].id_bahan == this.bahan[indexBahan].id_bahan)
                                    mywindow.document.write(`
                                            <tr class="itemrow">
                                                <td><p>`+ noMakanan +`</p></td>
                                                <td><p>`+ this.menu[indexMakanan].nama_menu +`</p></td>
                                                <td><p style="text-align: right;">`+ this.bahan[indexBahan].unit_bahan +`</p></td>
                                                <td><p style="text-align: right;">-</p></td>
                                                <td><p style="text-align: right;">-</p></td>
                                                <td><p style="text-align: right;">-</p></td>
                                            </tr>`);
                                }
                            }
                            noMakanan++;
                        }
                    }
                        
                mywindow.document.write(`
                        <style>.itemrow td {border-bottom: solid .5px black;}</style>
                    </tbody>
                </table>
                <br>

                <table style="border-top: solid 1px black; border-bottom: double 3px black; margin: 25px;">
                    <thead>
                        <tr class="tabletitle">
                            <th style="text-align: left;">SIDE DISH</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <style>.tabletitle th {border-bottom: solid 1px black; background: rgb(226, 226, 226); margin: 0;}
                                .tabletitle{ background: rgb(226, 226, 226); }</style>
                    </thead>
                    <thead>
                        <tr class="tablehead">
                            <th><h4 style="margin-right: 10px;">No</h4></th>
                            <th><h4 style="margin-left: 10px;;">Item Menu</h4></th>
                            <th><h4 style="margin-left: 5px;">Unit</h4></th>
                            <th><h4 style="margin-left: 10px;">Incoming Stock</h4></th>
                            <th><h4 style="margin-left: 10px;">Remaining Stock</h4></th>
                            <th><h4 style="margin-left: 10px;">Waste Stock</h4></th>
                        </tr>
                        <style>.tablehead th {border-bottom: double 3px black;}</style>
                    </thead>
                    <tbody>`);

                    var noSide = 1;
                    for(let indexSide = 0; indexSide < this.menu.length; indexSide++) {
                        found = false;
                        if(this.menu[indexSide].kategori_menu == 'side dish') {

                            for(let indexData = 0; indexData < data.length; indexData++) {
                                if(data[indexData].Item_id  == this.menu[indexSide].id_bahan 
                                && data[indexData].Kategori == this.menu[indexSide].kategori_menu) {
                                    
                                    if(data[indexData].Incoming_stock == null
                                        || data[indexData].Incoming_stock == 0)
                                        data[indexData].Incoming_stock   = "-";
                                    
                                    if(data[indexData].Remaining_stock == null
                                        || data[indexData].Remaining_stock == 0)
                                        data[indexData].Remaining_stock  = "-";
                                    
                                    if(data[indexData].Waste_stock == null
                                        || data[indexData].Waste_stock == 0)
                                        data[indexData].Waste_stock      = "-";

                                    mywindow.document.write(`
                                            <tr class="itemrow">
                                                <td><p>`+ noSide +`</p></td>
                                                <td><p>`+ data[indexData].Item_menu +`</p></td>
                                                <td><p style="text-align: right;">`+ data[indexData].Unit +`</p></td>
                                                <td><p style="text-align: right;">`+ data[indexData].Incoming_stock +`</p></td>
                                                <td><p style="text-align: right;">`+ data[indexData].Remaining_stock +`</p></td>
                                                <td><p style="text-align: right;">`+ data[indexData].Waste_stock +`</p></td>
                                            </tr>`);
                                    found = true;
                                }
                            }

                            if(!found) {
                                for(let indexBahan = 0; indexBahan < this.bahan.length; indexBahan++) {
                                    if(this.menu[indexSide].id_bahan == this.bahan[indexBahan].id_bahan)
                                    mywindow.document.write(`
                                            <tr class="itemrow">
                                                <td><p>`+ noSide +`</p></td>
                                                <td><p>`+ this.menu[indexSide].nama_menu +`</p></td>
                                                <td><p style="text-align: right;">`+ this.bahan[indexBahan].unit_bahan +`</p></td>
                                                <td><p style="text-align: right;">-</p></td>
                                                <td><p style="text-align: right;">-</p></td>
                                                <td><p style="text-align: right;">-</p></td>
                                            </tr>`);
                                }
                            }
                            noSide++;
                        }
                    }
                        
                mywindow.document.write(`
                        <style>.itemrow td {border-bottom: solid .5px black;}</style>
                    </tbody>
                </table>
                <br>

                <table style="border-top: solid 1px black; border-bottom: double 3px black; margin: 25px;">
                    <thead>
                        <tr class="tabletitle">
                            <th style="text-align: left;">MINUMAN</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        <style>.tabletitle th {border-bottom: solid 1px black; background: rgb(226, 226, 226); margin: 0;}
                                .tabletitle{ background: rgb(226, 226, 226); }</style>
                    </thead>
                    <thead>
                        <tr class="tablehead">
                            <th><h4 style="margin-right: 10px;">No</h4></th>
                            <th><h4 style="margin-left: 10px;;">Item Menu</h4></th>
                            <th><h4 style="margin-left: 5px;">Unit</h4></th>
                            <th><h4 style="margin-left: 10px;">Incoming Stock</h4></th>
                            <th><h4 style="margin-left: 10px;">Remaining Stock</h4></th>
                            <th><h4 style="margin-left: 10px;">Waste Stock</h4></th>
                        </tr>
                        <style>.tablehead th {border-bottom: double 3px black;}</style>
                    </thead>
                    <tbody>`);

                    var noMinuman = 1;
                    for(let indexMinuman = 0; indexMinuman < this.menu.length; indexMinuman++) {
                        found = false;
                        if(this.menu[indexMinuman].kategori_menu == 'minuman') {

                            for(let indexData = 0; indexData < data.length; indexData++) {
                                if(data[indexData].Item_id  == this.menu[indexMinuman].id_bahan 
                                && data[indexData].Kategori == this.menu[indexMinuman].kategori_menu) {

                                    if(data[indexData].Incoming_stock == null
                                        || data[indexData].Incoming_stock == 0)
                                        data[indexData].Incoming_stock   = "-";
                                    
                                    if(data[indexData].Remaining_stock == null
                                        || data[indexData].Remaining_stock == 0)
                                        data[indexData].Remaining_stock  = "-";
                                    
                                    if(data[indexData].Waste_stock == null
                                        || data[indexData].Waste_stock == 0)
                                        data[indexData].Waste_stock      = "-";

                                    mywindow.document.write(`
                                            <tr class="itemrow">
                                                <td><p>`+ noMinuman +`</p></td>
                                                <td><p>`+ data[indexData].Item_menu +`</p></td>
                                                <td><p style="text-align: right;">`+ data[indexData].Unit +`</p></td>
                                                <td><p style="text-align: right;">`+ data[indexData].Incoming_stock +`</p></td>
                                                <td><p style="text-align: right;">`+ data[indexData].Remaining_stock +`</p></td>
                                                <td><p style="text-align: right;">`+ data[indexData].Waste_stock +`</p></td>
                                            </tr>`);
                                    found = true;
                                }
                            }

                            if(!found) {
                                for(let indexBahan = 0; indexBahan < this.bahan.length; indexBahan++) {
                                    if(this.menu[indexMinuman].id_bahan == this.bahan[indexBahan].id_bahan)
                                    mywindow.document.write(`
                                            <tr class="itemrow">
                                                <td><p>`+ noMinuman +`</p></td>
                                                <td><p>`+ this.menu[indexMinuman].nama_menu +`</p></td>
                                                <td><p style="text-align: right;">`+ this.bahan[indexBahan].unit_bahan +`</p></td>
                                                <td><p style="text-align: right;">-</p></td>
                                                <td><p style="text-align: right;">-</p></td>
                                                <td><p style="text-align: right;">-</p></td>
                                            </tr>`);
                                }
                            }
                            noMinuman++;
                        }
                    }
                        
                mywindow.document.write(`
                        <style>.itemrow td {border-bottom: solid .5px black;}</style>
                    </tbody>
                </table>
                <br>`);
                    } else if(this.group == "Bulanan") {
                        mywindow.document.write(`
                <table style="border-top: solid 1px black; border-bottom: double 3px black; margin: 20px;">
                    <thead>
                        <tr class="tablehead">
                            <th><h4 style="margin-right: 10px;">No</h4></th>
                            <th><h4 style="margin-left: 10px;;">Tanggal</h4></th>
                            <th><h4 style="margin-left: 5px;">Unit</h4></th>
                            <th><h4 style="margin-left: 10px;">Incoming Stock</h4></th>
                            <th><h4 style="margin-left: 10px;">Remaining Stock</h4></th>
                            <th><h4 style="margin-left: 10px;">Waste Stock</h4></th>
                        </tr>
                        <style>.tablehead th {border-bottom: double 3px black;}</style>
                    </thead>
                    <tbody>`);

                    let currentHari = 1;
                    for(let indexHari = 0; indexHari < daysInMonth; indexHari++) {
                        found = false;
                        for(let indexData = 0; indexData < data.length; indexData++) {
                            let dataDate = data[indexData].tanggal_stok.slice(8,10);
                            let compareDate = ("0" + currentHari).slice(-2);
                            if(dataDate == compareDate) {
                                if(data[indexData].Unit == null)
                                    data[indexData].Unit   = "-";

                                if(data[indexData].Incoming_stock == null
                                    || data[indexData].Incoming_stock == 0)
                                    data[indexData].Incoming_stock   = "-";
                                
                                if(data[indexData].Remaining_stock == null
                                    || data[indexData].Remaining_stock == 0)
                                    data[indexData].Remaining_stock  = "-";
                                
                                if(data[indexData].Waste_stock == null
                                    || data[indexData].Waste_stock == 0)
                                    data[indexData].Waste_stock      = "-";

                                mywindow.document.write(`
                                    <tr class="itemrow">
                                        <td><p>`+ (indexHari + 1) +`</p></td>
                                        <td><p>`+ currentHari +` `+ fullMonth[this.form.bulan] +` ` + this.form.tahun +`</p></td>
                                        <td><p style="text-align: right;">`+ data[indexData].Unit +`</p></td>
                                        <td><p style="text-align: right;">`+ data[indexData].Incoming_stock +`</p></td>
                                        <td><p style="text-align: right;">`+ data[indexData].Remaining_stock +`</p></td>
                                        <td><p style="text-align: right;">`+ data[indexData].Waste_stock +`</p></td>
                                    </tr>`);
                                found = true;
                            }
                        }
                        if(!found) {
                            mywindow.document.write(`
                                <tr class="itemrow">
                                    <td><p>`+ (indexHari + 1) +`</p></td>
                                    <td><p>`+ currentHari +` `+ fullMonth[this.form.bulan] +` ` + this.form.tahun +`</p></td>
                                    <td><p style="text-align: right;">-</p></td>
                                    <td><p style="text-align: right;">-</p></td>
                                    <td><p style="text-align: right;">-</p></td>
                                    <td><p style="text-align: right;">-</p></td>
                                </tr>`);
                        }
                        currentHari++;
                    }

                    mywindow.document.write(`
                        <style>.itemrow td {border-bottom: solid .5px black;}</style>
                    </tbody>
                </table>
                        `);
                    }
                mywindow.document.write(`
                <div style="text-align: center; font-size: 14px;">
                    <h5>Printed `+ month +` `+ date.getDate() +`, `+ date.getFullYear() +` `+ currentHours +`:`+ currentMinutes +`:`+ currentSeconds +` `+ ampm +`</h5>
                    <p>Printed by `+ localStorage.getItem("name") +`</p>
                </div>
                <br><br><br>
            </div>
        </div>
    </body>
    <style>table {border-collapse: collapse;}</style>
</html>
            `);

            mywindow.document.close();
            mywindow.focus();

            mywindow.print();

            return true;
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

}
</script>

<style scoped>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>