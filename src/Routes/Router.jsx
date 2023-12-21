import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../pages/UserProfile";
import Dashboard from "../pages/Dashboard";
import AllTasks from "../components/AllTasks";
import AddTasks from "../components/AddTasks";
import ToDo from "../components/ToDo";
import EditTask from "../components/EditTask";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    // errorElement: < />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/userprofile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "allTasks",
        element: (
          <PrivateRoute>
            <AllTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "addTasks",
        element: (
          <PrivateRoute>
            <AddTasks />
          </PrivateRoute>
        ),
      },
      {
        path: "toDo",
        element: (
          <PrivateRoute>
            <ToDo />
          </PrivateRoute>
        ),
      },
      {
        path: "edit-task/:taskId",
        element: <EditTask />,
        loader: ({ params }) => fetch(`http://localhost:5000/tasks/${params.taskId}`),
      },
    ],
  },
]);
