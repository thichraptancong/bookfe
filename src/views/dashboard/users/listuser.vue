<template>
  <v-container id="regular-tables" fluid tag="section">
    <h1 class="text-center">Category List</h1>

    <v-col class="text-left">
      <router-link to="/users/adduser">
        <v-btn id="myButton" color="primary" class="mb-5">Add!</v-btn>
      </router-link>
    </v-col>
    <base-material-card
      icon="mdi-clipboard-text"
      title="List User"
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
            <td>{{ row.item.username }}</td>
            <td>{{ row.item.firstName }}</td>
            <td>{{ row.item.lastName }}</td>
            <td>{{ row.item.role[0] }}</td>
            <td class="text-center">
              <v-btn
                class="mx-2"
                small
                color="success"
                @click="editUser(row.item._id)"
                v-if="(row.item._id != uID && rolecheck) || (row.item._id === uID && !rolecheck)"
              >
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                small
                color="error"
                @click="deleteItem(row.item._id)"
                v-if="(row.item._id != uID && rolecheck) || (row.item._id === uID && !rolecheck)"
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
import { usersApi } from "../../../apis";

const { authApi } = require("../../../apis");

export default {
  name: "ListUser",
  data () {
    return {
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
        sortable: false,
        class: "danger--text",
        value: "_id",
      },
      {
        text: "User Name",
        sortable: true,
        class: "danger--text",
        value: "username",
      },
      {
        text: "First Name",
        sortable: true,
        class: "danger--text",
        value: "firstName",
      },
      {
        text: "Last Name",
        sortable: true,
        class: "danger--text",
        value: "lastName",
      },
      {
        text: "Role",
        sortable: true,
        class: "danger--text",
        value: "role",
      },
      {
        text: "Action",
        sortable: false,
        value: "actions",
        class: "danger--text",
        align: "center",
      },
    ],
    listItem: [],
    deletedIndex: -1,
    uID: "",
    rolecheck: false
  }
  },
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
  created: async function () {
    const result3 = await authApi.getUser();
      if (result3.data.code === 200) {
        this.uID = result3.data.userDetail._id
        if (result3.data.userDetail.role[0] === "admin") {
          this.rolecheck = true
        }
      }
  },
  mounted() {
    this.paging();
  },
  methods: {
    async paging() {
      this.loading = true;
      const condition = {
        search: this.search,
        page: this.page,
        limit: this.limit,
        sort_column: this.sortBy,
        sort_direction: this.sortDesc,
      };
      const result = await usersApi.paging(condition);
      this.loading = false;
      if (result.data) {
        const { docs: users, limit, page, totalDocs } = result.data.users;
        this.page = page;
        this.numberOfPages = limit;
        this.limit = limit;
        this.totalPassengers = totalDocs;
        this.listItem = users;
      }
    },
    editUser: function (param) {
      this.$router.push({ path: "/users/updateuser/" + param });
    },
    async deleteItem (item) {
        if (confirm("Confirm delete ?")) {
        const result = await usersApi.deleteuser(item)
        if (result.data.code === 200) {
            // this.$notificate.showMessage({
            //   content: result2.data.message,
            //   color: "info",
            // });
            this.$router.go("/users/listuser");
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