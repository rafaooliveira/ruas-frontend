<template lang="pug">
q-page.layout-padding.relative-center
	div.row.q-pa-sm.q-col-gutter-sm
		div(
			:class="$q.platform.is.mobile ? 'col-xl-10 col-lg-10 col-md-10 col-sm-12 col-xs-12' : 'col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12'"
		)
		q-input(
			label="Local"
			filled
			v-model="local"
		)
		q-btn(
			label="Ver Local"
			@click="mostraValorLocal()"
		)
</template>
<script>
import moment from 'moment'

moment.locale('pt-BR')

export default {
  name: 'Teste',
  data () {
    return {
      local: ''
    }
  },
  watch: {
    local: function (val) {
      console.log('valor input local', this.local)
    }
  },
  methods: {
    mostraValorLocal () {
      console.log('local', this.local)
    }
  },
  mounted () {
    console.log('fui carregado')
  }
}

</script>
