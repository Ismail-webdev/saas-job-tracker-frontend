import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClass = "block rounded px-3 py-2 hover:bg-gray-800";
  const navLinks = [
    {
      name: "Dashboard",
      href: "dashboard",
    },
    {
      name: "Applications",
      href: "applications",
    },
    {
      name: "Settings ",
      href: "settings",
    },
  ];
  return (
    <aside className="h-screen w-64 bg-gray-900 text-white">
      <div className="p-4 text-xl font-bold">Job Tracker</div>

      <nav className="space-y-2 px-4 flex flex-col">
        {navLinks.map((link) => (
          <NavLink
            to={link.href}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? "bg-gray-800" : ""}`
            }
            key={link.name}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
