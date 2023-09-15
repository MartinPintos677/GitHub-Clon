import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios'
import { format } from 'date-fns'
import '../Css/User.css'
import { useParams } from 'react-router-dom'
import { useAuth } from '../Auth/AuthContext'

const SelectedUser: React.FC = ({}) => {
  const { username } = useParams()
  const [userDetails, setUserDetails] = useState<any>(null)
  const [userRepos, setUserRepos] = useState<any[]>([])
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

        // Ordena los repositorios por fecha de última actualización (de forma descendente)
        const organizedRepos = response.data.sort((a: any, b: any) =>
          a.updated_at < b.updated_at ? 1 : -1
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
            </div>
          )}
        </div>

        {userRepos && (
          <div className="col user-repos">
            <h3>Repositorios de {username}</h3>
            <ul>
              <hr className="mt-4" />
              {userRepos.map((repo: any) => (
                <li key={repo.id}>
                  <div className="repo-name">{repo.name}</div>
                  <div className="repo-description">{repo.description}</div>
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
        )}
      </div>
    </div>
  )
}

export default SelectedUser
