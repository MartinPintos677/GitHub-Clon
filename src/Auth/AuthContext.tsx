import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode
} from 'react'

// Define el tipo de estado y las acciones
type AuthState = {
  isLoggedIn: boolean
  username: string
}

type AuthAction =
  | { type: 'LOGIN'; payload: { username: string } }
  | { type: 'LOGOUT' }

// Define el contexto de autenticación
interface AuthContextType {
  state: AuthState
  dispatch: Dispatch<AuthAction>
  login: (username: string) => void // Agrega la función 'login' aquí
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de un AuthProvider')
  }
  return context
}

// Define el tipo para children
interface AuthProviderProps {
  children: ReactNode
}

// Define el componente AuthProvider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Recupera los datos de autenticación de localStorage si están disponibles
  const localStorageIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const localStorageUsername = localStorage.getItem('username') || ''

  const initialState: AuthState = {
    isLoggedIn: localStorageIsLoggedIn,
    username: localStorageUsername
  }

  const [state, dispatch] = useReducer(
    (prevState: AuthState, action: AuthAction) => {
      switch (action.type) {
        case 'LOGIN':
          // Al realizar un inicio de sesión exitoso, también almacena los datos en localStorage
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('username', action.payload.username)
          return {
            ...prevState,
            isLoggedIn: true,
            username: action.payload.username
          }
        case 'LOGOUT':
          // Cuando se cierra la sesión, también limpia los datos de localStorage
          localStorage.removeItem('isLoggedIn')
          localStorage.removeItem('username')
          return {
            ...prevState,
            isLoggedIn: false,
            username: ''
          }
        default:
          return prevState
      }
    },
    initialState
  )

  // Define la función 'login' que puedes utilizar para iniciar sesión
  const login = (username: string) => {
    dispatch({ type: 'LOGIN', payload: { username } })
  }

  return (
    <AuthContext.Provider value={{ state, dispatch, login }}>
      {children}
    </AuthContext.Provider>
  )
}
