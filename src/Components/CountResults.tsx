import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import '../Css/Results.css'
import { useParams } from 'react-router-dom'

interface CountResultProps {
  userCount: number
  repoCount: number
}

const CountResult: React.FC<CountResultProps> = ({ userCount, repoCount }) => {
  const { searchQuery } = useParams()
  const [hasAttemptedSearch, setHasAttemptedSearch] = useState(false)
  const [searchResults, setSearchResults] = useState({
    userCount: userCount,
    repoCount: repoCount
  })

  // Escucha cambios en userCount y repoCount, y actualiza searchResults
  useEffect(() => {
    setSearchResults({
      userCount: userCount,
      repoCount: repoCount
    })
  }, [userCount, repoCount])

  return (
    <div>
      <Header
        setHasAttemptedSearch={setHasAttemptedSearch}
        setSearchResults={setSearchResults}
      />
      <div className="search-result">
        <h5 className="results-text">
          Resultados de la búsqueda para "{searchQuery}"
        </h5>
        <p className="results-text">
          Cantidad de usuarios encontrados: {searchResults.userCount}
        </p>
        <p className="results-text">
          Cantidad de repositorios encontrados: {searchResults.repoCount}
        </p>
      </div>
    </div>
  )
}

export default CountResult
