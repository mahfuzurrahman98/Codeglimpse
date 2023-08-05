import { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { v4 } from 'uuid';

import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import Create from '../pages/snippets/Create';
import Edit from '../pages/snippets/Edit';
import Library from '../pages/snippets/Library';
import Show from '../pages/snippets/Show';
import ProtectedRoute from './ProtectedRoute';

type RouteType = {
  path: string;
  element: ReactNode;
  _protected: number;
};

const routes: RouteType[] = [
  { path: '/', element: <Home />, _protected: -1 },
  { path: '/login', element: <Login />, _protected: 0 },
  { path: '/register', element: <Register />, _protected: 0 },
  { path: '/library', element: <Library />, _protected: 1 },
  { path: '/snippets/create', element: <Create />, _protected: 1 },
  { path: '/snippets/edit/:id', element: <Edit />, _protected: 1 },
  { path: '/snippets/:id', element: <Show />, _protected: 0 },
];

const getIndex = () => {
  let x = v4();
  // console.log(x);
  return x;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes key={Math.random()}>
        {routes.map((route: RouteType) => {
          if (route._protected == -1) {
            return (
              <Route
                key={getIndex()}
                path={route.path}
                element={route.element}
              />
            );
          } else {
            return (
              <Route
                element={
                  <ProtectedRoute
                    _protected={route._protected}
                    key={getIndex()}
                  />
                }
              >
                <Route
                  path={route.path}
                  element={route.element}
                  key={getIndex()}
                />
              </Route>
            );
          }
        })}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
