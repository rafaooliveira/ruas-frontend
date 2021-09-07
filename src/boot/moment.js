import { boot } from 'quasar/wrappers'
import moment from 'moment'
moment.locale("pt-BR");
export default boot(({app}) => {
	app.config.globalProperties.$moment = moment
})
