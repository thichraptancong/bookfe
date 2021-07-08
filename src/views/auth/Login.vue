<template>
  <v-container id="login" fill-height tag="section">
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="success"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">Login</h1>

              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :href="social.href"
                class="ma-1"
                icon
                rel="noopener"
                target="_blank"
              >
                <v-icon v-text="social.icon" />
              </v-btn>
            </div>
          </template>

          <v-card-text class="text-center">
            <div class="text-center grey--text body-1 font-weight-light">
              Or Be Classical
            </div>

            <v-text-field
              color="secondary"
              label="Username..."
              v-model="username"
              prepend-icon="mdi-email"
            />

            <v-text-field
              class="mb-8"
              color="secondary"
              type="password"
              v-model="password"
              label="Password..."
              prepend-icon="mdi-lock-outline"
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
  name: "PagesLogin",

  components: {
    PagesBtn: () => import("./components/Btn"),
  },

  data: () => ({
    socials: [
      {
        href: "#",
        icon: "mdi-facebook-box",
      },
      {
        href: "#",
        icon: "mdi-twitter",
      },
      {
        href: "#",
        icon: "mdi-github-box",
      },
    ],
    username: "",
    password: "",
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
      } else {
        // show wrong username & password into UI
      }
    },
  },
};
</script>
