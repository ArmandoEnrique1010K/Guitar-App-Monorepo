import { useState } from 'react';
import { AuthTitle, SecondaryText } from '@/components';
import type { ConfirmAccountForm } from '@/types';
import { ResetPasswordView, ValidatePasswordResetTokenView } from '@/views';

export const NewPasswordPage = () => {
    const [token, setToken] = useState<ConfirmAccountForm['token']>('');
    const [isValidToken, setIsValidToken] = useState(false);

    return (
        <>
            <AuthTitle title="Reestablecer contraseña" />

            {!isValidToken ? (
                <ValidatePasswordResetTokenView
                    token={token}
                    setToken={setToken}
                    setIsValidToken={setIsValidToken}
                />
            ) : (
                <ResetPasswordView token={token} />
            )}

            <SecondaryText
                text="Necesitas un nuevo código."
                linkText="Solicítalo aquí"
                link="/auth/forgot-password"
            />
        </>
    );
};
