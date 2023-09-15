//import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Default from './Pages/Default'
import UserHome from './Pages/Home'
import UserList from './Pages/PageUsersList'
import SelectedUser from './Pages/PageSelectedUser'
import { useAuth } from './Auth/AuthContext'
import './App.css'

function App() {
  const { state } = useAuth()

  return (
    <Routes>
      {/* Ruta predeterminada para usuarios no autenticados */}
      <Route path="/" element={<Default />} />

      {/* Si el usuario está autenticado, redirige a su página */}
      {state.isLoggedIn && (
        <Route path="/" element={<Navigate to={`/user/${state.username}`} />} />
      )}

      {/* Ruta para el usuario autenticado, si no está autenticado lo redirige a Default */}
      <Route
        path="/user/:username"
        element={state.isLoggedIn ? <UserHome /> : <Navigate to="/" />}
      />

      {/* Ruta para el listado de usuarios */}
      <Route
        path="/user/:username/userslist"
        element={state.isLoggedIn ? <UserList /> : <Navigate to="/" />}
      />

      {/* Ruta para el usuario seleccionado */}
      <Route
        path="/user/:username/userslist/:id"
        element={state.isLoggedIn ? <SelectedUser /> : <Navigate to="/" />}
      />
    </Routes>
  )
}

export default App
