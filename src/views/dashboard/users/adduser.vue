<template>
  <v-container id="user-add" fluid tag="section">
    <v-col class="text-left">
      <router-link to="/users/listuser">
        <v-btn id="myButton" color="primary" class="mb-5"
          >CLick to view user list!</v-btn
        >
      </router-link>
    </v-col>
    <v-row>
      <v-col cols="12" md="12">
        <base-material-card
          color="success"
          icon="mdi-email"
          title="USER ADD FORM"
          class="px-5 py-3"
        >
          <form ref="userForm1" class="mt-5" id="app" data-vv-scope="form-1">
            <v-text-field
              v-validate="'required'"
              v-model="firstname"
              :error-messages="errors.collect('form-1.required')"
              data-vv-name="required"
              color="secondary"
              label="First Name"
              name="firstname"
            />
            <v-text-field
              v-validate="'required'"
              v-model="lastname"
              :error-messages="errors.collect('form-1.required')"
              color="secondary"
              data-vv-name="required"
              label="Last Name"
              name="lastname"
            />
            <v-text-field
              v-validate="'required'"
              v-model="username"
              :error-messages="errors.collect('form-1.required')"
              color="secondary"
              data-vv-name="required"
              label="Username"
              name="username"
            />
            <v-text-field
              v-validate="'required'"
              v-model="password"
              :error-messages="errors.collect('form-1.required')"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              color="secondary"
              data-vv-name="required"
              label="Password"
              name="password"
              @click:append="show1 = !show1"
            />
            <v-select
              v-validate="'required'"
              :error-messages="errors.collect('form-1.required')"
              color="secondary"
              data-vv-name="required"
              label="Role"
              name="role"
              :items="itemrole"
              item-value= "role"
              v-model="role"
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
const { usersApi } = require("../../../apis")

export default {
  name: "DashboardUserAddForms",

  $_veeValidate: {
    validator: "new",
  },

  data: () => ({
    list: [],
    itemrole: [
        { text: 'NORMAL', role: 'normal' },
        { text: 'CONTRIBUTOR', role: 'contributor' },
        { text: 'ADMIN', role: 'admin' }
    ],
    show1: false,
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    role: ""
  }),

 methods: {
    validateForm(scope) {
      this.$validator.validateAll(scope).then(async (result) => {
        if (result) {
          const result2 = await usersApi.adduser({
            firstName: this.firstname,
            lastName: this.lastname,
            username: this.username,
            password: this.password,
            role: this.role,
          })
          if (result2.data.code === 200) {
            // this.$notificate.showMessage({
            //   content: result2.data.message,
            //   color: "info",
            // });
            this.$router.push("/users/listuser");
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
