import { AuthTitle } from '@/components/Auth/AuthTitle';
import type { ConfirmAccountForm } from '@/schemas';
import { useState } from 'react';
import { TokenForm } from '@/views/Auth/TokenForm';
import { NewPasswordForm } from '@/views/Auth/NewPasswordForm';

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
        </>
    );
};
