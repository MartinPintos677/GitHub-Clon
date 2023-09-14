import React, { useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import '../Css/UsersList.css'
import { useAuth } from '../Auth/AuthContext'

type GitHubUser = {
  login: string
  avatar_url: string
  html_url: string
}

const GitHubUsers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [users, setUsers] = useState<GitHubUser[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const usersPerPage = 8
  const navigate = useNavigate()
  const { state } = useAuth()

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${searchQuery}`
      )
      setUsers(response.data.items)
      setCurrentPage(1) // Restablece la página actual a la primera página después de cada búsqueda
      setHasSearched(true)
    } catch (error) {
      console.error('Error fetching GitHub users:', error)
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('') // Limpia el campo de búsqueda
    setUsers([]) // Limpia la lista de usuarios encontrados
    setHasSearched(false)
  }

  const handleGoToHome = () => {
    // Redirige a la ruta '/user/${state.username}' (reemplaza 'state.username' con el valor adecuado)
    // Puedes usar una biblioteca de enrutamiento como 'react-router-dom' para realizar la redirección.
    navigate(`/user/${state.username}`)
  }

  // Función para manejar la selección de un usuario y redirigir
  const handleUserSelect = (user: GitHubUser) => {
    // Redirige a la página de detalles del usuario seleccionado
    navigate(`/user/${user.login}/userslist/${user.login}`)
  }

  // Calcular el índice inicial y final de los usuarios a mostrar en la página actual
  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  // Calcular el número total de páginas
  const totalPages = Math.ceil(users.length / usersPerPage)

  // Determina el mensaje del encabezado en función del número de usuarios encontrados
  let headerMessage = ''
  if (hasSearched) {
    if (users.length === 1) {
      headerMessage = 'Resultados de la búsqueda: (1 usuario)'
    } else if (users.length > 1) {
      headerMessage = `Resultados de la búsqueda: (${users.length} usuarios)`
    } else {
      headerMessage = 'Ningún usuario con el nombre indicado.'
    }
  } else {
    headerMessage = 'Buscador de usuarios'
  }

  return (
    <div>
      <Header />
      <div className="list-users-container">
        <div className="input-container">
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
              <label className="enter-label">Buscar usuarios</label>
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
            <div className="btn-container">
              <button className="btn-clear" onClick={handleClearSearch}>
                Limpiar búsqueda
              </button>
              <button className="btn-back" onClick={handleGoToHome}>
                Volver a inicio
              </button>
            </div>
          </div>
        </div>

        <div className="users-container">
          <div className="user-list">
            <h2>{headerMessage}</h2>
            <ul>
              {currentUsers.map(user => (
                <li
                  key={user.login}
                  className="d-grid justify-content-center align-items-center"
                  onClick={() => handleUserSelect(user)} // Manejar clic en el usuario
                >
                  <img src={user.avatar_url} alt={`${user.login}'s avatar`} />

                  <Link
                    className="mt-2 mb-3"
                    to={`/user/${user.login}/userslist/${user.login}`} // Agregar enlace para la navegación
                    rel="noopener noreferrer"
                  >
                    {user.login}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Agrega la paginación aquí */}
          <div className="pagination mb-3">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GitHubUsers
