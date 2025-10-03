import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// Iconos sólidos
import {
  faEnvelope,
  faPhone,
  faCode,
  faPalette,
  faDatabase,
  faLayerGroup,
  faCartShopping,
  faTerminal,
  faServer,
} from '@fortawesome/free-solid-svg-icons'
// Iconos de marcas
import {
  faLaravel,
  faNodeJs,
  faJava,
  faGitAlt,
  faGithub,
  faGitlab,
  faLinkedin,
  faVuejs,
  faReact,
  faAngular,
  faDocker,
  faShopify,
  faAws,
} from '@fortawesome/free-brands-svg-icons'

library.add(
  faLaravel,
  faNodeJs,
  faJava,
  faGitAlt,
  faGithub,
  faGitlab,
  faTerminal,
  faVuejs,
  faReact,
  faAngular,
  faDocker,
  faShopify,
  faAws,
  faVuejs,
  faReact,
  faServer,
  faAngular,
  faDocker,
  faShopify,
  faAws,
)

// Agregar iconos a la librería
library.add(
  faEnvelope,
  faPhone,
  faCode,
  faPalette,
  faDatabase,
  faLayerGroup,
  faCartShopping,
  faLinkedin,
)

// Exportar componente
export default FontAwesomeIcon
