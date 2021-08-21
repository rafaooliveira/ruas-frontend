<template lang="pug">
div.q-pa-xl
	div.row.q-col-gutter-md
		div.col-xl-4.col-lg-4.col-md-4.col-md-12.col-xs-12
			q-card.q-gutter-y-md
				q-card-section.q-gutter-md
					q-btn(
						icon="arrow_back"
						round
						:to="'/home'"
					)
					q-separator
					q-select(
						v-model="tipo"
						:options="optionsAcao"
						filled
						required
						emit-value
						map-options
						:rules="[val => !!val || msgCampoObr]"
						label="Ação"
					)
					RIMA(
						v-show="tipo === 'batalha' || tipo === 'danca'"
					)
					GRAFITE(
						v-show="tipo === 'grafite'"
					)
					CRIAR(
						:tipo="tipo"
						:formData = "records"
					)
		div.row
			div.col-xl-8.col-lg-8.col-md-8.col-sm-12.col-xs-12
				q-card.q-gutter-y-md
					q-card-section.q-gutter-md
						q-input(
							label="Teste"
							filled
						)
		//- //- Map
		//- //- vue-tournament-bracket-generator(:bracket-size="16")
</template>
<style scoped>
.teste{
  max-height: 1000px ;
}
</style>
<script>
// import VueTournamentBracketGenerator from 'vue-tournament-bracket-generator'
import Map from '../Map.vue'
// fx para carregar tabela de mc ou dançarino depois do formData do componente Criar
import { Notify } from 'quasar'
import CRIAR from './FormBatalha/Add'
import RIMA from './FormBatalha/FormBatalha'
import GRAFITE from './Grafite/Grafite'

Notify.setDefaults({
  position: 'top-right',
  timeout: 1000,
  actions: [{ icon: 'close', color: 'white' }]
})
export default {
  name: 'CadastroEvento',
  components: {
    Map,
    CRIAR,
    RIMA,
    GRAFITE
  },
  data () {
    return {
      tipo: 'batalha',
      msgCampoObr: 'Campo obrigatório',
      edit: false,
      pagination: {
        rowsPerPage: 10
      },
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
      data: []
    }
  },

  methods: {
    async carregarForm (tipo) {
      this.data = []

      switch (tipo) {
        case 'batalha':
          this.$root.$emit('carregarCadastroBatalha')
          break

        case 'danca':
          this.$root.$emit('carregarCadastroBatalha')
          break

        case 'grafite':
          this.$root.$emit('carregarCadastroGrafite')
          break

        default:
          // let response = await this.$axios.get(`../api/${tipo}`)
          // this.data = response.data.result.rows
          break
      }
    }
  },
  mounted () {
    this.carregarForm(this.tipo)
  }
}
</script>
