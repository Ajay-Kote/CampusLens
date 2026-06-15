import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  Contact, 
  FileSpreadsheet, 
  LogOut,
  GraduationCap,
  User,
  Key
} from "lucide-react";

const Sidebar = () => {
  const { logout, role } = useAuth();
  const location = useLocation();

  const adminMenuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Directory",
      path: "/directory",
      icon: Users,
    },
    {
      name: "ID Cards",
      path: "/idcard",
      icon: Contact,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FileSpreadsheet,
    },
  ];

  const studentMenuItems = [
    {
      name: "My Profile",
      path: "/my-profile",
      icon: User,
    },
    {
      name: "Change Password",
      path: "/change-password",
      icon: Key,
    },
  ];

  const menuItems = role === "student" ? studentMenuItems : adminMenuItems;

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
        <GraduationCap className="h-8 w-8 text-indigo-600" />
        <span className="text-xl font-bold tracking-tight text-gray-900">CampusLens</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Footer */}
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
