import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WalkeyProvider } from './context/WalkeyContext';
import Intro from './pages/Intro';
import Home from './pages/Home';
import RoutesList from './pages/RoutesList';
import MapDetail from './pages/MapDetail';
import Records from './pages/Records';
import Login from './pages/Login';

function App() {
    return (
        <WalkeyProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Intro />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/routes" element={<RoutesList />} />
                    <Route path="/map/:id" element={<MapDetail />} />
                    <Route path="/records" element={<Records />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </WalkeyProvider>
    );
}

export default App;
