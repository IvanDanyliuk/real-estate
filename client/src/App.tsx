import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { NAV_ROUTES, NavRoute } from './constants/navRoutesPaths';
// import { HomePage } from './pages';

const renderRoutes = (routes: NavRoute[]) => {
  return routes.map(route => (
    <Route key={crypto.randomUUID()} path={route.path || undefined} element={<route.element />}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {renderRoutes(NAV_ROUTES)}
      </Routes>
    </Suspense>
  );
};

export default App;
