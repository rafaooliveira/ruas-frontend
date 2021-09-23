<template lang="pug">
div.q-pa-xl
  div.center.q-col-gutter-sm
    div.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12
      q-card.q-gutter-md
        q-card-section
          h4(
						class="text-h6 text-center"
					) Cadastro de Usuários
          div
            User

</template>

<script>
import User from "src/components/TiposDeUsuario/User/User.vue"

export default {
	name: "Cadastro",
	components: {
		User
	}
}
</script>

<style>

</style>