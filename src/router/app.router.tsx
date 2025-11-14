import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { AuthenticatedRoutes, NotAuthenticatedRoutes } from './ProtectedRoutes'
import { LayoutPublicDefault, LayoutPrivateDefault } from '@/layouts'
import { 
  LoginPage, 
  HomePage, 
  // Users
  UsersPage, 
  UsersListPage, 
  UsersFormPage,
  // Roles
  RolesPage,
  RolesListPage,
  RolesFormPage,
  // Examples
  ExamplesPage,
  ExamplesListPage,
  ExamplesFormPage
} from '@/pages'

const router = createBrowserRouter([
  {
    element: (
      <NotAuthenticatedRoutes>
        <LayoutPublicDefault />
      </NotAuthenticatedRoutes>
    ),
    children: [
      {
        path: '/login',
        element: <LoginPage />,
        handle: { breadcrumb: 'Login' }
      },
    ],
  },
  {
    element: (
      <AuthenticatedRoutes>
        <LayoutPrivateDefault />
      </AuthenticatedRoutes>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
        handle: { breadcrumb: 'Dashboard' }
      },
      {
        path: '/users',
        element: <UsersPage />,
        handle: { breadcrumb: 'Usuarios' },
        children: [
          {
            path: '',
            element: <UsersListPage />,
            handle: { breadcrumb: 'Lista de usuarios' }
          },
          {
            path: 'new',
            element: <UsersFormPage />,
            handle: { breadcrumb: 'Nuevo usuario' }
          },
          {
            path: 'edit/:id',
            element: <UsersFormPage />,
            handle: { breadcrumb: 'Editar usuario' }
          },
        ]
      },
      {
        path: '/roles',
        element: <RolesPage />,
        handle: { breadcrumb: 'Roles' },
        children: [
          {
            path: '',
            element: <RolesListPage />,
            handle: { breadcrumb: 'Lista de roles' }
          },
          {
            path: 'new',
            element: <RolesFormPage />,
            handle: { breadcrumb: 'Nuevo rol' }
          },
          {
            path: 'edit/:id',
            element: <RolesFormPage />,
            handle: { breadcrumb: 'Editar rol' }
          },
        ]
      },
      {
        path: '/examples',
        element: <ExamplesPage />,
        handle: { breadcrumb: 'Examples' },
        children: [
          {
            path: '',
            element: <ExamplesListPage />,
            handle: { breadcrumb: 'Lista de examples' }
          },
          {
            path: 'new',
            element: <ExamplesFormPage />,
            handle: { breadcrumb: 'Nuevo example' }
          },
          {
            path: 'edit/:id',
            element: <ExamplesFormPage />,
            handle: { breadcrumb: 'Editar example' }
          },
        ]
      },
    ],
  },
  { path: '*', element: <Navigate to='/' /> },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
