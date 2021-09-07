<template lang="pug">
div.q-pa-lg
	div.row.q-col-gutter-sm
		div.col-xl-12.col-lg-12.col-md-12.col-sm-12.col-xs-12
			q-input(
				filled
				v-model="register.nome"
				ref="nome"
				label="Qual nome do Evento?"
				required
				:rules="[val => !!val || msgCampoObr]"
			)
			q-select(
				v-model="register.dia"
				:options="diaEvento"
				filled
				required
				emit-value
				map-options
				:rules="[val => !!val || msgCampoObr]"
				label="Qual dia que ocorre?"
				ref="dia"
			)
			q-card.q-gutter-y-sm
				q-card-section.q-gutter-sm
					p.relative-center Endereço da Batalha
					q-input(
						filled
						v-model="register.rua"
						ref="rua"
						label="Qual Rua do Rolê"
						required
						:rules="[val => !!val || msgCampoObr]"
					)
					q-input(
						filled
						v-model="register.cep"
						mask="#####-###"
						ref="cep"
						label="Se souber o CEP já ajuda"
						:rules="[val => !!val || msgCampoObr]"
						@change="buscarCep()"
					)
					q-input(
						filled
						v-model="register.bairro"
						ref="bairro"
						label="É logo no Bairro..."
						:rules="[val => !!val || msgCampoObr]"
					)
					q-input(
						filled
						v-model="register.referencia"
						ref="referencia"
						label="Um ponto de referência é sempre bom"
					)
</template>

<script>
import { Notify } from "quasar";
import moment from "moment";
Notify.setDefaults({
  position: "top-right",
  timeout: 1000,
  actions: [{ icon: "close", color: "white" }],
});
moment.locale("pt-BR");
export default {
  name: "Grafite",
  data() {
    return {
      msgCampoObr: "Campo obrigatório",
      data: [],
      premiacoes: ["Sim", "Não"],
      diaEvento: moment.weekdays(),
      register: {
        nome: "",
        dia: "",
        rua: "",
        cep: "",
        bairro: "",
        referencia: "",
      },
    };
  },
  methods: {
    resetFields() {
      this.register.nome = "";
      this.register.dia = 0;
      this.register.rua = "";
      this.register.cep = "";
      this.register.bairro = "";
      this.register.referencia = "";
      setTimeout(() => {
        this.$refs.name.resetValidation();
      }, 10);
    },
    async buscarCep() {
      var cep = this.register.cep.replace('-', "");
      const url = `https://viacep.com.br/ws/${cep}/json/?callback=`
			try {
				const res = await this.$axios.get(url)
				this.register.localidade = res.data.localidade;
				this.register.rua = res.data.logradouro;
				this.register.uf = res.data.uf;
				this.register.bairro = res.data.bairro;
			} catch {
				this.$q.notify({
					color: 'negative',
					message: 'Erro ao consultar CEP'
				})
			}
    },
  }
};
</script>
