<template>
  <v-container id="regular-tables" fluid tag="section">
    <h1 class="text-center">Category List</h1>

    <v-col class="text-left">
      <router-link to="/category/addcate">
        <v-btn id="myButton" color="primary" class="mb-5">Add!</v-btn>
      </router-link>
    </v-col>
    <base-material-card
      icon="mdi-clipboard-text"
      title="List Category"
      class="px-5 py-3"
    >
      <v-card-title>
        <v-spacer />
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          class="mb-2"
          @keyup="paging"
        />
      </v-card-title>
      <v-enter />
      <v-data-table
        :headers="headers"
        :items="listItem"
        :page="page"
        :page-count="numberOfPages"
        :server-items-length="totalPassengers"
        :loading="loading"
        :options.sync="options"
        :items-per-page="limit"
        loading-text="Loading... Please wait"
        class="elevation-5"
      >
        <template v-slot:item="row">
          <tr>
            <td>{{ row.item._id }}</td>
            <td>{{ row.item.title }}</td>
            <td class="text-center">
              <v-btn
                class="mx-2"
                small
                color="success"
                @click="editCategory(row.item._id)"
              >
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                small
                color="error"
                @click="deleteItem(row.item._id)"
              >
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </base-material-card>
    <div class="py-3" />
  </v-container>
</template>
<script>
import { categoriesApi } from "../../../apis";

import { mapMutations } from "vuex";

export default {
  name: "ListCategory",
  data: () => ({
    search: "",
    dialog: false,
    page: 1,
    numberOfPages: 0,
    totalPassengers: 0,
    loading: true,
    limit: 5,
    options: {},
    sortBy: "",
    sortDesc: "",
    headers: [
      {
        text: "ID",
        sortable: true,
        class: "danger--text",
        value: "_id",
      },
      {
        text: "Title",
        sortable: true,
        class: "danger--text",
        value: "username",
      },
      {
        text: "Actions",
        sortable: false,
        value: "actions",
        class: "danger--text",
        align: "center",
      },
    ],
    listItem: [],
    deletedIndex: -1
  }),
  watch: {
    options: {
      handler(newValue) {
        this.page = newValue.page;
        this.limit = newValue.itemsPerPage;
        this.sortBy = newValue.sortBy[0];
        this.sortDesc = newValue.sortDesc[0] === true ? "-" : "";
        this.paging();
      },
    },
    deep: true,
  },
  mounted() {
    this.paging();
  },
  methods: {
    ...mapMutations({
      setCategoryList: "SET_CATEGORYLIST",
    }),
    async paging() {
      this.loading = true;
      const condition = {
        search: this.search,
        page: this.page,
        limit: this.limit,
        sort_column: this.sortBy,
        sort_direction: this.sortDesc,
      };
      const result = await categoriesApi.paging(condition);
      this.loading = false;
      if (result.data) {
        const { docs: category, limit, page, totalDocs } = result.data.category;
        this.page = page;
        this.numberOfPages = limit;
        this.limit = limit;
        this.totalPassengers = totalDocs;
        this.listItem = category;
      }
      this.setCategoryList(this.listItem)
    },
    editCategory: function (param) {
      this.$router.push({ path: "/category/updatecate/" + param });
    },
    async deleteItem (item) {
        if (confirm("Confirm delete ?")) {
        const result = await categoriesApi.deletecate(item)
        if (result.data.code === 200) {
            this.$notificate.showMessage({
              content: result.data.message,
              color: "info",
            });
            this.$router.go("/category/listcate");
          } else {
            this.$notificate.showMessage({
              content: result.data.message,
              color: "info",
            });
          }
        }
      }
  },
};
</script>