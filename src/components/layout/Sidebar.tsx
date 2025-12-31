import React from "react";

const Sidebar = () => {
  const navLinks = ["Dashboard", "Applications", "Settings"];
  return (
    <aside className="h-screen w-64 bg-gray-900 text-white">
      <div className="p-4 text-xl font-bold">Job Tracker</div>

      <nav className="space-y-2 px-4">
        {navLinks.map((link) => (
          <div
            className="cursor-pointer rounded px-3 py-2 hover:bg-gray-800"
            key={link}
          >
            {link}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
