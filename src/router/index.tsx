import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PersistLogin from '../components/PersistLogin';
import NotFound from '../pages/NotFound';
import ProtectedRoute from './ProtectedRoute';
import routes from './routes';

type RouteType = {
  path: string;
  element: () => JSX.Element;
  _protected: number; // {-1: public, 0: shouldBeLoggedOut, 1: shouldBeLoggedIn}
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PersistLogin key={-1} />}>
          {routes.map((route: RouteType, key: number) => {
            if (route._protected === -1) {
              // means thes route is public, it doesn't bother if the user is logged in or not
              return (
                <Route
                  key={key}
                  path={route.path}
                  element={<route.element />}
                />
              );
            } else {
              // means the route is protected, it will check if the user is logged in or not
              return (
                <Route
                  key={key}
                  element={<ProtectedRoute _protected={route._protected} />}
                >
                  <Route path={route.path} element={<route.element />} />
                </Route>
              );
            }
          })}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
