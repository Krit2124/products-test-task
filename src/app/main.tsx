import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { setupStore } from "@/shared/store/index";
import { MainLayout } from "./layouts/MainLayout";
import { ErrorPage } from "@/pages/ErrorPage";
import "@/shared/styles/global.scss";
import { MainPage } from "@/pages/MainPage";
import { ProductsPage } from "@/pages/ProductsPage";

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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
