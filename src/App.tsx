// import "./App.css"
import { useDispatch, useSelector } from "react-redux"
import "./index.css"
import Home from "./pages/home"
import Login from "./pages/login"
import Registration from "./pages/register"
import { Route, Routes } from "react-router-dom"
import { RootState } from "./app/store"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import PublicRoute from "./components/auth/PublicRoute"
import { useEffect } from "react"
import { setCredentials } from "./features/auth/authSlice"
import { TopUp } from "./pages/topup"
import { Toaster } from "react-hot-toast"
import Payment from "./pages/payment"

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setCredentials({ token }));
    }
  }, [dispatch]);
  
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
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

        <Route path="/top-up" element={
          <ProtectedRoute>
            <TopUp />
          </ProtectedRoute>
        } />
        <Route path="/payment/:service_code" element={ 
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
