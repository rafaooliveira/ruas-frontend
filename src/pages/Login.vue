<template lang="pug">
div
  div.row.window-height.justify-center
    div.col-xl-3.offset-xl-8.col-lg-4.offset-lg-8.col-md-8.offset-md-8.col-sm-12.col-xs-12.self-center.q-pa-md
      q-card.bodyLogin.shadow-10.q-pt-lg.q-pa-lg(
        style="border-radius: 25px;"
      )
        center
          q-avatar.self-center(
            size="125px"
          )
            q-img(
							src="../statics/gemeos.jpeg"
              sizes="500px"
              to="/"
            )
          p.q-py-sm(
            style="font-size: 25px; color: #FFF;"
          ) RUAS
        q-input.q-py-lg(
					ref="email"
          @keypress.enter="login()"
          label="Login:"
          v-model="email"
          filled
          data-cy="login"
        )
          template(
            v-slot:prepend
          )
            q-icon(
              name="person"
            )
        q-input.q-pb-lg(
					ref="password"
          @keypress.enter="login()"
          label="Senha:"
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          filled
          data-cy="password"
        )
          template(
            v-slot:prepend
          )
            q-icon(
              name="lock"
            )
          template(
            v-slot:append
          )
            q-icon(
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            )
        center.q-py-md
          q-btn(
            @keyup.enter="login()"
            @click="login()"
            color="secondary"
            size="0.9rem"
            label="Entrar"
            :loading="loading"
            :disable="disable"
            data-cy="login"
          )
        center.q-py-sx
          q-btn(
            @keyup.enter="esquece()"
            @click="esquece()"
						flat
            color="secondary"
            label="Esqueci a senha cocoricó"
            :loading="loading"
            :disable="disable"
            data-cy="esqueci"
          )
        center.q-py-lg
          div.row.row-inline.justify-center
            center
              img(
                width="50px"
              )
              strong(
                style="padding: 18px 20px 0px; font-size: 15px;"
              ) Versão: 0.0.1

</template>

<style scoped>
.q-btn {
  padding: 0 50px;
}
bodyLogin {
	background-color: #000000;
	background-image: linear-gradient(147deg, #000000 0%, #04619f 74%);
}
</style>

<script>
export default {
  name: 'LoginTurbina',
  data () {
    return {
			isPwd: true,
      disable: false,
			loading: false,
      email: '',
      password: '',
      data: {
        user: {
          id: ''
        }
      }
    }
  },
  methods: {
    async login () {
      this.loading = true
      this.disable = true

			if (this.$refs.email.validate() && this.$refs.password.validate()) {
				try {
					const response = await this.$axios.post('/api/authentication',
          {
            strategy: 'local',
            email: this.email,
            password: this.password
          })
					console.log("response", response)
					// this.$q.notify({
					// 	type: 'positive',
					// 	message: `Welcome back, ${response.data.user.name}!`
					// })
					this.$router.push({
						path: '/home'
					})
				} catch (e) {
					this.$q.notify({
						position: 'top-right',
						color: 'negative',
						message: 'Erro ao fazer login'
					})
				}
			}
			this.loading = false
			this.disable = false
			
    },
		async submmit () {
      try {
        
        this.$store.commit('kajero/updateLoggedToken', response.data.accessToken)
        this.$store.commit('kajero/updateLoggedUser', response.data.user)
        t
      } catch (e) {
        if (e.response.status === 401) {
          if (e.response.data.message.toUpperCase() === 'INVALID LOGIN') {
            this.$q.notify({
              type: 'negative',
              message: 'Invalid credentials! Try again!'
            })
            this.new_user_message = true
          }
          if (e.response.data.message.toUpperCase() === 'NOT VERIFIED') {
            this.not_verified_message = true
          }
        } else {
          this.$q.notify({
            type: 'negative',
            message: 'Ops, couldn\'t possible to complete request. Try again!'
          })
        }
      } finally {
        this.$q.loading.hide()
      }
    }
  },
  async mounted () {
		console.log("cookies", this.$q);
  }
}
</script>
