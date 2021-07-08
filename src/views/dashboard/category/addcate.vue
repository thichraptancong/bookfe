<template>
  <v-container id="user-add" fluid tag="section">
    <v-col class="text-left">
      <router-link to="/users/list">
        <v-btn id="myButton" color="primary" class="mb-5"
          >CLick to view category list!</v-btn
        >
      </router-link>
    </v-col>
    <v-row>
      <v-col cols="12" md="12">
        <base-material-card
          color="success"
          icon="mdi-label"
          title="CATEGORY ADD FORM"
          class="px-5 py-3"
        >
        <form ref="userForm1" class="mt-5" id="app" data-vv-scope="form-1">
          <v-text-field
              v-validate="'required'"
              v-model="title"
              :error-messages="errors.collect('form-1.required')"
              data-vv-name="required"
              color="secondary"
              label="Title"
              name="title"
            />
            <v-card-actions class="pl-0">
              <v-btn
                color="success"
                min-width="100"
                @click.prevent="validateForm('form-1')"
              >
                Submit
              </v-btn>
            </v-card-actions>
          </form>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

const { categoriesApi } = require("../../../apis")

export default {
  name: "DashboardUserAddForms",

  $_veeValidate: {
    validator: "new",
  },

  data: () => ({
    list: [],
    title: ""
  }),
  methods: {
    validateForm(scope) {
      this.$validator.validateAll(scope).then(async (result) => {
        if (result) {
          const result2 = await categoriesApi.addcate({ title: this.title });
          if (result2.data.code === 200) {
            // this.$notificate.showMessage({
            //   content: result2.data.message,
            //   color: "info",
            // });
            this.$router.push("/category/listcate");
          } else {
            this.$notificate.showMessage({
              content: result2.data.message,
              color: "info",
            });
          }
        }
      });
    },
  },
};
</script>
