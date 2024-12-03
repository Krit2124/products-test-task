import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { setupStore } from "@/shared/store/index";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import { MainPage } from "@/pages/MainPage";
import { ProductsPage } from "@/pages/ProductsPage";
import { ProductInfo } from "@/pages/ProductInfo";
import { ProductCreate } from "@/pages/ProductCreate";
import { ProductEdit } from "@/pages/ProductEdit";

import "@/shared/styles/global.scss";

const store = setupStore();

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <MainPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: '/products/:id',
        element: <ProductInfo />,
      },
      {
        path: '/create-product',
        element: <ProductCreate />,
      },
      {
        path: '/edit-product/:id',
        element: <ProductEdit />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position='top-center' reverseOrder={false} />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
