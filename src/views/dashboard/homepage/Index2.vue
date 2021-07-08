<template>
  <v-app>
    <dashboard-core-app-bar v-model="expandOnHover" />

    <dashboard-core-view />
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',

    components: {
      DashboardCoreAppBar: () => import('../../dashboard/componenthome/core/AppBar'),
      DashboardCoreView: () => import('../../dashboard/componenthome/core/View')
    },

    data: () => ({
      expandOnHover: false
    })
  }
</script>
