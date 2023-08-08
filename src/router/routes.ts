import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Me from '../pages/profile/Me';
import Create from '../pages/snippets/Create';
import Edit from '../pages/snippets/Edit';
import Library from '../pages/snippets/Library';
import Show from '../pages/snippets/Show';

type RouteType = {
  path: string;
  element: () => JSX.Element;
  _protected: number;
};

const routes: RouteType[] = [
  { path: '/', element: Home, _protected: -1 },
  { path: '/login', element: Login, _protected: 0 },
  { path: '/register', element: Register, _protected: 0 },
  { path: '/me', element: Me, _protected: 1 },
  { path: '/library', element: Library, _protected: 1 },
  { path: '/snippets/create', element: Create, _protected: 1 },
  { path: '/snippets/:id', element: Show, _protected: 0 },
  { path: '/snippets/edit/:id', element: Edit, _protected: 1 },
];

export default routes;
