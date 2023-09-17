import React, { useState } from 'react'
import Header from '../Components/Header'
import { useAuth } from '../Auth/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons'
import RepoModal from './UserStateModal'
import { useNavigate } from 'react-router-dom'
import gatito from '/Titi.jpg'
import '../Css/User.css'

const User: React.FC = () => {
  const { state } = useAuth()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null)

  const handleGoToUsers = () => {
    // Redirige a la ruta '/user/${state.username}'
    navigate(`/user/${state.username}/userslist`)
  }

  type Repo = {
    name: string
    description: string
  }

  const handleRepoClick = () => {
    const repoData: Repo = {
      name: 'Repositorio para el curso de Full Stack',
      description: 'Mi primer proyecto en GitHub'
    }

    setSelectedRepo(repoData)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedRepo(null)
    setIsModalOpen(false)
  }

  return (
    <div>
      <Header />
      <div className="full-user-container">
        <div className="user-profile">
          <img
            src={gatito}
            alt={`Avatar de ${state.username}`}
            className="avatar-user"
          />
          <div className="user-container">
            <h2 className="name-user">{state.username}</h2>
            <p className="username-user">{state.username}</p>
            <p className="bio-user">Bienvenidos a mi GitHub</p>
            <div className="stats">
              <div className="user-group-icon">
                <FontAwesomeIcon icon={faUserGroup} className="" />
              </div>
              <div className="followers">
                Seguidores
                <span className="count-user"> 7</span>
              </div>
              <div className="following">
                Siguiendo
                <span className="count-user"> 8</span>
              </div>
            </div>
          </div>
          <hr className="text-light" />
          <div className="btn-container">
            {/*<button className="btn-clear" onClick={handleClearSearch}>
              Volver a búsqueda 
            </button> */}
            <button className="btn-back" onClick={handleGoToUsers}>
              Buscar usuarios
            </button>
          </div>
        </div>

        <div className="col user-repos">
          <h3>Repositorios de {state.username}</h3>
          <ul>
            <hr className="mt-4" />

            <li>
              <div className="repo-name" onClick={handleRepoClick}>
                Repositorio para el curso de Full Stack
              </div>
              <div className="repo-description">
                Mi primer proyecto en GitHub
              </div>
              <div className="repo-details">
                <div>Typescript</div>
                <div>Última actualización: 10/08/2023 12:00</div>
              </div>
              <hr className="mt-4" />
            </li>
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <RepoModal
          repoState={selectedRepo} // Pasa el repositorio seleccionado
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}

export default User
