<template lang="pug">
q-layout(
  view="hHh LpR fFf"
)
  q-drawer(
    v-model="leftDrawerOpen"
    bordered
    behavior="mobile"
    @click="leftDrawerOpen = false"
  )
    q-scroll-area.fit
      q-list(
        padding
      )
        q-item(
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
import { Notify } from 'quasar'

import routes from '../router/routes'
Notify.setDefaults({
  position: 'top-right',
  timeout: 1000,
  actions: [{ icon: 'close', color: 'white' }]
})

moment.locale('pt-BR')

export default {
  name: 'LayoutDefault',
  data () {
    return {
      m: moment,
      leftDrawerOpen: false,
      registers: []
    }
  },
  async mounted () {
    this.renderMenu()
  },
  methods: {
    renderMenu () {
      routes.forEach((route) => {
        switch (route.path) {
          case '/registros':
            route.children.forEach(child => {
              this.registers.push({
                icon: 'web',
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
  }
}
</script>
