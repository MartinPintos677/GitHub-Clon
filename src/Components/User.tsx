import React from 'react'
import Header from '../Components/Header'
import { useAuth } from '../Auth/AuthContext'
import gatito from '/gatito.jpg'
import '../Css/User.css'

const User: React.FC = () => {
  const { state } = useAuth()

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
        </div>
      </div>
    </div>
  )
}

export default User
