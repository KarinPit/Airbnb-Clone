import React, { Fragment, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthGuard } from "./guards/AuthGuard"

import { Home } from './pages/Home'
import AppHeader from './cmps/Header/AppHeader'
import { FilterStayMobile } from './cmps/Header/FilterStay/FilterStayMobile'
import FilterContext from './context/FilterContext'


const routes = [
  {
    path: "/",
    element: <Home />,
    // guard: AuthGuard,
    // children: [
    //   {
    //     key: "stay-index",
    //     index: true,
    //     element: <StaysIndex />,
    //   },
    //   {
    //     key: "stay-id",
    //     path: "/stay/:stayId",
    //     element: <StayIndex />,
    //   },
    // ],
    key: "home",
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

