<template lang="pug">
div
	q-btn(
		label="cadastrar"
		:disable="btnDisabled"
		color="secondary"
		:loading="loadingAdd"
		@click="validate()"
	)
</template>

<script>

export default {
  props: {
    tipo: { type: [String], required: true },
    formData: { type: [Object, String], required: true }
  },
  data () {
    return {
      records: {
      },
      loadingAdd: false,
      btnDisabled: false
    }
  },

  methods: {
    validate () {
      console.log('formdata MESTREE', this)
      // return this.$parent.$parent.$parent.$refs.name.validate()
    },

    loading (load) {
      this.loadingAdd = load
      if (load) {
        this.btnDisabled = true
      } else {
        this.btnDisabled = false
      }
    },
    resetValidation () {
      this.$parent.$parent.$parent.$refs.name.resetValidation()
    },
    async cadastrar () {
      if (this.validate()) {
        this.loading(true)
        try {
          await this.$axios.post(`../api/${this.tipo}`, this.formData)
          this.$q.notify({
            color: 'positive',
            message: 'Cadastrado com sucesso'
          })
          this.$emit('loadBatalha')
          this.resetValidation()
          this.loading(false)
        } catch (e) {
          this.$q.notify({
            color: 'negative',
            message: 'Erro ao cadastrar'
          })
        } finally {
          this.loading(false)
          this.$emit('loadBatalha')
        }
      } else {
        this.$q.notify({
          color: 'warning',
          message: 'Preencher campos obrigatórios'
        })
      }
    }
  }
}
</script>
