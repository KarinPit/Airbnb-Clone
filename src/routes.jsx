import React, { Fragment, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthGuard } from "./guards/AuthGuard"
import { MainLayout } from "./pages/layouts/MainLayout";
import { MinimizedFilterLayout } from "./pages/layouts/MinimizedFilterLayout";
import { StayIndex } from "./pages/StayIndex"
import { StayDetails } from "./pages/StayDetails";
import { OrderIndex } from "./pages/OrderIndex";
import { ProfileIndex } from "./pages/layouts/ProfileIndex";


const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        key: 'home',
        index: true,
        element: <StayIndex />,
        // path: "/home"
      }
    ],
    key: "main-layout",
  },
  {
    path: "/stay/:stayId",
    element: <MinimizedFilterLayout />,
    children: [
      {
        key: 'stay-details',
        index: true,
        element: <StayDetails />,
      }
    ],
    key: "minimized-layout",
  },
  {
    path: "/stay/:stayId/confirm-order",
    element: <MinimizedFilterLayout />,
    children: [
      {
        key: 'confirm-order',
        index: true,
        element: <OrderIndex />,
      }
    ],
    key: "order-index",
  },
  {
    path: "/profile/:userId/:userType",
    element: <ProfileIndex />,
    key: "user-profile",
  },
  { path: "*", element: <Navigate to="/" replace />, key: "404" },
];

export const createRouting = () => {
  return (
    <Suspense fallback={''}>
      <Routes>
        {routes.map((route) => {
          const Guard = route.guard || Fragment;
          const renderRoute = (currentRoute) => (
            <Route
              index={currentRoute.index}
              key={currentRoute.key}
              path={currentRoute.path}
              element={<Guard>{currentRoute.element}</Guard>}
            >
              {currentRoute.children &&
                currentRoute.children.map((childRoute) =>
                  renderRoute(childRoute)
                )}
            </Route>
          );

          return renderRoute(route);
        })}
      </Routes>
    </Suspense>
  );
};

