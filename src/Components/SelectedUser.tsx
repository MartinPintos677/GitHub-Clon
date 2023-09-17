import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup, faHouseUser } from '@fortawesome/free-solid-svg-icons'
import RepoModal from './RepoModal'
import Header from '../Components/Header'
import axios from 'axios'
import { format } from 'date-fns'
import '../Css/User.css'
import { useParams } from 'react-router-dom'
import { useAuth } from '../Auth/AuthContext'

const SelectedUser: React.FC = () => {
  const { username } = useParams()
  const [userDetails, setUserDetails] = useState<any>(null)
  const [userRepos, setUserRepos] = useState<any[]>([])
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const { state } = useAuth()

  useEffect(() => {
    // Realiza una llamada a la API de GitHub para obtener los detalles del usuario seleccionado
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        )
        setUserDetails(response.data)
      } catch (error) {
        console.error('Error fetching user details:', error)
      }
    }

    // Realiza una llamada a la API de GitHub para obtener los repositorios del usuario
    const fetchUserRepos = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        )

        // Ordeno los repositorios por fecha de última actualización (de forma descendente)
        const organizedRepos = response.data.sort((a: any, b: any) =>
          a.pushed_at < b.pushed_at ? 1 : -1
        )
        setUserRepos(organizedRepos)
      } catch (error) {
        console.error('Error fetching user repositories:', error)
      }
    }

    if (username) {
      fetchUserDetails()
      fetchUserRepos()
    }
  }, [username])

  // Define un tipo para los objetos de repositorio
  type Repo = {
    id: number
    name: string
    description: string
    // Agrega otros campos del objeto de repositorio según tu estructura
  }

  const handleRepoClick = (repo: Repo) => {
    setSelectedRepo(repo)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedRepo(null)
    setIsModalOpen(false)
  }

  const handleGoToHome = () => {
    // Redirige a la ruta '/user/${state.username}'
    navigate(`/user/${state.username}`)
  }

  return (
    <div>
      <Header />
      <div className="full-user-container">
        <div className="user-container">
          {userDetails && (
            <div className="user-profile">
              <img
                src={userDetails.avatar_url}
                alt={`Avatar de ${userDetails.login}`}
                className="avatar-user"
              />
              <h2 className="name-user">{userDetails.name}</h2>
              <p className="username-user">{userDetails.login}</p>
              <p className="bio-user">{userDetails.bio}</p>
              <div className="stats">
                <div className="user-group-icon">
                  <FontAwesomeIcon icon={faUserGroup} className="" />
                </div>
                <div className="followers">
                  Seguidores
                  <span className="count-user">
                    {' '}
                    {userDetails.followers}
                  </span>{' '}
                </div>
                <div className="following">
                  Siguiendo
                  <span className="count-user">
                    {' '}
                    {userDetails.following}
                  </span>{' '}
                </div>
              </div>
              <hr className="text-light" />
              <div className="btn-container">
                {/*<button className="btn-clear" onClick={handleClearSearch}>
              Volver a búsqueda 
            </button> */}
                <button className="btn-back" onClick={handleGoToHome}>
                  <FontAwesomeIcon icon={faHouseUser} className="" />
                </button>
              </div>
            </div>
          )}
        </div>

        {userRepos.length > 0 ? (
          <div className="col user-repos">
            <h3>Repositorios de {username}</h3>
            <ul>
              <hr className="mt-4" />
              {userRepos.map((repo: any) => (
                <li key={repo.id}>
                  <div
                    className="repo-name"
                    onClick={() => handleRepoClick(repo)}
                  >
                    {repo.name}
                  </div>
                  {repo.description && (
                    <div className="repo-description">{repo.description}</div>
                  )}
                  <div className="repo-details">
                    {repo.language && <div>{repo.language}</div>}
                    <div>
                      Última actualización:{' '}
                      {format(new Date(repo.updated_at), 'dd/MM/yyyy HH:mm')}
                    </div>
                  </div>
                  <hr className="mt-4" />
                </li>
              ))}
            </ul>
          </div>
        ) : userDetails && userDetails.public_repos === 0 ? (
          <h3 className="text-light no-repositories">
            Usuario sin repositorios.
          </h3>
        ) : null}
      </div>
      {/* Renderiza el modal si está abierto */}
      {isModalOpen && (
        <RepoModal repo={selectedRepo} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default SelectedUser
