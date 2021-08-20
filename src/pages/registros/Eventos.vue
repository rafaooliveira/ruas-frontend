<template lang="pug">
div.layout-padding.flex-center.q-pa-sm
    div.row.flex-center
      div(
        :class="$q.platform.is.mobile ? 'col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 q-pa-md' : 'col-12'"
      )
        Cadastro
</template>

<script>

import Cadastro from '../../components/Eventos/Cadastro'

export default {
  name: 'Eventos',
  components: {
    Cadastro
  }
}
</script>
