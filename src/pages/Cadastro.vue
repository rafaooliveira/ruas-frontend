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
//-  Deve ter uma tela de cadastro de promotor e não na tela de cadastro 
//- Artistas.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
//- 	v-if="register.tipoUsuario === 'artista'"
//- 	:vulgo="vulgo"
//- 	:avaliacao="avaliacao"
//- 	@avaliacaoUpdate="avaliacaoUpdate"
//- 	@vulgoUpdate="vulgoUpdate"
//- )
//- Promotores.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
//- 	v-if="register.tipoUsuario === 'promotor'"
//- 	:agencia="agencia"
//- 	@agenciaUpdate="agenciaUpdate"
//- )
// import Artistas from "components/TiposDeUsuario/Artistas.vue"
// import Promotores from "components/TiposDeUsuario/Promotores.vue"
// components:{
// 	Artistas,
// 	Promotores
// },
// avaliacaoUpdate (avaliacao) {
// 	this.avaliacao = avaliacao
// },
// vulgoUpdate (vulgo) {
// 	this.vulgo = vulgo
// },
// agenciaUpdate (agencia) {
// 	this.agencia = agencia
// }

export default {
	name: "Cadastro",
	components: {
		User
	}
}
</script>

<style>

</style>