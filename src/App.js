import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FormConstructorPage from './pages/FormConstructorPage';
import SavedFormsPage from './pages/SavedFormsPage';

const App = () => {
    return (
        <Router>
            <div className="App">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Конструктор формы</Link>
                        </li>
                        <li>
                            <Link to="/saved-forms">Сохраненные формы</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<FormConstructorPage />} />
                    <Route path="/saved-forms" element={<SavedFormsPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
