<template lang="pug">
div.q-pa-xl
  div.center.q-col-gutter-sm
    div.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12
      q-card.q-guttermd
        q-card-section
          h4(
						class="text-h6 text-center"
					) Cadastro de Usuários
          div.row.q-col-gutter-sm
            q-input.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
              v-model="register.name"
              filled
              required
              :rules="[val => !!val || msgCampoObr]"
              label="Nome"
							ref="nome"
            )
            q-input.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
              v-model.number="register.idade"
							type="number"
              filled
              required
              :rules="[val => !!val || msgCampoObr]"
              label="Idade"
              ref="idade"
            )
            q-input.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
              v-model="register.cpfCnpj"
              filled
              required
              :rules="[val => !!val || msgCampoObr]"
              label="CPF/CNPJ"
							:mask="'###.###.###-##' || '##.###.###/####-##'"
              ref="cpfCnpj"
            )
            q-input.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
              v-model="register.email"
              filled
              required
              :rules="[val => !!val || msgCampoObr]"
              label="E-mail"
              ref="email"
            )
            q-input.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
              v-model="register.password"
              filled
              required
              :type="isPwd ? 'password' : 'text'"
              :rules="[val => !!val || msgCampoObr]"
              label="Senha"
              ref="password"
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
            q-input.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
							filled
							v-model="register.dtNascimento"
							label="Data Nascimento"
							:rules="[val => !!val || msgCampoObr]"
							readonly
							ref="dtNascimento"
						)
              template(
								v-slot:append
							)
                q-icon.cursor-pointer(
									name="event"
								)
                  q-popup-proxy.q-mr-xl(
										ref="qDateProxy"
										transition-show="scale"
										transition-hide="scale"
									)
                    q-date(
											v-model="register.dtNascimento"
											:locale="myLocale"
											today-btn
											mask="DD/MM/YYYY"
											navigation-min-year-month="1950/01"
      								navigation-max-year-month="2021/12"
											@blur="() => $refs.qDateProxy.hide()"
										)
            q-select.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
							v-model="register.tipoUsuario"
							:options="optionsTypeUser"
							:rules="[val => !!val || msgCampoObr]"
							ref="tipoUsuario"
							filled
							emit-value
							map-options
							required
							label="Tipo de Usuário"
						)
            q-toggle.col-xl-12.col-lg-12.col-md-12.col-sm-12.col-xs-12(
							v-model="register.authGoogle"
							color="secondary"
							label="Autenticado com Google?"
							keep-color
							checked-icon="check"
							unchecked-icon="clear"
						)
          q-btn.q-ma-md.col-xl-4.col-lg-4.col-md-4.col-sm-4.col-xs-4(
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
//-  Deve ter uma tela de cadastro de promotor e não na tela de cadastro 
//- Artistas.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
//- 	v-if="register.tipoUsuario === 'artista'"
//- 	:vulgo="vulgo"
//- 	:avaliacao="avaliacao"
//- 	@avaliacaoUpdate="avaliacaoUpdate"
//- 	@vulgoUpdate="vulgoUpdate"
//- )
//- Promotores.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
//- 	v-if="register.tipoUsuario === 'promotor'"
//- 	:agencia="agencia"
//- 	@agenciaUpdate="agenciaUpdate"
//- )
// import Artistas from "components/TiposDeUsuario/Artistas.vue"
// import Promotores from "components/TiposDeUsuario/Promotores.vue"
// components:{
// 	Artistas,
// 	Promotores
// },
// avaliacaoUpdate (avaliacao) {
// 	this.avaliacao = avaliacao
// },
// vulgoUpdate (vulgo) {
// 	this.vulgo = vulgo
// },
// agenciaUpdate (agencia) {
// 	this.agencia = agencia
// }

export default {
	name: "Cadastro",
	data () {
		return {
			agencia: '',
			vulgo: '',
			avaliacao: 0,
			msgCampoObr: "Faltou aqui ó",
			isPwd: true,
      disable: false,
			register: {
				name: '',
				email: '',
				idade: '',
				password: '',
				cpfCnpj: '',
				tipoUsuario: '',
				dtNascimento: '',
				authGoogle: false
			},
			optionsTypeUser: [
				{
					value: 'artista',
					label: 'Artista'
				},
				{
					value: 'promotor',
					label: 'Promotor'
				}
			],
			myLocale: {
        days: 'Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado'.split('_'),
        daysShort: 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        firstDayOfWeek: 1
      }
		}
	},
	methods: {
		async registerUser () {
			this.$q.loading.show()
			this.disable = true
			if (this.validateFields()) {
					try {
						const newUser = await this.$axios.post('api/users', this.register)
						this.$q.notify({
							color:'positive',
							message:'Cadastro realizado com sucesso pai'
						})
						this.$router.push({
							path:'/login',
						})
						return newUser
					} catch (e) {
						if (e.response.status === 400) {
								if (e.response.data.errors && e.response.data.errors.length > 0 && e.response.data.errors[0].message.toUpperCase() === 'EMAIL MUST BE UNIQUE') {
									this.$q.notify({
										type: 'warning',
										message: 'Esse e-mail já está registrado manin'
									})
								}
						} else {
							this.$q.notify({
								type: 'negative',
								message: 'Erro ao cadastrar man, tente mais tarde"'
							})
						}
					} finally {
						this.$q.loading.hide()
					}
			} else {
				this.$q.notify({
					color:'warning',
					message:'Falta preencher algum campo meu bom'
				})
			}
			this.loading.hide()
			this.disable = false
		},
		validateFields() {
			return this.$refs.nome.validate() &&
			this.$refs.idade.validate() &&
			this.$refs.cpfCnpj.validate() &&
			this.$refs.email.validate() &&
			this.$refs.password.validate() &&
			this.$refs.dtNascimento.validate() &&
			this.$refs.tipoUsuario.validate()
		}
	}
}
</script>

<style>

</style>