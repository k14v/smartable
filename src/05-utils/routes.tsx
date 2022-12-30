import ComponentsShowcase from "@pages/ComponentsShowcase";
import Landing from "@pages/Landing";


export const routes = [
  {
    path: "/",
    element: <Landing />,
    name: "Landing"
  },
  {
    path: "/components",
    element: <ComponentsShowcase />,
    name: 'Components'
  }
]