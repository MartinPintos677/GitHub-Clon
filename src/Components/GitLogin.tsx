import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import '../Css/GitLogin.css'

const LoginForm = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <div className="">
          <FontAwesomeIcon icon={faGithub} className="github-logo-login" />
        </div>
        <h2>Iniciar Sesión en GitHub</h2>
        <div className="line-h2"></div>
        <div className="input-container">
          <label className="input-container-label" htmlFor="username">
            Nombre de Usuario o Email
          </label>
          <input
            className="input-container-label"
            type="text"
            id="username"
            name="username"
          />
        </div>
        <div className="input-container">
          <label className="input-container-label-pass" htmlFor="password">
            Contraseña
          </label>
          <input
            className="input-container-label"
            type="password"
            id="password"
            name="password"
          />
        </div>
        <button className="btn-login" type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  )
}

export default LoginForm
