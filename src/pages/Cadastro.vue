<template lang="pug">
div.q-pa-xl
  div.center.q-col-gutter-sm
    div.col-xl-6.col-lg-6.col-md-6.col-md-12.col-xs-12
      q-card.q-gutter-y-md
        q-card-section.q-gutter-sm
          div.row.q-col-gutter-sm
            q-input.col-xl-6.col-lg-6.col-md-6.col-md-6.col-xs-6(
							v-model="register.name"
							filled
							required
							:rules="[val => !!val || msgCampoObr]"
							label="Nome"
						)
            q-input.col-xl-6.col-lg-6.col-md-6.col-md-6.col-xs-6(
							v-model="register.email"
							filled
							required
							:rules="[val => !!val || msgCampoObr]"
							label="E-mail"
						)
            q-input.col-xl-6.col-lg-6.col-md-6.col-md-6.col-xs-6(
							v-model="register.idade"
							filled
							required
							:rules="[val => !!val || msgCampoObr]"
							label="Idade"
						)
            q-input.col-xl-6.col-lg-6.col-md-6.col-md-6.col-xs-6(
							ref="password"
							label="Senha:"
							v-model="register.password"
							:type="isPwd ? 'password' : 'text'"
							filled
							data-cy="password"
						)
              template(
								v-slot:append
							)
                q-icon(
									:name="isPwd ? 'visibility_off' : 'visibility'"
									class="cursor-pointer"
									@click="isPwd = !isPwd"
								)
            q-btn.q-mx-md.col-xl-3.col-lg-3.col-md-3.col-md-3.col-xs-3(
							@keyup.enter="registerUser()"
							@click="registerUser()"
							color="secondary"
							label="Cadastrar"
							:loading="loading"
							:disable="disable"
							data-cy="esqueci"
						)
</template>

<script>
export default {
	name: "Cadastro",
	data () {
		return {
			msgCampoObr: "Faltou aqui ó",
			isPwd: true,
      disable: false,
			loading: false,
			register: {
				name: "",
				email: "",
				idade: "",
				password: ""
			}
		}
	},
	methods: {
		async registerUser () {
			try {
				this.loading = true
				this.disable = true
				const newUser = await this.$axios.post('api/users', this.register)
				this.$q.notify({
					color:'positive',
					message:'Cadastro realizado com sucesso'
				})
				this.$router.push({
					path:'/login',
				})
				return newUser
			} catch (e) {
				this.$q.notify({
					color:'negative',
					message:'Erro ao cadastrar usuário parça'
				})
			} finally {
				this.loading = false
				this.disable = false
			}
		}
	}
}
</script>

<style>

</style>