<template>
  <v-container id="user-update" fluid tag="section">
    <base-v-component heading="Users" link="components/users" />
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
          title="USER UPDATE FORM"
          class="px-5 py-3"
        >
          <form ref="userForm" class="mt-5" id="app" data-vv-scope="form-1">
            <v-text-field
              color="secondary"
              label="Id"
              name="id"
              v-model="id"
              disabled
            />
            <v-text-field
              v-validate="'required'"
              color="secondary"
              label="Username"
              name="username"
              v-model="username"
            />
            <v-text-field
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              color="secondary"
              label="Password"
              name="password"
              v-model="password"
              @click:append="show1 = !show1"
            />
            <v-text-field
              v-validate="'required'"
              color="secondary"
              label="First Name"
              name="firstname"
              v-model="firstname"
            />
            <v-text-field
              v-validate="'required'"
              color="secondary"
              label="Last Name"
              name="lastname"
              v-model="lastname"
            />
            <v-select
              v-validate="'required'"
              color="secondary"
              label="Role"
              name="role"
              :items="itemsrole"
              item-text="value"
              item-value="key"
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
const { usersApi } = require("../../../apis");

export default {
  name: "DashboardFormsRegularForms",

  $_veeValidate: {
    validator: "new",
  },
  data() {
    return {
      userUpdate: [],
      userList: [],
      select: { text: "", role: "" },
      itemsrole: [
        { value: "NORMAL", key: "normal" },
        { value: "CONTRIBUTOR", key: "contributor" },
        { value: "ADMIN", key: "admin" },
      ],
      show1: false,
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      id: "12321",
      role: "",
      paramsID: this.$route.params.userId,
    };
  },
  created: async function () {
    const result = await usersApi.getDetail(this.$route.params.userId);
    if (result.data.code === 200) {
      this.userUpdate = result.data.user;
    }
    this.role = this.userUpdate.role && this.userUpdate.role[0];
    this.firstname = this.userUpdate.firstName;
    this.lastname = this.userUpdate.lastName;
    this.username = this.userUpdate.username;
  },
  methods: {
    validateForm(scope) {
      this.$validator.validateAll(scope).then(async (result) => {
        if (result) {
          const result2 = await usersApi.update(this.paramsID, {
            firstName: this.firstname,
            lastName: this.lastname,
            username: this.username,
            password: this.password,
            role: this.select.role,
          });
          if (result2.data.code === 200) {
            this.$notificate.showMessage({
              content: "Update successful!",
              color: "info",
            });
            this.$router.push("/users/listuser");
          } else if (result2.data.code === 201) {
            this.$notificate.showMessage({
              content: result2.data.errorMess,
              color: "info",
            });
          } else {
            this.$notificate.showMessage({
              content: result2.data.errorMess,
              color: "info",
            });
          }
        }
      });
    },
  },
};
</script>
