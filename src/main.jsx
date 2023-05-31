import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import "./index.css";
import Login from "./views/Login/Login.jsx";
import Products from "./views/Products/Products.jsx";
import CreateProduct from "./views/CreateProduct/CreateProduct.jsx";
import EditProduct from "./views/EditProduct/EditProduct.jsx";
import CreateBatch from "./views/CreateBatch/CreateBatch.jsx";
import Batches from "./views/Batches/Batches.jsx";

// create browser router and components here
const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        element: <ProtectedRoute />,
        errorElement: <Navigate to="/" replace />,
        children: [
            {
                path: "/",
                element: <Products />,
            },
            {
                path: "/create-product",
                element: <CreateProduct />,
            },
            {
                path: "/edit-product/:id",
                element: <EditProduct />,
            },
            {
                path: "/create-batch/:id",
                element: <CreateBatch />,
            },
            {
                path: "/batches/",
                element: <Batches />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#00b96b",
                    },
                }}
            >
                <RouterProvider router={router} />
            </ConfigProvider>
        </AuthProvider>
    </React.StrictMode>
);
