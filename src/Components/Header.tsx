import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '../Auth/AuthContext'
import '../Css/Header.css'

const Header = () => {
  const { state, dispatch } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState)
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
              <div></div>
            ) : (
              <p className="username-message-three">Bienvenidos a GitHub</p>
            )}
          </div>
        </div>
      </div>
      <div className="line-header"></div>
    </div>
  )
}

export default Header
