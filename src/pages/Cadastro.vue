<template lang="pug">
div.q-pa-xl
  div.center.q-col-gutter-sm
    div.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12
      q-card.q-gutter-y-md
        q-card-section.q-gutter-sm
          h6(
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
              v-model="register.idade"
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
            texto {{avaliacao}}
            texto {{vulgo}}
            texto {{agencia}}
            Artistas.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
							v-if="register.tipoUsuario === 'artista'"
							:vulgo="vulgo"
							:avaliacao="avaliacao"
							@avaliacaoUpdate="avaliacaoUpdate"
							@vulgoUpdate="vulgoUpdate"
						)
            Promotores.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
							v-if="register.tipoUsuario === 'promotor'"
							:agencia.sync="this.agencia"
						)
          q-btn.q-ma-sm.col-xl-4.col-lg-4.col-md-4.col-sm-4.col-xs-4(
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
			agencia: 'teste',
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
			]
		}
	},
	methods: {
		async registerUser () {
			console.log("this.props", this.$props.agencia)
			console.log("this.props", this.agencia)
			console.log("this.props", this.avaliacao)
			console.log("this.props", this.vulgo)
			// try {
			// 	this.loading = true
			// 	this.disable = true
			// 	const newUser = await this.$axios.post('api/users', this.register)
			// 	this.$q.notify({
			// 		color:'positive',
			// 		message:'Cadastro realizado com sucesso'
			// 	})
			// 	this.$router.push({
			// 		path:'/login',
			// 	})
			// 	return newUser
			// } catch (e) {
			// 	this.$q.notify({
			// 		color:'negative',
			// 		message:'Erro ao cadastrar usuário parça'
			// 	})
			// } finally {
			// 	this.loading = false
			// 	this.disable = false
			// }
		},
		avaliacaoUpdate (avaliacao) {
			this.avaliacao = avaliacao
		},
		vulgoUpdate (vulgo) {
			this.vulgo = vulgo
		}
	},
	created () {
		console.log(this.vulgo, this.avaliacao)
	}
}
</script>

<style>

</style>