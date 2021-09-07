<template lang="pug">
div.row
	q-input.col-xl-12.col-lg-12.col-md-12.col-sm-12.col-xs-12(
		v-model="vulgoLocal"
		filled
		required
		:rules="[val => !!val || msgCampoObr]"
		label="Vulgo"
		ref="vulgo"
	)
	q-input.col-xl-12.col-lg-12.col-md-12.col-sm-12.col-xs-12( 
		v-model="avaliacaoLocal"
		filled
		required
		:rules="[val => !!val || msgCampoObr]"
		label="Avaliação"
		ref="avaliacao"
		v-show="edit"
		disable
	)
</template>

<script>
export default {
	name: "Artistas",
	props: {
		vulgo: {
			type: String,
			required: true
		},
		avaliacao: {
			type: Number,
			required: true,
			default: 0
		}
	},
	data () {
		return {
			vulgoLocal: '',
			avaliacaoLocal: 0,
			edit: false
		}
	},
	created () {
		this.vulgoLocal = this.vulgo
		this.avaliacaoLocal = this.avaliacao
	},
	watch: {
		vulgoLocal(val) {
			this.$emit("vulgoUpdate", val)
		},
		avaliacaoLocal(val) {
			this.$emit('avaliacaoUpdate', val)
		}
	}
}
</script>