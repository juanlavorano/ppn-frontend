import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "layout/Layout";
import Loading from "components/Loading";

export function createRoutes(routes) {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {routes.map((route) => {
          const Layout = route.layout;
          const Component = route.component;

          return (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              element={
                <Layout>
                  <Component />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  );
}

export const routes = [
  {
    path: "/",
    layout: Layout,
    component: lazy(() => import("pages/Home")),
    exact: true,
  },
  {
    path: "/collection",
    layout: Layout,
    component: lazy(() => import("pages/Collection")),
  },
];
