import { getUser, type User } from '@/api';
import { Modal } from '@/components';
import { useProfile } from '@/hooks';
import { useEffect, useState } from 'react';

export const ProfileModal = () => {
    const { showProfile, setShowProfile } = useProfile();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getUser().then((user) => {
            setUser(user);
        });
    }, []);

    if (!user) {
        return null;
    }

    const { email, name } = user;

    // TODO: MEJORAR ESTE COMPONENTE
    return (
        <>
            <Modal
                title="Perfil"
                open={showProfile}
                onOpenChange={setShowProfile}
                children={
                    <div>
                        <div>Usuario: {name}</div>

                        <div>Correo: {email}</div>
                    </div>
                }
            />
        </>
    );
};
