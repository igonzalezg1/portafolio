// src/plugins/fontawesome.ts
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Iconos sólidos (fas)
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

// Iconos de marcas (fab)
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

// Agregar iconos a la librería
library.add(faEnvelope, faPhone, faLinkedin)

// Exportar componente
export default FontAwesomeIcon
