import { Outlet } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F6FAF9]">
      <SidebarMenu />

      {/* Content */}
      <main className="lg:ml-64">
        <div className="max-w-7xl mx-auto p-5">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
