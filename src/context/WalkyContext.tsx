import { createContext, useState, useContext, ReactNode } from 'react';

export type Theme = 'nature' | 'silent' | 'sparkling' | 'cafe';

export interface Route {
    id: number;
    title: string;
    desc: string;
    time: number;
    dist: string;
    bg: string;
    theme: Theme;
}

export interface User {
    name: string;
    email: string;
}

export interface WalkyRecord {
    id: number;
    date: string;
    theme: Theme;
    dist: string | number;
    time: number;
    completed: boolean;
}

interface WalkyContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    time: number;
    setTime: (time: number) => void;
    routes: Route[];
    setRoutes: (routes: Route[]) => void;
    selectedRoute: Route | null;
    setSelectedRoute: (route: Route | null) => void;
    user: User | null;
    setUser: (user: User | null) => void;
    lastWalk: WalkyRecord | null;
    setLastWalk: (record: WalkyRecord | null) => void;
}

const WalkyContext = createContext<WalkyContextType | undefined>(undefined);

export function WalkyProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('nature');
    const [time, setTime] = useState<number>(30);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [lastWalk, setLastWalk] = useState<WalkyRecord | null>(null);

    const value: WalkyContextType = {
        theme, setTheme,
        time, setTime,
        routes, setRoutes,
        selectedRoute, setSelectedRoute,
        user, setUser,
        lastWalk, setLastWalk
    };

    return (
        <WalkyContext.Provider value={value}>
            {children}
        </WalkyContext.Provider>
    );
}

export function useWalky() {
    const context = useContext(WalkyContext);
    if (context === undefined) {
        throw new Error('useWalky must be used within a WalkyProvider');
    }
    return context;
}
