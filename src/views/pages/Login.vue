<template>
  <v-container
    id="login"
    fill-height
    tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="success"
          light
          max-width="100%"
          width="600"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                Login
              </h1>
            </div>
          </template>

          <v-card-text class="text-center">
            <v-text-field
              color="secondary"
              label="Username..."
              prepend-icon="mdi-email"
              v-model="username"
            />

            <v-text-field
              v-model="password"
              class="mb-8"
              color="secondary"
              prepend-icon="mdi-lock-outline"
              :rules="[rules.required, rules.min]"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password..."
              hint="At least 6 characters"
              counter
              @click:append="show1 = !show1"
            />
            <pages-btn
              large
              color=""
              depressed
              class="v-btn--text success--text"
              @click="login"
            >
              Let's Go
            </pages-btn>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

const { authApi } = require("../../apis/");

  export default {
    name: 'PagesLogin',

    components: {
      PagesBtn: () => import('./components/Btn')
    },

    data: () => ({
      socials: [
        {
          href: '#',
          icon: 'mdi-facebook-box'
        },
        {
          href: '#',
          icon: 'mdi-twitter'
        },
        {
          href: '#',
          icon: 'mdi-github-box'
        }
      ],
    username: "",
    password: "",
    show1: false,
    rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Min 6 characters',
        emailMatch: () => ('The email and password you entered don\'t match'),
      },
    }),

      methods: {
    ...mapMutations({
      setUserInfo: "SET_USER_INFO",
    }),

    login: async function () {
      const result = await authApi.login({
        username: this.username,
        password: this.password,
      });

      if (result.data.code === 200) {
        this.setUserInfo(result.data);
        this.$router.push("/");
      } else if (result.data.code === 400) {
        this.$notificate.showMessage({ content: result.data.message, color: 'info' });
      }
    },
  },
};
</script>
