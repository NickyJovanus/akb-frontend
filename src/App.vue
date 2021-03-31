<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>


@font-face {
    font-family: NothingYouCouldDo;
    src: url("~@/assets/fonts/NothingYouCouldDo-Regular.ttf");
    font-weight: bold;
}

@font-face {
    font-family: ReemKufi;
    src: url("~@/assets/fonts/ReemKufi-Regular.ttf");
    font-weight: bold;
}

html, body {
	font-family: ReemKufi;
  overflow-y: hidden !important;
}

</style>