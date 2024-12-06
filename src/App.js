import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Login from './pages/Public/Login/Login';
import Register from './pages/Public/Register/Register';
import Main from './pages/Main/Main';
import Movie from './pages/Main/Movie/Movie';
import Lists from './pages/Main/Movie/Lists/Lists';
import Form from './pages/Main/Movie/Form/Form';
import Favorites from './pages/Main/Favorites/Favorites';
import Search from './pages/Main/Search/Search';
import Settings from './pages/Main/Settings/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: '/main/movies', // Home route, which is linked to the Movie page
        element: <Movie />,
        children: [
          {
            path: '/main/movies',
            element: <Lists />, // Movies list component
          },
          {
            path: '/main/movies/form/:movieId?', // Movie form for create or edit
            element: <Form />,
          },
        ],
      },
      {
        path: '/main/favorites', // Favorites page
        element: <Favorites />,
      },
      {
        path: '/main/search', // Search page
        element: <Search />,
      },
      {
        path: '/main/settings', // Settings page
        element: <Settings />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
