import { routes } from "@utils/routes";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Navbar from "@components/Navbar";
import NotFound from "@pages/NotFound";
import { useState } from "react";
import { ToastContentProvider } from "@contexts/toastContext";

const App = (): JSX.Element => {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className={`h-full ${theme === "dark" ? "dark" : ""}`}>
      <div className="h-full bg-light dark:bg-dark">
        <ToastContentProvider>
          <BrowserRouter>
            <Navbar toggleTheme={toggleTheme} theme={theme} />
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.name}
                  path={route.path}
                  element={route.element}
                />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ToastContentProvider>
      </div>
    </div>
  );
};

export default App;
