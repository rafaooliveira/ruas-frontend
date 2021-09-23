<template lang="pug">
div.row.q-my-md.col-xl-3.col-lg-3.col-md-3.col-sm-3.col-xs-3
	q-btn(
		@keyup.enter="registerUser()"
		@click="registerUser()"
		color="secondary"
		label="Cadastrar"
		:loading="loading"
		:disable="disable"
	)
</template>

<script>
export default {
	name:"AddUser",
	props: {
    formData: { type: [Object, String], required: true },
  },
	data () {
		return {
			disable: false,
			loading: false
		}
	},
	methods: {
		validateFields () {
			return this.$parent.$refs.nome.validate() &&
			this.$parent.$refs.idade.validate() &&
			this.$parent.$refs.cpfCnpj.validate() &&
			this.$parent.$refs.email.validate() &&
			this.$parent.$refs.password.validate() &&
			this.$parent.$refs.dtNascimento.validate() &&
			this.$parent.$refs.tipoUsuario.validate()
		},
		async registerUser () {
			this.loading = true
			this.disable = true
			if (this.validateFields()) {
				try {
					let params = Object.assign({}, this.formData)
					params.dtNascimento = this.$moment((params.dtNascimento)._i).format('YYYY-MM-DD')
					params.artista !== '' ? params.agencia = null : params.vulgo = null
					const newUser = await this.$axios.post('api/users', params)
					this.$q.notify({
						color:'positive',
						message:`Cadastro de ${this.formData.tipoUsuario} realizado com sucesso!`
					})
					this.$router.push({
						path:'/login',
					})
					return newUser
				} catch (e) {
					if (e.response.data.errors[0].message) {
						const message = e.response.data.errors[0].message
						if (message.startsWith('email') && message.endsWith('unique')) {
							this.$q.notify({
								type: 'warning',
								message: 'E-mail já cadastrado!'
							})
						} 
					} else {
						console.log(e)
						this.$q.notify({
							type: 'negative',
							message: 'Erro ao cadastrar, tente mais tarde!'
						})
				  }
				} finally {
					this.loading = false
					this.disable = false
				}
			} else {
				this.$q.notify({
					type:'warning',
					message:'Falta preencher algum campo meu bom'
				})
			}
			this.loading = false
			this.disable = false
		}
	}
}
</script>

<style>

</style>