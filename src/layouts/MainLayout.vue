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
					:to="this.$route.path === '/' ? '/login' : '/'"
        )
        q-toolbar-title() Arte de Rua

        q-btn(
					v-if="this.$route.path === '/login' || this.$route.path === '/'"
					label="Cadastre-se"
          :to="'/cadastro'"
        )

        div
          q-btn(
						v-if="this.$route.path === '/' || this.$route.path === '/cadastro'"
						:label="this.$route.path === '/' ? 'Login' : 'Faça login'"
						:to="'/login'"
            :color="this.$route.path === '/' ? 'white' : 'dark'"
            :text-color="this.$route.path === '/' ? 'dark' : 'white'"
					)
          q-btn(
						v-if="this.$route.path === '/home'"
						label="Perfil"
					)
            q-menu
              div.row.no-wrap.q-pa-md
                div.column
                  div.text-h6 Configurações
                  q-btn.q-my-md(
										icon="settings"
										v-model="mobileData"
										label="Editar Perfil"
									)
                  q-btn(
										icon="login"
										color="secondary"
										label="Sair"
										@click.prevent="logout()"
									)
                q-separator.q-mx-md
                div.column.items-center
                  q-avatar(
										size="72px"
									)
                    img(src="https://cdn.quasar.dev/img/avatar4.jpg")
                  div.q-my-lg(
										class="text-subtitle1"
									) {{ this.username }}
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
      registers: [],
			username: ""
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
    },
		logout () {
			try {
				localStorage.clear();
				this.$router.push({
					path: '/login'
				})
				this.$q.notify({
					message: 'Nois se ve por aí'
				})
			} catch (e) {
				this.$q.notify({
					color: 'negative',
					message: `Erro ao fazer logout ${e}`
				})
			}
		},
		async getName () {
			String.prototype.capitalize = function() {
				return this.charAt(0).toUpperCase() + this.substr(1);
			}
			localStorage.getItem('name') ? this.username = localStorage.getItem('name').capitalize() : this.username = ""
		}
  },
  async mounted () {
    this.renderMenu()
		await this.getName()
  }
}
</script>
