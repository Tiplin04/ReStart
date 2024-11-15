import { createBrowserRouter } from "react-router-dom";
import First from "../pages/First";
import Second from "../pages/Second";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
  },
  {
    path: "/second",
    element: <Second />,
  },
]);
