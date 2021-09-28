<template lang="pug">
div
	q-btn(
		label="cadastrar"
		:disable="btnDisabled"
		color="secondary"
		:loading="loadingAdd"
		@click="cadastrar()"
	)
</template>

<script>

export default {
  props: {
    formData: { type: [Object, String], required: true }
  },
  data () {
    return {
      loadingAdd: false,
      btnDisabled: false
    }
  },

  methods: {
    validate () {
      console.log(this.$parent.$refs)
    },

    loading (load) {
      this.loadingAdd = load
      if (load) {
        this.btnDisabled = true
      } else {
        this.btnDisabled = false
      }
    },
    // resetValidation () {
    //   this.$parent.$parent.$parent.$refs.name.resetValidation()
    // },
    async cadastrar () {
			this.validate()
			console.log('events', this.formData)
      // if (this.validate()) {
      //   this.loading(true)
      //   try {
      //     await this.$axios.post(`../api/events`, this.formData)
      //     this.$q.notify({
      //       color: 'positive',
      //       message: 'Cadastrado com sucesso'
      //     })
      //     this.resetValidation()
      //     this.loading(false)
      //   } catch (e) {
			// 		console.log(e)
      //     this.$q.notify({
      //       color: 'negative',
      //       message: 'Erro ao cadastrar'
      //     })
      //   } finally {
      //     this.loading(false)
      //   }
      // } else {
      //   this.$q.notify({
      //     color: 'warning',
      //     message: 'Preencher campos obrigatórios'
      //   })
      // }
    }
  }
}
</script>
