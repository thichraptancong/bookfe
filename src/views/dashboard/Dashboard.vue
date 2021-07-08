<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row>
      <v-col cols="12">
        <base-material-card
          icon="mdi-earth"
          title="Global Sales by Top Locations"
        >
          <v-data-table
            :page="page"
            :pageCount="numberOfPages"
            :server-items-length="totalPassengers"
            :loading="loading"
            :options.sync="options"
            :headers="headers"
            :items="items"
            :items-per-page="limit"
            class="elevation-1"
          ></v-data-table>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const { usersApi } = require("../../apis/");

export default {
  name: "DashboardDashboard",

  data() {
    return {
      page: 1,
      numberOfPages: 0,
      totalPassengers: 0,
      loading: true,
      limit: 5,
      options: {},
      headers: [
        {
          sortable: true,
          text: "Username",
          value: "username",
        },
        {
          sortable: true,
          text: "Role",
          value: "role",
        },
        {
          sortable: true,
          text: "Last Logout",
          value: "lastLogout",
        },
        {
          sortable: true,
          text: "Last Changed Password",
          value: "lastChangedPassword",
        },
        {
          sortable: true,
          text: "Action",
          value: "",
        },
      ],
      items: [],
    };
  },

  watch: {
    options: {
      handler(newValue) {
        this.page = newValue.page;
        this.limit = newValue.itemsPerPage;
        this.paging();
      },
    },
    deep: true,
  },

  methods: {
    async paging() {
      this.loading = true;

      const condition = {
        page: this.page,
        limit: this.limit,
      };
      const result = await usersApi.paging(condition);

      this.loading = false;

      if (result.data) {
        // eslint-disable-next-line object-curly-newline
        const { docs: users, limit, page, totalDocs } = result.data.users;

        this.page = page;
        this.numberOfPages = limit;
        this.limit = limit;
        this.totalPassengers = totalDocs;
        this.items = users;
      }
    },
  },

  mounted() {
    this.paging();
  },
};
</script>

<style lang="scss">
.v-sheet {
  border-radius: 4px;
}
</style>
