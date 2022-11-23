import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ModulesPage from './pages/Modules';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<ModulesPage />} />
        </Routes>
    </BrowserRouter>
);

export default App;
