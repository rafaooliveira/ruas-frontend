<template lang="pug">
div
	q-input.col-xl-3.col-lg-4.col-md-6.col-sm-6.col-xs-12(
		v-model="agenciaLocal"
		filled
		required
		:rules="[val => !!val || msgCampoObr]"
		label="Agência"
		ref="agencia"
	)
</template>

<script>
export default {
	name: "Promotores",
	props: {
		agencia: {
			type: String
		}
	},
	data () {
		return {
			agenciaLocal: ''
		}
	},
	created () {
		this.agenciaLocal = this.agencia
	},
	watch: {
		agenciaLocal(val) {
			this.$emit("update:agencia", val)
		}
	}
}
</script>