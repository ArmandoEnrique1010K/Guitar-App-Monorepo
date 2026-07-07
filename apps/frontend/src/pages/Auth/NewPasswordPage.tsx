import { useState } from 'react';
import { AuthTitle, SecondaryText } from '@/components';
import { ResetPasswordView, ValidatePasswordResetTokenView } from '@/views';

export const NewPasswordPage = () => {
    // Estados locales relacionados al token de 6 digitos
    const [token, setToken] = useState('');
    const [isValidToken, setIsValidToken] = useState(false);

    return (
        <>
            <AuthTitle title="Reestablecer contraseña" />

            {/* En este caso se dependiendo si se ha validado el token de 6 digitos se 
            mostrara una vista */}
            {!isValidToken ? (
                // Vista para validar el token de 6 digitos con el fin de reestablecer
                // la contraseña
                <ValidatePasswordResetTokenView
                    token={token}
                    setToken={setToken}
                    setIsValidToken={setIsValidToken}
                />
            ) : (
                // Si fue validado el token, se muestra el formulario para reestablecer
                // la contraseña
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
