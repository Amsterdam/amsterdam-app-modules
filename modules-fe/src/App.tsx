import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ModulesPage from './pages/Modules';
import { store } from './store/store';

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ModulesPage />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);

export default App;
