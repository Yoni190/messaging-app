import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex">
        <Sidebar />
        <div className="flex-grow">
          <Home />
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route
          path='/home'
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App