import { Modal } from '@/components';
import { useProfile } from '@/hooks';

export const ProfileModal = () => {
    const { showProfileModal, closeProfileModal, profile } = useProfile();

    // TODO: MEJORAR ESTE COMPONENTE
    return (
        <>
            <Modal
                title="Perfil"
                open={showProfileModal}
                onOpenChange={closeProfileModal}
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
