import moment from 'moment'

const FormatUtils = {
  jsonEscape: function (s) {
    return s
      .replace(/\\/g, '\\\\')
      .replace(/[\u0000-\u001f\u007f-\u009f]/g, function (c) { // eslint-disable-line
        return '\\u' + ('0000' + c.charCodeAt(0).toString(16)).slice(-4)
      })
  },
  toSnakeCase: function (str) {
    return str.replace(/\s/g, '_').toLowerCase()
  },

  toKeyCase: function (str) {
    var auxStr = this.toSnakeCase(str)

    auxStr = auxStr.replace(/[àáâãäå]/g, 'a')
      .replace(/æ/g, 'ae')
      .replace(/ç/g, 'c')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/, 'i')
      .replace(/ñ/g, 'n')
      .replace(/[òóôõö]/g, 'o')
      .replace(/œ/g, 'oe')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ýÿ]/g, 'y')

    return auxStr.substr(0, 1).replace(/[^a-zA-Z0-9]/, '') + auxStr.substr(1, str.length - 2).replace(/[^a-zA-Z0-9_.:]/g, '') + auxStr.substr(str.length - 1, 1).replace(/[^a-zA-Z0-9]/, '')
  },

  emailRegex: function (email) {
    const regex = /([a-zA-Z0-9+._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gm
    let m
    const emails = []
    while ((m = regex.exec(email)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++
      }
      // The result can be accessed through the `m`-variable.
      emails.push(m[0])
    }

    return emails
  },

  checkAndFormatIfTurbinaDate: function (field) {
    // YYYY-MM-DDTHH:MM:SS-0000
    const datePattern = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}[+-]\d{4}/
    if (datePattern.test(field)) {
      if (field.includes('00:00:00')) {
        field = moment(field, 'YYYY/MM/DDTHH:mm:ssZZ').format('DD/MM/YYYY')
      } else {
        field = moment(field, 'YYYY/MM/DDTHH:mm:ssZZ').format('DD/MM/YYYY HH:mm')
      }
    }
    return field
  },

  checkAndFormatIfDate: function (field) {
    if (field) {
      const datePattern = [
        /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
        /^([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\/\d\d\d\d (20|21|22|23|[0-1]?\d):[0-5]?\d$/
      ]
      datePattern.forEach(pattern => {
        if (pattern.test(field)) {
          field = moment(field, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DDTHH:mm:ssZZ')
        }
      })
    }
    return field
  },

  // Retirar formatação para utilizar somente números
  unformatNumber: function (pNum) {
    return String(pNum).replace(/\D/g, '')
  },
  isCnpj: function (value) {
    if (!value) return false
    // Aceita receber o valor como string, número ou array com todos os dígitos
    const isString = typeof value === 'string'
    const validTypes = isString || Number.isInteger(value) || Array.isArray(value)
    // Elimina valor em formato inválido
    if (!validTypes) return false
    // Filtro inicial para entradas do tipo string
    if (isString) {
      // Limita ao máximo de 18 caracteres, para CNPJ formatado
      if (value.length > 18) return false
      // Teste Regex para veificar se é uma string apenas dígitos válida
      const digitsOnly = /^\d{14}$/.test(value)
      // Teste Regex para verificar se é uma string formatada válida
      const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)
      // Se o formato é válido, usa um truque para seguir o fluxo da validação
      if (digitsOnly || validFormat) true // eslint-disable-line
      // Se não, retorna inválido
      else return false
    }

    // Guarda um array com todos os dígitos do valor
    const match = value.toString().match(/\d/g)
    const numbers = Array.isArray(match) ? match.map(Number) : []

    // Valida a quantidade de dígitos
    if (numbers.length !== 14) return false
    // Elimina inválidos com todos os dígitos iguais
    const items = [...new Set(numbers)]
    if (items.length === 1) return false

    // Cálculo validador
    const calc = (x) => {
      const slice = numbers.slice(0, x)
      let factor = x - 7
      let sum = 0

      for (let i = x; i >= 1; i--) {
        const n = slice[x - i]
        sum += n * factor--
        if (factor < 2) factor = 9
      }

      const result = 11 - (sum % 11)

      return result > 9 ? 0 : result
    }

    // Separa os 2 últimos dígitos de verificadores
    const digits = numbers.slice(12)
    // Valida 1o. dígito verificador
    const digit0 = calc(12)
    if (digit0 !== digits[0]) return false

    // Valida 2o. dígito verificador
    const digit1 = calc(13)
    return digit1 === digits[1]
  },

  isCpf: function (cpf) {
    var i, rev

    cpf = this.unformatNumber(cpf)

    if (cpf === '') {
      return false
    }

    // Elimina CPFs invalidos conhecidos
    if (cpf.length !== 11 || cpf === '00000000000' ||
      cpf === '11111111111' || cpf === '22222222222' ||
      cpf === '33333333333' || cpf === '44444444444' ||
      cpf === '55555555555' || cpf === '66666666666' ||
      cpf === '77777777777' || cpf === '88888888888') {
      return false
    }

    var add = 0

    // Valida 1o digito add = 0;
    for (i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i), 10) * (10 - i)
    }

    rev = 11 - (add % 11)

    if (rev === 10 || rev === 11) {
      rev = 0
    }

    if (rev !== parseInt(cpf.charAt(9), 10)) {
      return false
    }

    add = 0

    // Valida 2o digito add = 0;
    for (i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i), 10) * (11 - i)
    }

    rev = 11 - (add % 11)

    if (rev === 10 || rev === 11) {
      rev = 0
    }

    if (rev !== parseInt(cpf.charAt(10), 10)) {
      return false
    }

    return true
  }
}

export default FormatUtils
