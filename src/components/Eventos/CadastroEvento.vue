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
					h6.text-h6.text-center(
					) Cadastrar Evento
					q-separator
					RIMA
					
		div.row
			div.col-xl-12.col-lg-12.col-md-12.col-sm-12.col-xs-12
				q-card
					q-card-section
						//- Map
		//- //- vue-tournament-bracket-generator(:bracket-size="16")
</template>

<script>
import Map from '../Map.vue'
import RIMA from './FormBatalha/FormBatalha'

export default {
  name: 'CadastroEvento',
  components: {
    Map,
    RIMA
  },
  data () {
    return {}
  },
}
</script>
