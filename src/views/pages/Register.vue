<template>
  <v-container
    id="register"
    fill-height
    tag="section"
  >
    <v-row justify="center">
      <v-col cols="6">
        <v-slide-y-transition appear>
          <v-card
            class="pa-3 pa-md-5 mx-auto"
            light
          >
            <pages-heading class="text-center display-3">
              Register
            </pages-heading>

            <v-row>
              <v-col
                cols="12"
                md="12"
              >
                <div class="text-center">
                  <v-btn
                    v-for="(social, i) in socials"
                    :key="i"
                    :color="social.iconColor"
                    class="my-2 mr-1"
                    dark
                    depressed
                    fab
                    small
                  >
                    <v-icon v-text="social.icon" />
                  </v-btn>

                  <div class="my-2" />
                  <form
                    ref="userForm"
                    class="mt-5"
                    id="app"
                    data-vv-scope="form-1"
                  >
                  <v-text-field
                    color="secondary"
                    v-model="firstname"
                    v-validate="'required'"
                    :error-messages="errors.collect('form-1.required')"
                    data-vv-name="required"
                    name="firstname"
                    label="First Name..."
                    prepend-icon="mdi-face"
                  />
                   <v-text-field
                    color="secondary"
                    v-model="lastname"
                    v-validate="'required'"
                    :error-messages="errors.collect('form-1.required')"
                    data-vv-name="required"
                    name="lastname"
                    label="Last Name..."
                    prepend-icon="mdi-face"
                  />
                  <v-text-field
                    color="secondary"
                    v-model="username"
                    v-validate="'required'"
                    :error-messages="errors.collect('form-1.required')"
                    data-vv-name="required"
                    name="username"
                    label="Username..."
                    prepend-icon="mdi-email"
                  />

                  <v-text-field
                    class="mb-8"
                    color="secondary"
                    v-model="password"
                    v-validate="'required'"
                    :error-messages="errors.collect('form-1.required')"
                    data-vv-name="required"
                    name="password"
                    label="Password..."
                    prepend-icon="mdi-lock-outline"
                    :rules="[rules.required, rules.min]"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    hint="At least 6 characters"
                    counter
                    @click:append="show1 = !show1"
                  />

                  <v-checkbox
                    :input-value="true"
                    color="secondary"
                  >
                    <template v-slot:label>
                      <span class="text-no-wrap">I agree to the&nbsp;</span>

                      <a
                        class="secondary--text ml-6 ml-sm-0"
                        href="#"
                      >
                        terms and conditions
                      </a>.
                    </template>
                  </v-checkbox>

                  <pages-btn color="success" @click.prevent="validateForm('form-1')">
                    Get Started
                  </pages-btn>
                  </form>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-slide-y-transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const { authApi } = require("../../apis/");

export default {
  name: "PagesRegister",
  $_veeValidate: {
    validator: "new",
  },
  components: {
    PagesBtn: () => import("./components/Btn"),
    PagesHeading: () => import("./components/Heading"),
  },
  data: () => ({
    socials: [
      {
        href: "#",
        icon: "mdi-twitter",
        iconColor: "#1DA1F2",
      },
      {
        href: "#",
        icon: "mdi-instagram",
        iconColor: "#ea4c89",
      },
      {
        href: "#",
        icon: "mdi-facebook",
        iconColor: "#3B5998",
      },
    ],
    show1: false,
    rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
      },
  }),
  methods: {
    validateForm(scope) {
      this.$validator.validateAll(scope).then(async (result) => {
        if (result) {
          const result2 = await authApi.register({
            firstName: this.$refs.userForm.firstname.value,
            lastName: this.$refs.userForm.lastname.value,
            username: this.$refs.userForm.username.value,
            password: this.$refs.userForm.password.value,
          });
          if (result2.data.code === 200) {
            // this.$notificate.showMessage({
            //   content: result2.data.message,
            //   color: "info",
            // });
            this.$router.push("/auth/login");
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
<style lang="sass">
#register
  .v-list-item__subtitle
    -webkic-line-clamp: initial
    -webkit-box-orient: initial
</style>