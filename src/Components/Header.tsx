import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useAuth } from '../Auth/AuthContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../Css/Header.css'

interface HeaderProps {
  setHasAttemptedSearch: React.Dispatch<React.SetStateAction<boolean>>
  setSearchResults: React.Dispatch<
    React.SetStateAction<{ userCount: number; repoCount: number }>
  >
}

const Header: React.FC<HeaderProps> = ({
  setHasAttemptedSearch,
  setSearchResults
}) => {
  const { state, dispatch } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = async () => {
    try {
      if (state.isLoggedIn) {
        const response = await axios.get(
          `https://api.github.com/search/users?q=${searchQuery}`
        )
        const userData = response.data

        const repoResponse = await axios.get(
          `https://api.github.com/search/repositories?q=${searchQuery}`
        )
        const repoData = repoResponse.data

        const newSearchResults = {
          userCount: userData.total_count,
          repoCount: repoData.total_count
        }

        setSearchResults(newSearchResults)

        setHasAttemptedSearch(true)

        // Navega a la ruta solo si el usuario está logueado
        navigate(`/user/${state.username}/countresults/${searchQuery}`)

        console.log('La cantidad de users es: ' + userData.total_count)
        console.log('La cantidad de repos es: ' + repoData.total_count)
      } else if (searchQuery.trim() !== '') {
        // Si no está logueado y searchQuery no está vacío, muestra el mensaje de error
        console.error('Debe estar logueado para usar el buscador.')
        setHasAttemptedSearch(true)
      } else {
        // Si no está logueado y searchQuery está vacío, no hagas nada
      }
    } catch (error) {
      console.error('Error al buscar en la API de GitHub:', error)
    }
  }

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
                <div className="dropdown-header">
                  <button className="username-logout" onClick={handleLogout}>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="username-message-two">
              {searchQuery.trim() !== '' &&
                !state.isLoggedIn &&
                'Debe estar logueado para usar el buscador.'}
            </div>
          )}
        </div>

        <div className="">
          <div className="search-panels">
            <div className="search-group">
              <input
                required
                type="text"
                name="text"
                autoComplete="on"
                className="input"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyPress={e => {
                  if (e.key === 'Enter') {
                    handleSearch()
                  }
                }}
              />
              <label className="enter-label">
                Buscar usuario o repositorio
              </label>
              <div className="btn-box">
                <button className="btn-search" onClick={handleSearch}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 512 512"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                    <circle id="svg-circle" cx="208" cy="208" r="144"></circle>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="line-header"></div>
    </div>
  )
}

export default Header
