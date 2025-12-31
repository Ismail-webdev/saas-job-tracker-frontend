import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
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
          <Link
            to={link.href}
            className="cursor-pointer rounded px-3 py-2 hover:bg-gray-800"
            key={link.name}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
