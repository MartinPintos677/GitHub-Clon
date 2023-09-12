import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Default from '../src/Pages/Default'
import User from '../src/Components/User'
import CountResults from '../src/Components/CountResults'
import { useAuth } from './Auth/AuthContext'
import './App.css'

function App() {
  const { state } = useAuth()
  const [searchCounts, setSearchCounts] = useState({
    userCount: 0,
    repoCount: 0
  }) // Nuevo estado para los recuentos de búsqueda

  return (
    <Routes>
      {/* Si el usuario está autenticado, redirige a su página */}
      {state.isLoggedIn && (
        <Route path="/" element={<Navigate to={`/user/${state.username}`} />} />
      )}
      {/* Ruta predeterminada para usuarios no autenticados */}
      <Route path="/" element={<Default />} />
      {/* Ruta para el usuario autenticado, si no está autenticado lo redirige a Default */}
      <Route
        path="/user/:username"
        element={state.isLoggedIn ? <User /> : <Navigate to="/" />}
      />
      {/* Ruta para la búsqueda en el Header */}
      <Route
        path="/user/:username/countresults/:searchQuery"
        element={
          state.isLoggedIn ? (
            <CountResults
              userCount={searchCounts.userCount}
              repoCount={searchCounts.repoCount}
            />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  )
}

export default App
