import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import axios from 'axios'
import '../Css/User.css'
import { useParams } from 'react-router-dom'

const SelectedUser: React.FC = ({}) => {
  const { username } = useParams()
  const [userDetails, setUserDetails] = useState<any>(null) // Cambia 'any' por el tipo correcto para los detalles del usuario

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

    if (username) {
      fetchUserDetails() // Llama a fetchUserDetails solo si 'username' está definido
    }
  }, [username])

  return (
    <div>
      {' '}
      <Header />
      <div>
        {userDetails && (
          <div className="user-profile">
            <img
              src={userDetails.avatar_url}
              alt={`Avatar de ${userDetails.login}`}
              className="avatar-user"
            />
            <h2 className="name-user">{userDetails.name}</h2>
            <p className="username-user">@{userDetails.login}</p>
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
    </div>
  )
}

export default SelectedUser
