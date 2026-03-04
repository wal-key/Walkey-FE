import { createContext, useState, useContext, ReactNode } from 'react';

export type Theme = 'nature' | 'silent' | 'sparkling' | 'cafe';

export interface Route {
    id: number;
    title: string;
    desc: string;
    time: number;
    dist: string;
    bg?: string;
    theme: Theme;
    path?: { lat: number; lng: number }[];
}

export interface User {
    id: string;
    email?: string;
    username: string;
    avatar_url: string;
}

export interface WalkeyRecord {
    id: number;
    date: string;
    theme: Theme;
    dist: string | number;
    time: number;
    completed: boolean;
}

interface WalkeyContextType {
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
    lastWalk: WalkeyRecord | null;
    setLastWalk: (record: WalkeyRecord | null) => void;
}

const WalkeyContext = createContext<WalkeyContextType | undefined>(undefined);

export function WalkeyProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('nature');
    const [time, setTime] = useState<number>(30);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [lastWalk, setLastWalk] = useState<WalkeyRecord | null>(null);

    const value: WalkeyContextType = {
        theme, setTheme,
        time, setTime,
        routes, setRoutes,
        selectedRoute, setSelectedRoute,
        user, setUser,
        lastWalk, setLastWalk
    };

    return (
        <WalkeyContext.Provider value={value}>
            {children}
        </WalkeyContext.Provider>
    );
}

export function useWalkey() {
    const context = useContext(WalkeyContext);
    if (context === undefined) {
        throw new Error('useWalkey must be used within a WalkeyProvider');
    }
    return context;
}
