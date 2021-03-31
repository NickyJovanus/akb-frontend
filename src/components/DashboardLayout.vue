<!-- @format -->
<template>
    <div class="dashboard">
        <v-navigation-drawer v-model="drawer" class="fullheight purple darken-4" width="256" app>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="title"><v-icon small>mdi-forward</v-icon> Nicky Jovanus </v-list-item-title>
                <v-list-item-subtitle class="ml-5" > 180709851 </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
            <v-list-item
                v-for="item in items"
                :key="item.title"
                link
                tag="router-link"
                :to="item.to"
            >
                <v-list-item-content>
                    <v-list-item-title><v-icon small class="mr-3">{{item.icon}}</v-icon>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        </v-navigation-drawer>
        <v-app-bar app fixed height="75px">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <VSpacer />
            <v-toolbar-items>
                <v-btn text router @click.prevent="logout">
                    <v-icon>mdi-power</v-icon>
                </v-btn>
            </v-toolbar-items>
        </v-app-bar>
        <div class="fullheight pa-5">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: "Dashboard",
    data() {
        return {
            drawer: true,
            items: [
                { title: "Dashboard", icon: "mdi-format-list-bulleted-square", to: "/dashboard" },
                { title: "Product", icon:"mdi-gift", to: "/products" },
            ],
            userid: '',
        };
    },
    methods: {
        logout() {
            var url = this.$api + '/logout'
            if(confirm("Confirm logout?")) {
                axios.post(url, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                }).then(() => {
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];

                    this.$router.push({
                        name: 'login',
                    })
                }).catch(error => {
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                    console.log(error);

                    this.$router.push({
                        name: 'login',
                    })
                });
            }
        }
    },
};
</script>

<style scoped>
.fullheight {
    min-height: 100vh !important;
}
.router {
    text-decoration: none; 
    color: black;
}
</style> 

