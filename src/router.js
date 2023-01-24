import {
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    index: true,
  },
  {
    path: "register",
    element: <Register />,
    errorElement: <ErrorPage />
  },
  {
    path: "login",
    element: <Login />,
  }
]);