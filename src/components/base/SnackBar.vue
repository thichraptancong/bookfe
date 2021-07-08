<template>
  <v-snackbar
    id="snackbar"
    v-model="show"
    bottom
    color="deep-purple accent-4"
    center
    text
  >
    {{ message }}
    <!-- <v-btn text @click="show = false">Close</v-btn> -->
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: "",
      color: "",
    };
  },

  created() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === "SHOW_TOASK") {
        this.show = true;
        this.message = mutation.payload.content;
        this.color = "success";
      }
    });
  },
};
</script>
<style>
.v-snack__content {
  font-size: 20px;
}
</style>