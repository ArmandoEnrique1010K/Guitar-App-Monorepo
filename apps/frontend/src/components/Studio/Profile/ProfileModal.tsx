import { Modal } from '@/components';
import { useProfile } from '@/hooks';

export const ProfileModal = () => {
    const { showProfile, setShowProfile, profile } = useProfile();

    // TODO: MEJORAR ESTE COMPONENTE
    return (
        <>
            <Modal
                title="Perfil"
                open={showProfile}
                onOpenChange={setShowProfile}
                children={
                    <div>
                        <div>Usuario: {profile?.name}</div>

                        <div>Correo: {profile?.email}</div>
                    </div>
                }
            />
        </>
    );
};
