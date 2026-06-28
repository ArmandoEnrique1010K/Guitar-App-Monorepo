import { TextContainer } from '@/components';
import { useProfile } from '@/hooks';
import { StackIcon } from '@/icons';
import { Button } from '@/ui';

export const WorkspaceView = () => {
    const { profile } = useProfile();

    return (
        <div>
            <div className="flex flex-row gap-4">
                <TextContainer>
                    {profile
                        ? 'Seleccione un espacio de trabajo'
                        : 'Inicie sesión para crear o seleccionar un espacio de trabajo'}
                </TextContainer>
                {profile && (
                    <Button
                        text="Seleccionar"
                        icon={<StackIcon className="size-4" />}
                        onClick={() => {}}
                    ></Button>
                )}
            </div>
            <div>{JSON.stringify(profile, null, 2)}</div>
        </div>
    );
};
