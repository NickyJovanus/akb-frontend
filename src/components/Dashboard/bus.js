import Vue from 'vue';
export const EventBus = new Vue();

/*

----------------------------------------------------------
|        This EventBus is used for sending signal        |
|               when using <keep-alive>                  |
----------------------------------------------------------

Emitted data list:
'load' for Meja to Ketersediaan
'customer' for Customers to Transaksi and Reservasi
'pesanan' for Pesanan to Reservasi and Menu
'bahan' for Bahan to Menu, Stok, History Stok and Reports
'menu' for Menu to Pesanan, Reservasi, Transaksi and Reports

*/