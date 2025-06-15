import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import DashboardPage from '../pages/DashboardPage/DashboardPage';
import MachinesPage from '../pages/MachinesPage/MachinesPage';
import ProductsPage from '../pages/ProductsPage/ProductsPage';
import SequencePage from '../pages/SequencePage/SequencePage';
import MasterdataPage from '../pages/MasterdataPage/MasterdataPage';
import RawMaterialsPage from '../pages/MasterdataPage/RawMaterialsPage';

// Route configuration
const routes = [
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/machines',
    element: <MachinesPage />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/sequences',
    element: <SequencePage />,
  },
  {
    path: '/masterdata',
    element: <MasterdataPage />,
    children: [
      {
        path: 'raw-materials',
        element: <RawMaterialsPage />,
      },
    ],
  },
];

// Route component
const AppRoutes = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={route.element}
        >
          {route.children?.map((child) => (
            <Route
              key={child.path}
              path={child.path}
              element={child.element}
            />
          ))}
        </Route>
      ))}
    </Routes>
  );
};

export default AppRoutes; 