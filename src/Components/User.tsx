import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import { useAuth } from '../Auth/AuthContext'
import gatito from '/gatito.jpg'
import '../Css/User.css'

const User: React.FC = () => {
  const { state } = useAuth()
  const [hasAttemptedSearch, setHasAttemptedSearch] = useState(false)
  const [searchResults, setSearchResults] = useState({
    userCount: 0,
    repoCount: 0
  })

  console.log('Usuarios: ' + searchResults.userCount)
  console.log('Repos: ' + searchResults.repoCount)

  return (
    <div>
      <Header
        setHasAttemptedSearch={setHasAttemptedSearch}
        setSearchResults={setSearchResults}
      />
      <div className="user-repo-search">
        <div className="user-profile">
          <img
            src={gatito}
            alt={`Avatar de ${state.username}`}
            className="avatar-user"
          />
          <div className="user-container">
            <h2 className="name-user">{state.username}</h2>
            <p className="username-user">@{state.username}</p>
            <p className="bio-user">Bienvenidos a mi GitHub</p>
            <div className="stats">
              <div className="followers">
                <span className="count-user"></span> Followers: 7
              </div>
              <div className="following">
                <span className="count-user"></span> Following: 8
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User
