import Vue from 'vue';
export const EventBus = new Vue();

/*
----------------------------------------------------------
|        This EventBus is used for loading data even     |
|                when using keep-alive                   |
----------------------------------------------------------
Emitted data list:
'load' for Meja and Ketersediaan
'customer' for Customers and Transaksi
*/