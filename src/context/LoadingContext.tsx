import {createContext, useContext, useState, useEffect, type ReactNode} from 'react';

interface LoadingContextType {
    loading: boolean;
    times: number;
    setLoading: (loading: boolean) => void;
    setTimes: (times: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({children}: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [times, setTimes] = useState<number>(0);

    useEffect(() => {
        /* Initial load effect to hide loader after a short delay if it was set to true initially */
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const setLoadingWithTimes = (isLoading: boolean) => {
        if (!isLoading && loading) {
            setTimes(prev => prev + 1);
        }
        setLoading(isLoading);
    };

    return (
        <LoadingContext.Provider value={{loading, times, setLoading: setLoadingWithTimes, setTimes}}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoad = () => {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoad must be used within a LoadingProvider');
    }
    return context;
};
