import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth/AuthContext'
import '../Css/GitLogin.css'

const LoginForm: React.FC = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('Martin')
  const [password, setPassword] = useState('123')

  /*const handleLogin = () => {
    // Aquí debes realizar la lógica de autenticación.
    // Por ahora, solo llamaremos a la función 'login' con un nombre de usuario ficticio.
    console.log('Iniciar sesión con nombre de usuario:', username)

    login(username)
  }*/

  const handleLogin = () => {
    // Realiza la lógica de autenticación aquí, esto es ficticio
    if (username && password) {
      // Llama a la acción de login con el nombre de usuario
      login(username)

      // Navega a la página deseada usando useNavigate
      navigate(`/user/${username}`)
    }
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin} method="POST">
        <div className="">
          <FontAwesomeIcon icon={faGithub} className="github-logo-login" />
        </div>
        <h2>Iniciar Sesión en GitHub</h2>
        <div className="line-h2"></div>
        <div className="input-container-login">
          <label className="input-container-label" htmlFor="username">
            Nombre de Usuario o Email
          </label>
          <input
            className="input-container-label"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="input-container-login">
          <label className="input-container-label-pass" htmlFor="password">
            Contraseña
          </label>
          <input
            className="input-container-label"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
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
