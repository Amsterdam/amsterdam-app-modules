import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ModulesScreen from './screens/Modules.screen';
import { store } from './store/store';

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ModulesScreen />} />
            </Routes>
        </BrowserRouter>
    </Provider>
);

export default App;
