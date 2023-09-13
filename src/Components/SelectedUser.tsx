import React from 'react'
import '../Css/User.css'

interface UserProfileProps {
  avatarUrl: string
  name: string
  username: string
  bio: string
  followers: number
  following: number
}

const UserProfile: React.FC<UserProfileProps> = ({
  avatarUrl,
  name,
  username,
  bio,
  followers,
  following
}) => {
  return (
    <div>
      <div className="user-profile">
        <img
          src={avatarUrl}
          alt={`Avatar de ${username}`}
          className="avatar-user"
        />
        <h2 className="name-user">{name}</h2>
        <p className="username-user">@{username}</p>
        <p className="bio-user">{bio}</p>
        <div className="stats">
          <div className="followers">
            <span className="count-user">{followers}</span> Followers
          </div>
          <div className="following">
            <span className="count-user">{following}</span> Following
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
