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
            Artistas.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
							v-if="register.tipoUsuario === 'artista'"
							:vulgo="vulgo"
							:avaliacao="avaliacao"
							@avaliacaoUpdate="avaliacaoUpdate"
							@vulgoUpdate="vulgoUpdate"
						)
            Promotores.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
							v-if="register.tipoUsuario === 'promotor'"
							:agencia="agencia"
							@agenciaUpdate="agenciaUpdate"
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
import Artistas from "components/TiposDeUsuario/Artistas.vue"
import Promotores from "components/TiposDeUsuario/Promotores.vue"

export default {
	name: "Cadastro",
	components:{
		Artistas,
		Promotores
	},
	data () {
		return {
			agencia: '',
			vulgo: '',
			avaliacao: 0,
			msgCampoObr: "Faltou aqui ó",
			isPwd: true,
      disable: false,
			loading: false,
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
			this.loading = true
			this.disable = true
			console.log(this.validateFields())
			if (this.validateFields()) {
				if (this.agencia) {
					const params = Object.assign({}, this.register)
					params.agencia = this.agencia
					try {
						const newUser = await this.$axios.post('api/users', params)
						this.$q.notify({
							color:'positive',
							message:'Cadastro realizado com sucesso pai'
						})
						this.$router.push({
							path:'/login',
						})
						return newUser
					} catch (e) {
						this.$q.notify({
							color:'negative',
							message:'Erro ao cadastrar novo usuário parça'
						})
					}
				} else {
					const params = Object.assign({}, this.register)
					params.vulgo = this.vulgo
					params.avaliacao = this.avaliacao
					return params
				}
			} else {
				this.$q.notify({
					color:'warning',
					message:'Falta preencher algum campo meu bom'
				})
			}
			this.loading = false
			this.disable = false
		},
		validateFields() {
			console.log("nome", this.$refs.nome.validate())
			console.log("idade", this.$refs.idade.validate())
			console.log("cpf", this.$refs.cpfCnpj.validate())
			console.log("email", this.$refs.email.validate())
			console.log("password", this.$refs.password.validate())
			console.log("dtNascimento", this.$refs.dtNascimento.validate())
			console.log("tpUser", this.$refs.tipoUsuario.validate())
			return this.$refs.nome.validate() &&
			this.$refs.idade.validate() &&
			this.$refs.cpfCnpj.validate() &&
			this.$refs.email.validate() &&
			this.$refs.password.validate() &&
			this.$refs.dtNascimento.validate() &&
			this.$refs.tipoUsuario.validate()
		},
		avaliacaoUpdate (avaliacao) {
			this.avaliacao = avaliacao
		},
		vulgoUpdate (vulgo) {
			this.vulgo = vulgo
		},
		agenciaUpdate (agencia) {
			this.agencia = agencia
		}
	}
}
</script>

<style>

</style>