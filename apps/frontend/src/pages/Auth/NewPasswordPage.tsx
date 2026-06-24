import { useState } from 'react';
import { AuthTitle, SecondaryText } from '@/components';
import type { ConfirmAccountForm } from '@/schemas';
import { NewPasswordFormView, TokenFormView } from '@/views';

export const NewPasswordPage = () => {
    const [token, setToken] = useState<ConfirmAccountForm['token']>('');
    const [isValidToken, setIsValidToken] = useState(false);

    return (
        <>
            <AuthTitle title="Reestablecer contraseña" />

            {!isValidToken ? (
                <TokenFormView
                    token={token}
                    setToken={setToken}
                    setIsValidToken={setIsValidToken}
                />
            ) : (
                <NewPasswordFormView token={token} />
            )}

            <SecondaryText
                text="Necesitas un nuevo código."
                linkText="Solicítalo aquí"
                link="/auth/forgot-password"
            />
        </>
    );
};
