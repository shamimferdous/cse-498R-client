import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ConfigProvider } from "antd";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import Login from "./views/Login/Login.jsx";

// create browser router and components here
const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        element: <ProtectedRoute />,
        errorElement: <Navigate to="/login" replace />,
        children: [
            {
                path: "/",
                element: <>hello world</>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#00b96b",
                },
            }}
        >
            <RouterProvider router={router} />
        </ConfigProvider>
    </React.StrictMode>
);
