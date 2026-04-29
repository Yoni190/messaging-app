import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Header from './components/Header'






function App() {

  return (
    <BrowserRouter>
    <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route
              path='/home'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
              />
          </Routes>
        </main>
    </div>
    </BrowserRouter>
  )
}

export default App
