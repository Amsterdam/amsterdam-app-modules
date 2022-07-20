import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import EditModule from "./pages/EditModule"
import EditModules from "./pages/EditModules"
import ModulesInApp from "./pages/ModulesInApp"
import NewAppVersion from "./pages/NewAppVersion"
import NewModule from "./pages/NewModule"
import ToggleModules from "./pages/ToggleModules"
import { useContext } from "react"
import AuthContext from "./context/AuthProvider"

const App = () => {
  const authContext = useContext(AuthContext)
  const hasAccessToken = authContext.auth.hasOwnProperty('access')

  return (
    (!hasAccessToken ? (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    ) : (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ModulesInApp />} />
          <Route path="/new-module" element={<NewModule />} />
          <Route path="/edit-module" element={<EditModule />} />
          <Route path="/edit-modules" element={<EditModules />} />
          <Route path="/toggle-modules" element={<ToggleModules />} />
          <Route path="/new-app-version" element={<NewAppVersion />} />
        </Routes>
      </BrowserRouter>
    ))
  )
}

export default App