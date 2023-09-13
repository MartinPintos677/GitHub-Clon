import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '../Auth/AuthContext'
import { useNavigate } from 'react-router-dom' // Importa useNavigate en lugar de useHistory
import '../Css/Header.css'

const Header: React.FC = () => {
  const { state, dispatch } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isSecondDropdownOpen, setIsSecondDropdownOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('usuarios')
  const secondDropdownRef = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate() // Utiliza useNavigate en lugar de useHistory

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState)
  }

  const toggleSecondDropdown = () => {
    setIsSecondDropdownOpen(prevState => !prevState)
  }

  const handleDropdownSelect = (option: string) => {
    setSelectedOption(option)
    toggleDropdown()

    if (option === 'usuarios') {
      // Utiliza navigate para redirigir al usuario a la página deseada
      navigate(`/user/${state.username}/userslist`)
    }
  }

  return (
    <div className="header-full">
      <div className="elements">
        <div className="header-left">
          <FontAwesomeIcon icon={faGithub} className="github-logo" />
          {state.isLoggedIn ? (
            <div className="username-container">
              <div className="username-message" onClick={toggleDropdown}>
                {state.username} &#9660;
              </div>
              {isDropdownOpen && (
                <div className="dropdown-header mb-2">
                  <button className="username-logout" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
        <div>
          <div className="custom-dropdown-two">
            {state.isLoggedIn ? (
              <div className="username-message" onClick={toggleSecondDropdown}>
                Buscador &#9660;
              </div>
            ) : (
              <p className="username-message-three">Bienvenidos a GitHub</p>
            )}
            {isSecondDropdownOpen && (
              <div
                className="nav-item dropdown-options"
                ref={secondDropdownRef}
              >
                <div
                  className="username-message"
                  style={{ fontSize: '1rem' }}
                  onClick={() => handleDropdownSelect('usuarios')}
                >
                  Usuarios
                </div>
                <div
                  className="username-message"
                  style={{ fontSize: '1rem' }}
                  onClick={() => handleDropdownSelect('repositorios')}
                >
                  Repositorios
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="line-header"></div>
    </div>
  )
}

export default Header
