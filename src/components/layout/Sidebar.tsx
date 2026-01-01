import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkBaseClass =
    "block rounded px-3 py-2 transition-colors hover:bg-gray-800";

  const navLinks = [
    {
      name: "Dashboard",
      to: "/dashboard",
    },
    {
      name: "Applications",
      to: "/applications",
    },
    {
      name: "Settings",
      to: "/settings",
    },
  ];

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white">
      <div className="p-4 text-xl font-bold">Job Tracker</div>

      <nav className="flex flex-col space-y-2 px-4">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.to}
            className={({ isActive }) =>
              `${linkBaseClass} ${isActive ? "bg-gray-800" : ""}`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
