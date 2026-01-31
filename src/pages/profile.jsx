import { User, LogOut } from "lucide-react";
import { useAuth } from "../app/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/useUserStore";

const Profile = () => {
  const { logout } = useAuth();
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className=" max-w-xl">
      <h2 className="text-2xl font-bold mb-3">Profile</h2>

      <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-[#EEFBF8] rounded-full flex items-center justify-center">
            <User className="w-7 h-7 text-[#1D9D86]" />
          </div>
          <div>
            <p className="text-lg font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Role</p>
            <p className="font-medium text-gray-900 capitalize">{user.role}</p>
          </div>

          <div>
            <p className="text-gray-500">User ID</p>
            <p className="font-medium text-gray-900">{user.id}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
