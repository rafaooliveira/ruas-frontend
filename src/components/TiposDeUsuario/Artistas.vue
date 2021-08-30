<template lang="pug">
div
	q-input.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
		v-model="vulgoLocal"
		filled
		required
		:rules="[val => !!val || msgCampoObr]"
		label="Vulgo"
		ref="vulgo"
	)
	q-input.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
		v-model="avaliacaoLocal"
		filled
		required
		:rules="[val => !!val || msgCampoObr]"
		label="Avaliação"
		ref="avaliacao"
		disabled
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
			avaliacaoLocal: 0
		}
	},
	created () {
		this.vulgoLocal = this.vulgo
		this.avaliacaoLocal = this.avaliacao
		console.log(this.vulgoLocal, this.avaliacaoLocal)
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