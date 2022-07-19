import { BrowserRouter, Route, Routes } from "react-router-dom"
import EditModule from "./components/EditModule"
import EditModules from "./components/EditModules"
import ModulesInApp from "./components/ModulesInApp"
import NewAppVersion from "./components/NewAppVersion"
import NewModule from "./components/NewModule"
import ToggleModules from "./components/ToggleModules"


const App = () => {
  return (
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
  )
}

export default App