import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="h-screen bg-black">
      <div className="flex flex-col align-center justify-center items-center pt-5">
        <Link
          to={"/"}
          className="flex flex-col align-center justify-center items-center gap-4"
        >
          <img src="guitar.svg" alt="Guitar" className="w-36" />
          <h1 className="text-3xl font-shockwave text-white">Guitar App 2</h1>
        </Link>
        <Outlet />
      </div>
    </div>
  );
}
