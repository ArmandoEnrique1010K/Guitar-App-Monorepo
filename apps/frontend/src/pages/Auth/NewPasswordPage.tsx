import { AuthTitle } from '@/components/Auth/AuthTitle';
import type { ConfirmAccountForm } from '@/schemas';
import { useState } from 'react';
import { TokenForm } from '@/views/Auth/TokenForm';
import { NewPasswordForm } from '@/views/Auth/NewPasswordForm';
import { SecondaryText } from '@/components/Auth/SecondaryText';

export const NewPasswordPage = () => {
    const [token, setToken] = useState<ConfirmAccountForm['token']>('');
    const [isValidToken, setIsValidToken] = useState(false);

    return (
        <>
            <AuthTitle title="Reestablecer contraseña" />

            {!isValidToken ? (
                <TokenForm
                    token={token}
                    setToken={setToken}
                    setIsValidToken={setIsValidToken}
                />
            ) : (
                <NewPasswordForm token={token} />
            )}

            <SecondaryText
                text="Necesitas un nuevo código."
                linkText="Solicítalo aquí"
                link="/auth/forgot-password"
            />
        </>
    );
};
