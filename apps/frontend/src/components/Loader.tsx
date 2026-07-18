export const Loader = () => {
    return (
        <div className="bg-black flex flex-col justify-center items-center h-screen text-center">
            <img
                src="/green-spinner.svg"
                className="mb-5"
                alt="Spinner verde"
            />
            <h2 className="text-green-500 font-shockwave text-4xl font-thin">
                Admira el poder de React y ToneJS
            </h2>
        </div>
    );
};
