// Aca vamos a crear las rutas
import Default from '../src/Pages/Default'
import { Routes, Route } from 'react-router-dom'

import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Default />} />
      </Routes>
    </>
  )
}

export default App
