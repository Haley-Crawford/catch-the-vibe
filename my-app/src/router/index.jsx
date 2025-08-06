import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

import AuthRedirect from '../features/AuthRedirect'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import CreateEvent from '../pages/CreateEvent'
import EditEvent from '../pages/EditEvent'
import RSVP from '../pages/RSVP'
import NotFound from '../pages/NotFound'
import MyEvents from '../pages/MyEvents'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthRedirect />, // 👈 this handles redirecting to login or dashboard
  },
  {
    path: '/',
    element: <App />, // App is the layout here
    children: [
      { path: 'dashboard', index: true, element: <Dashboard /> },
      { path: 'my-events', element: <MyEvents /> },
      { path: 'events/new', element: <CreateEvent /> },
      { path: 'events/:id/edit', element: <EditEvent /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/rsvp/:id',
    element: <RSVP />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])