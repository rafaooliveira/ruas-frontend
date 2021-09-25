<template lang="pug">
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
		ref="cpfCnpj"
    v-mask="['###.###.###-##', '##.###.###/####-##']"
		@change="validaCpf"
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
	q-input.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
		v-show="register.tipoUsuario === 'promotor'"
		v-model="register.agencia"
		filled
		required
		:rules="[val => !!val || msgCampoObr]"
		label="Agência"
		ref="agencia"
	)
	q-input.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
		v-show="register.tipoUsuario === 'artista'"
		v-model="register.vulgo"
		filled
		required
		:rules="[val => !!val || msgCampoObr]"
		label="Vulgo"
		ref="vulgo"
	)
	q-input.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
		v-show="register.tipoUsuario === 'artista'"
		disable
		v-model.number="register.avaliacao"
		filled
		required
		:rules="[val => !!val || msgCampoObr]"
		label="Avaliação"
		ref="avaliacao"
	)
	q-toggle.col-xl-12.col-lg-12.col-md-12.col-sm-12.col-xs-12(
		v-model="register.authGoogle"
		color="secondary"
		label="Autenticado com Google?"
		keep-color
		checked-icon="check"
		unchecked-icon="clear"
	)
	AddUser(
		:formData="register"
	)
</template>

<script>
import AddUser from "./AddUser.vue"
import FormatUtils from "../../../helpers/FormatUtils"
import {mask} from 'vue-the-mask'
export default {
	name: 'User',
	components: {
		AddUser
	},
	directives: {mask},
	data () {
		return {
			register: {
				name: '',
				idade: '',
				cpfCnpj: '',
				email: '',
				password: '',
				dtNascimento: '',
				tipoUsuario: '',
				authGoogle: false,
				agencia: '',
				vulgo: '',
				avaliacao: 0
			},
			isPwd: true,
			msgCampoObr: "Faltou aqui ó",
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
		validaCpf () {
			let tipoDoc = {}
			let cpf = FormatUtils.isCpf(this.register.cpfCnpj.replaceAll('.', '').replace('-', ''))
			let cnpj = FormatUtils.isCpf(this.register.cpfCnpj.replaceAll('.', '').replace('-', '').replace('/', ''))
			this.register.cpfCnpj.length === 14 ? tipoDoc = { tipo: 'CPF', valido: cpf } : tipoDoc = { tipo: 'CNPJ', valido: cnpj }
			if (!tipoDoc.valido) {
				this.$q.notify({
					message: `${tipoDoc.tipo} inválido`,
					color: 'negative'
				})
				this.register.cpfCnpj = ''
			}
		}
	}
}
</script>
