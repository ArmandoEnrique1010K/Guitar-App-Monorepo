import { Modal } from '@/components';
import { useProfile } from '@/hooks';
import { CrossIcon } from '@/icons';
import { Button } from '@/ui';

export const ProfileModal = () => {
    const { showProfileModal, toggleProfileModal, profile } = useProfile();

    return (
        <Modal
            title="Perfil"
            open={showProfileModal}
            onOpenChange={toggleProfileModal}
            children={
                <div className="flex flex-col gap-2">
                    <div>Usuario: {profile?.name}</div>
                    <div>Correo: {profile?.email}</div>

                    <div className="flex justify-end">
                        <Button
                            onClick={toggleProfileModal}
                            icon={<CrossIcon className="size-6" />}
                            text="Cerrar"
                        />
                    </div>
                </div>
            }
        />
    );
};
