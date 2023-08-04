import { ReactNode } from 'react';

type RouteType = {
  path: string;
  element: ReactNode;
  isPrivate: undefined | boolean;
};

const routes: RouteType[] = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login />, isPrivate: false },
  { path: '/register', element: <Register />, isPrivate: false },
  { path: '/snippets/create', element: <Create />, isPrivate: true },
];

export default routes;
