import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Pages
import Home from './pages/Home';
import Manage from './pages/Manage';
import ErrorPage from './pages/ErrorPage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: 'manage',
		element: <Manage />,
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
