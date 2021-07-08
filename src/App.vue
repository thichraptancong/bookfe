<template>
<div>
  <Snackbar></Snackbar>
  <router-view />
</div>
</template>

<script>
import Snackbar from "./components/base/SnackBar.vue";

  export default {
    name: 'App',
    components: { Snackbar },
  }
</script>

<style lang="scss">
@import "./assets/css/app";
</style>
