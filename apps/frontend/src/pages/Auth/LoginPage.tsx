export const LoginPage = () => {
  return (
    <div className="pt-8 pb-20 flex items-center justify-center min-w-md">
      <form
        className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm flex flex-col gap-5 mx-2"
        autoComplete="off"
        noValidate // Deshabilita la validación del navegador
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h2 className="text-4xl font-light text-center text-black font-shockwave">
          Login
        </h2>

        {/* Campo email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-black">
            Email
          </label>

          {/* <form.Field
            name="email"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "El email es obligatorio";
                if (!/\S+@\S+\.\S+/.test(value)) return "El email no es válido";
                return undefined;
              },
            }}
          >
            {(field) => (
              <>
                <input
                  id="email"
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent
                                        ${
                                          field.state.meta.errors?.length > 0
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        }`}
                  placeholder="tucorreo@ejemplo.com"
                />
                {!field.state.meta.isValid && (
                  <p className="text-red-500 text-xs mt-1">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </>
            )}
          </form.Field> */}
        </div>

        {/* Campo password */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-black">
            Contraseña
          </label>
          {/* <form.Field
            name="password"
            validators={{
              onChange: ({ value }) => {
                if (!value) return "La contraseña es obligatoria";
                return undefined;
              },
            }}
          >
            {(field) => (
              <>
                <input
                  id="password"
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent
                                        ${
                                          field.state.meta.errors?.length > 0
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        }`}
                  placeholder="••••••••"
                />
                {!field.state.meta.isValid && (
                  <p className="text-red-500 text-xs mt-1">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </>
            )}
          </form.Field> */}
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors duration-200 text-center disabled:bg-gray-400"
        >
          {"Iniciar sesión"}
        </button>

        <p className="text-sm text-center text-gray-500">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-green-600 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </form>
    </div>
  );
};
