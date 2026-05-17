import { Link, Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-black">
            <div className="flex flex-col gap-4 align-center justify-center items-center sm:py-10">
                <Link
                    to={'/'}
                    className="flex flex-col align-center justify-center items-center gap-4 sm:p-0 pt-4"
                >
                    <img
                        src="guitar.svg"
                        alt="Guitar"
                        className="sm:w-36 w-24"
                    />
                    <h1 className="sm:text-4xl text-3xl font-shockwave text-green-500">
                        Guitar App 2
                    </h1>
                </Link>

                <div className="shadow-lg font-roboto sm:rounded-xl sm:p-6 p-4 bg-white flex flex-col items-center justify-center sm:min-w-md min-w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
