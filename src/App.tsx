import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WalkeyProvider } from './context/WalkeyContext';
import Landing from './pages/Landing';
import WalkSetup from './pages/WalkSetup';
import RouteSelect from './pages/RouteSelect';
import WalkingSession from './pages/WalkingSession';
import Records from './pages/Records';

function App() {
    return (
        <WalkeyProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/walk-setup" element={<WalkSetup />} />
                    <Route path="/route-select" element={<RouteSelect />} />
                    <Route path="/walking-session/:id" element={<WalkingSession />} />
                    <Route path="/records" element={<Records />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </WalkeyProvider>
    );
}

export default App;
