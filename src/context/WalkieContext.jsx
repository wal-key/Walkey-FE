import { createContext, useState, useContext } from 'react';

const WalkieContext = createContext();

export function WalkieProvider({ children }) {
    const [theme, setTheme] = useState('nature');
    const [time, setTime] = useState(30);
    const [routes, setRoutes] = useState([]);
    const [selectedRoute, setSelectedRoute] = useState(null);

    const value = {
        theme, setTheme,
        time, setTime,
        routes, setRoutes,
        selectedRoute, setSelectedRoute
    };

    return (
        <WalkieContext.Provider value={value}>
            {children}
        </WalkieContext.Provider>
    );
}

export function useWalkie() {
    return useContext(WalkieContext);
}
