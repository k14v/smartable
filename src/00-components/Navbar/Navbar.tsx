import { routes } from "@utils/routes";
import { Link, useLocation } from "react-router-dom";
import Sun from "@assets/icons/Sun";
import Moon from "@assets/icons/Moon";

interface Props {
  toggleTheme: () => void;
  theme: string;
}

const Navbar = ({ toggleTheme, theme }: Props): JSX.Element => {
  const location = useLocation();
  return (
    <div className="w-full h-12 bg-darker flex items-center justify-between">
      <div>
        {routes.map((route) => (
          <Link
            key={route.name}
            className={`hover:text-mid-light text-light ml-9 ${
              route.path === location.pathname ? "underline" : ""
            }`}
            to={route.path}
          >
            {route.name}
          </Link>
        ))}
      </div>
      <button
        className="mr-5 bg-[#505050] w-[36px] h-[36px] flex justify-center items-center rounded-2xl"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <Sun strokeColor="#fff" />
        ) : (
          <Moon strokeColor="#fff" />
        )}
      </button>
    </div>
  );
};

export default Navbar;
