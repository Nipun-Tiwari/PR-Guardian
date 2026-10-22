import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout.js';
import { LandingPage } from './pages/LandingPage.js';
import { DemoDashboardPage } from './pages/DemoDashboardPage.js';
import { ReviewDetailPage } from './pages/ReviewDetailPage.js';
import { ErrorPage } from './pages/ErrorPage.js';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'demo', element: <DemoDashboardPage /> },
      { path: 'demo/reviews/:id', element: <ReviewDetailPage /> },
    ],
  },
]);
