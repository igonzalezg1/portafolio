// src/plugins/fontawesome.ts
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Iconos sólidos
import { faUser, faHome, faEnvelope } from '@fortawesome/free-solid-svg-icons'
// Iconos de marcas
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

// Agregar iconos a la librería
library.add(faUser, faHome, faEnvelope, faGithub, faLinkedin)

// Exportar para poder registrarlo
export { FontAwesomeIcon }
