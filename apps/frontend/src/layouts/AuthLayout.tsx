import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="h-screen bg-black">
      <div className="flex flex-col gap-8 align-center justify-center items-center pt-5">
        <Link
          to={"/"}
          className="flex flex-col align-center justify-center items-center gap-4"
        >
          <img src="guitar.svg" alt="Guitar" className="w-36" />
          <h1 className="text-4xl font-shockwave text-green-500">Guitar App 2</h1>
        </Link>

        <div className="shadow-lg font-roboto rounded-lg p-6  bg-white flex flex-col items-center justify-center min-w-md">
           <Outlet />
        </div>
      </div>
    </div>
  );
}
