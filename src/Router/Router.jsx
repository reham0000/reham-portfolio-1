import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout/MainLayout";
import Home from "../components/Home/Home";
import MoreProject from "../components/moreProject/MoreProject";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,

    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      
    ],
  },
  {
        path: "/viewMore",
        element: <MoreProject></MoreProject>,
      },
]);

export default router;
