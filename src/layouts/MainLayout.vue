<template lang="pug">

q-layout(view="lHh Lpr lFf")
    q-header(elevated)
      q-toolbar(
        class="bg-black text-white"
      )
        q-btn(
          v-if="this.$route.path !== '/login' && this.$route.path !== '/' && this.$route.path !== '/cadastro'"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        )
        q-btn(
					v-if="this.$route.path === '/login' || this.$route.path === '/cadastro'"
					round
					icon="arrow_back"
					:to="this.$route.path === '/cadastro' ? '/login' : '/'"
        )
        q-toolbar-title() Arte de Rua
        q-btn(
					v-if="this.$route.path === '/login'"
					label="Cadastre-se"
          :to="'/cadastro'"
					color="warning"
        )
        div
          q-btn(
						v-if="this.$route.path === '/'"
						label="Login"
						:to="'/login'"
					)
          q-btn(
						v-if="this.$route.path === '/home'"
						label="Perfil"
					)
            q-menu
              div.row.no-wrap.q-pa-md
                div.column
                  div.text-h6.q-mb-md
                  q-btn.q-my-sm(
										icon="settings"
										v-model="mobileData"
										label="Configurações"
									)
                  q-btn(
										icon="login"
										color="secondary"
										label="Sair"
										@click="logout"
										v-close-popup
									)
                q-separator.q-mx-lg.horizontal.inset
                div.column.items-center
                  q-avatar(
										size="72px"
									)
                    img(src="https://cdn.quasar.dev/img/avatar4.jpg")
                  div.q-mt-md.q-mb-xs(
										class="text-subtitle1"
									) John Doe/div
    q-drawer(
      v-model="leftDrawerOpen"
      bordered
      behavior="mobile"
      @click="leftDrawerOpen = true"
    )
      q-scroll-area.fit
        q-toolbar.GPL__toolbar
          q-toolbar-title.row.items-center.text-grey-8
            img.absolute-center.q-my-lg(
              src="../statics/gemeos.jpeg"
              width="85"
            )
        q-separator.q-my-xl
        q-list(
          padding
        )
          q-item.item(
            v-for="link in registers"
            :key="link.text"
            :to="link.to"
            clickable
          )
            q-item-section(
              avatar
            )
              q-icon(
                :name="link.icon"
              )
            q-item-section
              q-item-label {{ link.text }}
    q-page-container
        router-view
</template>

<script>
import moment from 'moment'
import routes from '../router/routes'
export default {
  name: 'MainLayout',
  data () {
    return {
      m: moment,
      leftDrawerOpen: false,
      registers: []
    }
  },
  methods: {
    renderMenu () {
      routes.forEach(route => {
        switch (route.path) {
          case '/registros':
            route.children.forEach(child => {
              this.registers.push({
                icon: 'add_location',
                text: child.name,
                to: `${route.path}/${child.path}`
              })
            })
            break
          default:
            break
        }
      })
    }
  },
  async mounted () {
    this.renderMenu()
  }
}
</script>
