import { ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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

let _i = routes.length;
const getIndex = (index: number, isProtected: boolean) => {
  let x = index;
  x = _i++;
  if (isProtected) {
    console.log('protected:', x);
  } else {
    console.log('no:', x);
  }
  return x;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes key={Math.random()}>
        {routes.map((route: RouteType, index: number) => {
          if (route._protected == -1) {
            return (
              <Route
                key={route.path}
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
                    key={getIndex(index, false)}
                  />
                }
              >
                <Route
                  path={route.path}
                  element={route.element}
                  key={route.path}
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
