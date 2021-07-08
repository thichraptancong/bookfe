<template>
  <v-container id="dashboard" tag="section">
    <v-row>
      <v-col cols="12">
        <div
          class="font-weight-light mt-1"
          style="color: #3c4858; font-size: 50px; text-align: center"
        >
          LIST BOOKS
        </div>
      </v-col>
    </v-row>
    <v-row style="display: flex; justify-content: center">
        <v-btn
          v-for="cate in cateList"
          :key="cate"
          v-model="idCategory"
          @click="finding(cate.title)"
        >
          {{ cate.title }}
        </v-btn>
    </v-row>
    <v-row>
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mb-2"
            @keyup="paging"
            style="display: flex; justify-content: center"
          />
        </v-card-title>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="book in bookList" :key="book" sm="3" md="3">
        <base-material-card
          color="transparent"
          image
          hover-reveal
          to="/details"
        >
          <template v-slot:image v-on="details">
            <v-img :src="coverURL.concat(book.cover)" />
          </template>

          <v-card-title class="justify-center">
            {{ book.title }}
          </v-card-title>

          <v-card-text class="body-1 mb-3 red--text">
            <v-icon aria-hidden="false"> mdi-pencil </v-icon>
            {{ book.author }}
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-card-text class="body-1 mb-3 grey--text text-justify">
            {{ book.description }}
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-chip-group
            v-model="selection"
            active-class="deep-purple accent-4 white--text"
            style="margin-left: 15px"
            column
          >
            <v-chip style="color: white; background-color: purple">
              <v-avatar left>
                <v-icon style="color: white">mdi-label</v-icon>
              </v-avatar>
              {{ book.category }}</v-chip
            >
            <v-chip style="float: right" color="green" outlined right>
              <v-avatar left>
                <v-icon style="color: black">mdi-account</v-icon>
              </v-avatar>
              {{ book.owner.firstName + " " + book.owner.lastName }}</v-chip
            >
          </v-chip-group>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Utilities
import { bookApi } from "../../../apis";

import { categoriesApi } from "../../../apis";

const { authApi } = require("../../../apis");

export default {
  name: "DashboardDashboard",

  data: () => ({
    bookList: [],
    coverURL: "http://localhost:3000",
    idCategory: "",
    cateList: [],
  }),
  watch: {
    options: {
      handler(newValue) {
        this.page = newValue.page;
        this.paging();
      },
    },
    deep: true,
  },
  mounted() {
    this.getCate();
    this.paging();
  },
  methods: {
    async paging() {
      this.loading = true;
      const condition = {
        search: this.search,
        page: this.page,
        idCategory: this.idCategory,
      };
      const result = await bookApi.paging(condition);
      this.loading = false;
      if (result.data) {
        const { docs: book, page } = result.data.book;
        this.page = page;
        this.bookList = book;
      }
    },
    async getCate() {
      const result = await categoriesApi.findAll();
      if (result.data.code === 200) {
        this.cateList = result.data.category;
      }
    },
    logout: async function () {
      const result = await authApi.logout();
      if (result.data.code === 200) {
        this.deleteToken();
        this.$router.push({
          name: "Login",
        });
      } else if (result.data.code === 400) {
        this.$notificate.showMessage({
          content: result.data.message,
          color: "info",
        });
      }
    },
    finding(item) {
      this.idCategory = item.toUpperCase();
      this.paging();
    },
  },
};
</script>

<style lang="scss">
.v-sheet {
  border-radius: 4px;
}
</style>
