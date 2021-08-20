import Vue from 'vue'
import ViaCep from 'vue-viacep'

Vue.use(ViaCep)

export default ({ app }) => {
  app.viaCep = ViaCep
}

export { ViaCep }
