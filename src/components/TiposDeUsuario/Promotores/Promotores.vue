<template lang="pug">
div.row
	q-input.col-xl-12.col-lg-12.col-md-12.col-sm-12.col-xs-12(
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
			type: String,
			required: true
		}
	},
	data () {
		return {
			agenciaLocal: ''
		}
	},
	created() {
		this.agenciaLocal = this.agencia;
	},
	watch: {
		agenciaLocal(val) {
			this.$emit('agenciaUpdate', val)
		}
	}
}
</script>