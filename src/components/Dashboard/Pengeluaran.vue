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
                <h2>Laporan Pengeluaran {{ group }}</h2>
            </div>
            <div class="mt-5 table-section justify-center">
                
                <v-card class="ma-6 text-center">
                    
                    <v-card-actions>
                        <VSpacer/>
                        <v-radio-group v-model="group">
                            <v-radio
                                v-for="type in ['Bulanan','Tahunan']"
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
                                <v-text-field
                                    v-show="group == 'Bulanan'"
                                    label="Tahun"
                                    v-model="form.tahun"
                                    type="number"
                                    :disabled="progressBar"
                                    outlined
                                    clearable
                                ></v-text-field>
                                <v-text-field
                                    v-show="group == 'Tahunan'"
                                    label="Tahun From"
                                    v-model="form.tahun_from"
                                    type="number"
                                    :disabled="progressBar"
                                    outlined
                                    clearable
                                ></v-text-field>
                            <VSpacer/>
                        </v-card-actions>
                    </transition>

                    <transition name="bounce">
                        <v-card-actions v-show="group == 'Tahunan'">
                            <VSpacer/>
                                <v-text-field
                                    label="Tahun To"
                                    v-model="form.tahun_to"
                                    type="number"
                                    :disabled="progressBar"
                                    outlined
                                    clearable
                                ></v-text-field>
                            <VSpacer/>
                        </v-card-actions>
                    </transition>

                    <v-card-actions>
                        <VSpacer/>
                        <v-btn @click="submit"
                                :disabled="progressBar">Submit</v-btn>
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
    name: "Pengeluaran",
    data() {
        return {
            role:             '',
            form: {
                tahun:        '',
                tahun_from:   '',
                tahun_to:     '',
            },
            error_message:    '',
            color:            '',
            group:     'Bulanan',
            data:             [],
            snackbar:      false,
            progressBar:   false,
        }
    },

    mounted() {
        this.role = localStorage.getItem('role');

        if (this.role != 'Operational Manager' && this.role != 'Owner')
            this.redirectDashboard();
    },

    methods: {
        redirectDashboard() {
            this.$router.push({
                path: '/dashboard',
            });
        },

        submit() {
            this.progressBar = true;
            var url = "";
            var data;
            if(this.group == "Bulanan") {
                url = this.$api + '/laporan/pengeluaran/bulanan'
                data = {
                    tahun: this.form.tahun,
                }
            } else {
                url = this.$api + '/laporan/pengeluaran/tahunan'
                data = {
                    tahun_from: this.form.tahun_from,
                    tahun_to:   this.form.tahun_to,
                }
            }

            this.$http.post(url, data, {
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            }).then(response => {
                this.printLaporan(response.data.data);
                this.progressBar = false;
            }).catch(err => {
                this.error_message = "";
                try {
                    if(err.response.data.message.tahun)
                        this.error_message= err.response.data.message.tahun + "";
                    if(err.response.data.message.tahun_to)
                        this.error_message= err.response.data.message.tahun_to + "";
                    if(err.response.data.message.tahun_from)
                        this.error_message= this.error_message + '\n' + err.response.data.message.tahun_from;
                } catch {
                    this.error_message= "Connection error. Please try again.";
                }
                this.color       = "red";
                this.snackbar    =  true;
                this.progressBar = false;
            });
        },

        printLaporan(data) {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const fullMonth = ["Januari", "Februari", "Maret", "April", "Mei", "Juni","Juli", "Agustus", "September", "Oktober", "November", "Desember"];
            const date = new Date();
            const month = monthNames[date.getMonth()];
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
            var mywindow = window.open('', 'PRINT', 'height=1000,width=800');
            var found = false;

            mywindow.document.write(`
            <html>
                <head><title> Laporan Pengeluaran - Atma Korean BBQ</title></head>
                
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
                                <h2>LAPORAN PENGELUARAN `); 
                    if(this.group == "Bulanan")
                        mywindow.document.write(`BULANAN`) 
                    else mywindow.document.write(`TAHUNAN`);

                    mywindow.document.write(`</h2>
                            </div>

                            <div>
                                <p>`); 
                    if(this.group == "Bulanan")
                        mywindow.document.write(`Tahun: `  + this.form.tahun)
                    else mywindow.document.write(`Tahun: ` + this.form.tahun_from + ' s/d ' + this.form.tahun_to);

                    mywindow.document.write(`</p>
                            </div>

                            <table style="border-top: solid 1px black; border-bottom: double 3px black; margin: 25px;">
                                <thead>
                                    <tr class="tablehead">
                                        <th><h4 style="margin-right: 10px;">No</h4></th>
                                        <th><h4 style="margin-left: 25px;;">`); 
                    if(this.group == "Bulanan")
                        mywindow.document.write(`Bulan`) 
                    else mywindow.document.write(`Tahun`);

                    mywindow.document.write(`</h4></th>
                                        <th><h4 style="margin-left: 25px;">Makanan</h4></th>
                                        <th><h4 style="margin-left: 25px;">Side Dish</h4></th>
                                        <th><h4 style="margin-left: 25px;">Minuman</h4></th>
                                        <th><h4 style="margin-left: 25px;">Total Pengeluaran</h4></th>
                                    </tr>
                                    <style>.tablehead th {border-bottom: double 3px black;}</style>
                                </thead>
                                <tbody>`);

            if(this.group == "Bulanan") {
                let foundBulan = false;
                for(var x = 0; x < fullMonth.length; x++) {
                    foundBulan = false
                    for(var indexBulan = 0; indexBulan < data.length; indexBulan++) {
                        if(data[indexBulan].Bulan == x+1) {
                            if(data[indexBulan].Makanan == null)
                                data[indexBulan].Makanan = 0;
                            
                            if(data[indexBulan].Side_dish == null)
                                data[indexBulan].Side_dish = 0;
                            
                            if(data[indexBulan].Minuman == null)
                                data[indexBulan].Minuman = 0;
                            
                            if(data[indexBulan].Total_pengeluaran == null)
                                data[indexBulan].Total_pengeluaran = 0;

                            mywindow.document.write(`
                                <tr class="itemrow">
                                    <td><p>`+ (x + 1) +`</p></td>
                                    <td><p>`+ fullMonth[x] +`</p></td>
                                    <td><p style="text-align: right;">`+ data[indexBulan].Makanan.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +`</p></td>
                                    <td><p style="text-align: right;">`+ data[indexBulan].Side_dish.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +`</p></td>
                                    <td><p style="text-align: right;">`+ data[indexBulan].Minuman.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +`</p></td>
                                    <td><p style="text-align: right;">`+ data[indexBulan].Total_pengeluaran.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +`</p></td>
                                </tr>`);

                            foundBulan = true;
                        }
                    }
                    if(!foundBulan) {
                        mywindow.document.write(`
                            <tr class="itemrow">
                                <td><p>`+ (x + 1) +`</p></td>
                                <td><p>`+ fullMonth[x] +`</p></td>
                                <td><p style="text-align: right;">0</p></td>
                                <td><p style="text-align: right;">0</p></td>
                                <td><p style="text-align: right;">0</p></td>
                                <td><p style="text-align: right;">0</p></td>
                            </tr>`);
                    }
                }
            } else {
                var year = this.form.tahun_from;
                var indexyear = 1;
                for(; year<= this.form.tahun_to; year++) {
                    found = false;
                    for(var index = 0; index < data.length; index++) {
                        if(data[index].Tahun == year){
                            if(data[index].Makanan == null)
                                data[index].Makanan = 0;
                            
                            if(data[index].Side_dish == null)
                                data[index].Side_dish = 0;
                            
                            if(data[index].Minuman == null)
                                data[index].Minuman = 0;
                            
                            if(data[index].Total_pengeluaran == null)
                                data[index].Total_pengeluaran = 0;
                            mywindow.document.write(`
                                <tr class="itemrow">
                                    <td><p>`+ indexyear +`</p></td>
                                    <td><p>`+ data[index].Tahun +`</p></td>
                                    <td><p style="text-align: right;">`+ data[index].Makanan.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +`</p></td>
                                    <td><p style="text-align: right;">`+ data[index].Side_dish.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +`</p></td>
                                    <td><p style="text-align: right;">`+ data[index].Minuman.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +`</p></td>
                                    <td><p style="text-align: right;">`+ data[index].Total_pengeluaran.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") +`</p></td>
                                </tr>`);
                            found = true;
                        }
                    }
                    if(!found) {
                        mywindow.document.write(`
                            <tr class="itemrow">
                                <td><p>`+ indexyear +`</p></td>
                                <td><p>`+ year +`</p></td>
                                <td><p style="text-align: right;">0</p></td>
                                <td><p style="text-align: right;">0</p></td>
                                <td><p style="text-align: right;">0</p></td>
                                <td><p style="text-align: right;">0</p></td>
                            </tr>`);
                    }
                    indexyear++;
                }

            }
                                    
            mywindow.document.write(`
                                    <style>.itemrow td {border-bottom: solid .5px black;}</style>

                                </tbody>
                            </table>
                            <br>
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