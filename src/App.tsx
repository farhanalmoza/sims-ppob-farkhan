// import "./App.css"
import "./index.css"
import Registration from "./pages/register"
import { Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Registration />} />
      </Routes>
    </>
  )
}

export default App
