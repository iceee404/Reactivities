import { createBrowserRouter, Navigate } from "react-router";
import App from "../layout/App";
import HomePage from "../features/home/HomePage";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import ActivityDetail from "../features/activities/details/ActivityDetailPage";
import ActivityForm from "../features/activities/form/ActivityForm";
import Counter from "../features/activities/counter/Counter";
import TestErrors from "../features/errors/TestErrors";
import NotFound from "../features/errors/NotFound";
import ServerError from "../features/errors/ServerError";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "activities",
        element: <ActivityDashboard />,
      },
      {
        path: "activities/:id",
        element: <ActivityDetail />,
      },
      {
        path: "manage/:id",
        element: <ActivityForm />,
      },
      {
        path: "createActivity",
        element: <ActivityForm key="create" />,
      },
      {
        path: "counter",
        element: <Counter />,
      },
      {
        path: "errors",
        element: <TestErrors />,
      },
      { path: "not-found", element: <NotFound /> },
      { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
