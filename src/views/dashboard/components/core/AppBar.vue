<template>
  <v-app-bar
    absolute
    app
    color="transparent"
    flat
    height="75"
    style="width: auto;"
  >
    <v-btn
      fab
      small
      @click="$vuetify.breakpoint.smAndDown ? setDrawer(!drawer) : $emit('input', !value)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down"
      v-text="$route.name"
    />

    <v-spacer />

    <v-menu
      bottom
      left
      min-width="200"
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        flat
        nav
      >
        <template v-for="(p, i) in profile">
          <v-divider
            v-if="p.divider"
            :key="`divider-${i}`"
            class="mb-2 mt-2"
          />

          <app-bar-item
            v-else
            :key="`item-${i}`"
          >
            <v-list-item-title v-text="p.title" @click="logout"/>
          </app-bar-item>
        </template>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations } from 'vuex'

  const { authApi } = require("../../../../apis");

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render(h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs
                  }
                }, this.$slots.default)
            }
          })
        }
      }
    },

    props: {
      value: {
        type: Boolean,
        default: false
      }
    },

    data: () => ({
      notifications: [
        'Mike John Responded to your email',
        'You have 5 new tasks',
        `You're now friends with Andrew`,
        'Another Notification',
        'Another one'
      ],
      profile: [
        { title: 'Profile', path: 'profile' },
        { divider: true },
        { title: 'Log out', path: 'logout' },
      ]
    }),

    computed: {
      ...mapState(['drawer'])
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
        deleteToken: 'DELETE_TOKEN'
      }),

      logout: async function () {
      const result = await authApi.logout();
      if (result.data.code === 200) {
        this.deleteToken()
        this.$router.push({
          name: "Login"
        });
      } else if (result.data.code === 400) {
        this.$notificate.showMessage({ content: result.data.message, color: 'info' });
      }
    },
    }
  }
</script>
