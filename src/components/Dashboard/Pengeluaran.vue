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
                                    outlined
                                    clearable
                                ></v-text-field>
                                <v-text-field
                                    v-show="group == 'Tahunan'"
                                    label="Tahun From"
                                    v-model="form.tahun_from"
                                    type="number"
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
                                    outlined
                                    clearable
                                ></v-text-field>
                            <VSpacer/>
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
                print(response.data.data);
                this.progressBar = false;
            }).catch(err => {
                this.error_message = "";
                if(err.response.data.message.tahun)
                    this.error_message= err.response.data.message.tahun + "";
                if(err.response.data.message.tahun_to)
                    this.error_message= err.response.data.message.tahun_to + "";
                if(err.response.data.message.tahun_from)
                    this.error_message= this.error_message + '\n' + err.response.data.message.tahun_from;
                this.color       = "red";
                this.snackbar    =  true;
                this.progressBar = false;
            });
        },

        print(data) {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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
                                            <img src="http://www.atmakoreanbbq.xyz/img/akb.7b3e7de3.png" style="width: 200; height: 200;"/>
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
                                <h2>LAPORAN PENGELUARAN BULANAN</h2>
                            </div>

                            <table style="border-top: solid 1px black; border-bottom: double 3px black; margin: 25px;">
                                <thead>
                                    <tr class="tablehead">
                                        <th><h4 style="margin-right: 10px;">No</h4></th>
                                        <th><h4 style="margin-left: 25px;;">Bulan</h4></th>
                                        <th><h4 style="margin-left: 25px;">Makanan</h4></th>
                                        <th><h4 style="margin-left: 25px;">Side Dish</h4></th>
                                        <th><h4 style="margin-left: 25px;">Minuman</h4></th>
                                        <th><h4 style="margin-left: 25px;">Total Pengeluaran</h4></th>
                                    </tr>
                                    <style>.tablehead th {border-bottom: double 3px black;}</style>
                                </thead>
                                <tbody>
                                    <!-- loop -->
                                    <tr class="itemrow">
                                        <td><p>1</p></td>
                                        <td><p>Januari</p></td>
                                        <td><p style="text-align: right;">######</p></td>
                                        <td><p style="text-align: right;">######</p></td>
                                        <td><p style="text-align: right;">######</p></td>
                                        <td><p style="text-align: right;">######</p></td>
                                    </tr>
                                    <!-- loop -->
                                    <style>.itemrow td {border-bottom: solid .5px black;}</style>

                                </tbody>
                            </table>
                            <br>
                            <div style="text-align: center; font-size: 14px;">
                                <h5>Printed `+ month +` `+ date.getDate() +`, `+ date.getFullYear() +` `+ currentHours +`:`+ currentMinutes +`:`+ currentSeconds +` `+ ampm +`</h5>
                                <p>Printed by `+ localStorage.getItem("nama") +`</p>
                            </div>
                            <br><br><br>
                        </div>
                    </div>
                </body>
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