import { BrowserRouter, Routes, Route, Outlet } from 'react-router'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'




function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex">
        <Sidebar />
        <div className="flex-grow">
          <Outlet />
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
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
          >
            <Route path='/home' element={<Home />} />
            <Route path='/chat/:id' element={<Chat />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/edit-profile' element={<EditProfile />} />
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App