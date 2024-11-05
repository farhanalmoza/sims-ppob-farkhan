// import "./App.css"
import { useSelector } from "react-redux"
import "./index.css"
import Home from "./pages/home"
import Login from "./pages/login"
import Registration from "./pages/register"
import { Route, Routes } from "react-router-dom"
import { RootState } from "./app/store"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import PublicRoute from "./components/auth/PublicRoute"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={
          <PublicRoute>
            <Registration />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
