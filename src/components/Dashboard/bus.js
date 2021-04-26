import Vue from 'vue';
export const EventBus = new Vue();

/*
----------------------------------------------------------
|        This EventBus is used for loading data even     |
|                when using keep-alive                   |
----------------------------------------------------------
Emitted data list:
'load' for Meja to Ketersediaan
'customer' for Customers to Transaksi and Reservasi
'pesanan' for Pesanan to Reservasi
'bahan' for Bahan to Menu, Stok and History Stok
*/