import { Routes, Route, Navigate } from 'react-router-dom'
import Default from './Pages/Default'
import UserHome from './Pages/Home'
import UserList from './Pages/PageUsersList'
import SelectedUser from './Pages/PageSelectedUser'
import ReposList from './Pages/PageReposList'
import { useAuth } from './Auth/AuthContext'
import './App.css'

function App() {
  const { state } = useAuth()

  return (
    <Routes>
      {/* Ruta predeterminada para usuarios no autenticados */}
      {!state.isLoggedIn && <Route path="/" element={<Default />} />}

      {/* Si el usuario ya está autenticado, lo redirige a su página y no al login */}
      {state.isLoggedIn && <Route path="/" element={<UserHome />} />}

      {/* Ruta para el usuario autenticado, si no está autenticado lo redirige a Default (login) */}
      <Route
        path="/user/:username"
        element={state.isLoggedIn ? <UserHome /> : <Navigate to="/" />}
      />

      {/* Ruta para el listado de usuarios, si no está autenticado lo redirige a Default (login) */}
      <Route
        path="/user/:username/userslist"
        element={state.isLoggedIn ? <UserList /> : <Navigate to="/" />}
      />

      {/* Ruta para el usuario seleccionado, si no está autenticado lo redirige a Default (login) */}
      <Route
        path="/user/:username/userslist/:id"
        element={state.isLoggedIn ? <SelectedUser /> : <Navigate to="/" />}
      />

      {/* Ruta para el listado de repositorios, si no está autenticado lo redirige a Default (login) */}
      <Route
        path="/user/:username/reposlist"
        element={state.isLoggedIn ? <ReposList /> : <Navigate to="/" />}
      />
    </Routes>
  )
}

export default App
