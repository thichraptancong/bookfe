
<template>
  <v-container id="user-update" fluid tag="section">
    <base-v-component heading="Category" link="components/users" />
    <v-col class="text-left">
      <router-link to="/category/listcate">
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
          title="CATEGORY UPDATE FORM"
          class="px-5 py-3"
        >
          <form ref="cateForm" class="mt-5" id="app" data-vv-scope="form-1">
            <v-text-field
              :error-messages="errors.collect('form-1.number')"
              color="secondary"
              label="Id"
              name="id"
              v-bind:value="cateUpdate._id"
              disabled
            />
            <v-text-field
              v-validate="'required'"
              :error-messages="errors.collect('form-1.required')"
              color="secondary"
              data-vv-name="required"
              label="Title"
              name="title"
              v-model="title"
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
const { categoriesApi } = require("../../../apis");

export default {
  name: "DashboardFormsRegularForms",

  $_veeValidate: {
    validator: "new",
  },
  data: () => ({
    cateUpdate: [],
    cateList: [],
    title: "",
  }),
  created: async function () {
    const result = await categoriesApi.getDetail(this.$route.params.cateId);
        if (result.data.code === 200) {
          this.cateUpdate = result.data.category
        }
    this.title = this.cateUpdate.title
    console.log(this.cateUpdate);
  },
  methods: {
    validateForm(scope) {
      this.$validator.validateAll(scope).then(async (result) => {
        if (result) {
          const result2 = await categoriesApi.update(this.$route.params.cateId, {
            title: this.title
          });
          if (result2.data.code === 200) {
            this.$notificate.showMessage({
              content: result2.data.message,
              color: "info",
            });
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
