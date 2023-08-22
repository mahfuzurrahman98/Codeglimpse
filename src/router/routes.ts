import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import LoginCallback from '../pages/auth-callbacks/LoginCallback';
import Me from '../pages/profile/Me';
import Create from '../pages/snippets/Create';
import Edit from '../pages/snippets/Edit';
import Library from '../pages/snippets/Library';
import Show from '../pages/snippets/Show';

import { RouteType } from '../types';

const routes: RouteType[] = [
  { path: '/', element: Home, _protected: -1 },
  { path: '/login', element: Login, _protected: 0 },
  { path: '/auth/google/login', element: LoginCallback, _protected: 0 },
  { path: '/register', element: Register, _protected: 0 },
  { path: '/me', element: Me, _protected: 1 },
  { path: '/p/library', element: Library, _protected: 1 },
  { path: '/p/new', element: Create, _protected: 1 },
  { path: '/p/:id', element: Show, _protected: -1 },
  { path: '/p/:id/edit', element: Edit, _protected: 1 },
];

export default routes;
