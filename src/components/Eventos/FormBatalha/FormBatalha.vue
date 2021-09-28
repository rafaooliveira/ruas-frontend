<template lang="pug">
div.q-pa-lg
	div.row.q-col-gutter-md
		div.col-xl-12.col-lg-12.col-md-12.col-sm-12.col-xs-12
			q-select(
				v-model="register.tipoEvento"
				:options="optionsAcao"
				filled
				required
				emit-value
				map-options
				:rules="[val => !!val || msgCampoObr]"
				label="Tipo Evento"
			)
			q-input(
				filled
				v-model="register.nomeEvento"
				ref="nome"
				label="Qual nome do Evento?"
				required
				:rules="[val => !!val || msgCampoObr]"
			)
			q-select(
				v-model="register.diaSemana"
				:options="diaEvento"
				filled
				required
				emit-value
				map-options
				:rules="[val => !!val || msgCampoObr]"
				label="Qual dia que ocorre?"
				ref="dia"
			)
			div
				div.row.q-col-gutter-sm
					q-select.col-xl-6.col-lg-6.col-md-6.col-sm-6.col-xs-6(
						v-model="register.horaInicio"
						:options="diaEvento"
						filled
						required
						emit-value
						map-options
						:rules="[val => !!val || msgCampoObr]"
						label="Hora início"
						ref="horaInicio"
					)
					q-select.col-xl-6.col-lg-6.col-md-6.col-sm-6.col-xs-6(
						v-model="register.HoraFinal"
						:options="diaEvento"
						filled
						required
						emit-value
						map-options
						:rules="[val => !!val || msgCampoObr]"
						label="Hora final"
						ref="horaFinal"
					)
			q-toggle(
				v-model="register.premiacao"
				filled
				required
				ref="premiacao"
				label="Contem premiação?"
				:rules="[val => !!val || msgCampoObr]"
			)
			q-input.q-my-md(
				v-show="register.premiacao"
				filled
				v-model="register.valorPremiacao"
				ref="valorPremiacao"
				label="Qual valor da premiação?"
				required
				:rules="[val => !!val || msgCampoObr]"
			)
			q-input(
				filled
				v-model="register.descricaoEvento"
				ref="rua"
				label="Uma descricao do rolê"
				required
				:rules="[val => !!val || msgCampoObr]"
				type="textarea"
			)
			q-card.q-gutter-y-md
				q-card-section.q-gutter-md
					h6.relative-center Local da Batalha
					q-input(
						filled
						v-model="rua"
						ref="rua"
						label="Qual Rua do Rolê"
						required
						:rules="[val => !!val || msgCampoObr]"
					)
					q-input(
						filled
						v-model="cep"
						mask="#####-###"
						ref="cep"
						label="Se souber o CEP já ajuda"
						@change="buscarCep"
						:rules="[val => !!val || msgCampoObr]"
					)
					q-input(
						filled
						v-model="bairro"
						ref="bairro"
						label="É logo no Bairro..."
						:rules="[val => !!val || msgCampoObr]"
					)
		CRIAR(
			:formData="register"
		)
</template>

<script>
import CRIAR from './Add'
export default {
  name: "Rima",
	components: {
		CRIAR
	},
  data() {
    return {
      msgCampoObr: "Campo obrigatório",
      data: [],
      premiacoes: ["Sim", "Não"],
      diaEvento: [],
			optionsAcao: [
        {
          label: 'Cadastrar Batalha de Rima',
          value: 'batalha'
        },
        {
          label: 'Cadastrar Batalha de Dança',
          value: 'danca'
        },
        {
          label: 'Oficina de Grafite',
          value: 'grafite'
        }
      ],
      register: {
				tipoEvento: "",
        nomeEvento: "",
        diaSemana: "",
				horaInicio: "",
				horaFinal: "",
        totalHoras: "",
        qtdArtistas: 0,
        premiacao: false,
        valorPremiacao: "",
        descricaoEvento: "",
				local: "",
				lat: "",
				long: ""
      },
			cep: "",
			rua: "",
			uf: "",
			bairro: ""
    };
  },
  methods: {
    resetFields () {
			this.register.tipoEvento = ""
			this.register.nomeEvento = ""
			this.register.diaSemana = ""
			this.register.horaInicio = ""
			this.register.horaFinal = ""
			this.register.totalHoras = ""
			this.register.qtdArtistas = 0
			this.register.premiacao = false
			this.register.valorPremiacao = ""
			this.register.descricaoEvento = ""
			this.register.local = ""
			this.register.lat = ""
			this.register.long = ""
    },
    async buscarCep() {
      var cep = this.cep.replace('-', "");
      const url = `https://viacep.com.br/ws/${cep}/json/?callback=`
			try {
				const res = await this.$axios.get(url)
				this.rua = res.data.logradouro;
				this.uf = res.data.uf;
				this.bairro = res.data.bairro;
				this.register.local = `${this.rua}, ${this.bairro} - ${this.uf}`
			} catch (e) {
				this.$q.notify({
					color: 'negative',
					message: 'Erro ao consultar CEP'
				})
			}
    },
  },
	created () {
		this.diaEvento = this.$moment.weekdays()
	}
};
</script>
