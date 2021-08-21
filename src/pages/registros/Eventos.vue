<template lang="pug">
div.layout-padding.flex-center.q-pa-sm
    div.row.flex-center
      div(
        :class="$q.platform.is.mobile ? 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-md' : 'col-12'"
      )
        CadastroEvento
</template>

<script>

import CadastroEvento from '../../components/Eventos/CadastroEvento'

export default {
  name: 'Eventos',
  components: {
    CadastroEvento
  }
}
</script>
