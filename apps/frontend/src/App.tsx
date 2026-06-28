import { useEffect } from 'react';
import { useProfile } from './hooks';
import Router from './routes/router';

export default function App() {
    const { getProfile } = useProfile();

    useEffect(() => {
        getProfile();
    }, []);

    return <Router />;
}
