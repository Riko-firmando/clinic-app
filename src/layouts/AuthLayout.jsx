import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="w-screen">
      <Outlet />
    </div>
  );
}
