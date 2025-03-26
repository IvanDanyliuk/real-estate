import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { NAV_ROUTES, NavRoute } from './constants/navRoutesPaths';
import { useAppDispatch } from './hooks/useAppDispatch';
import { useRefreshTokenQuery } from './features/auth/state/authApi';

const renderRoutes = (routes: NavRoute[]) => {
  return routes.map(route => (
    <Route 
      key={crypto.randomUUID()} 
      path={route.path || undefined} 
      element={<route.element />}
    >
      {route.children && renderRoutes(route.children)}
    </Route>
  ));
};

function App() {
  const dispatch = useAppDispatch();
  // const { data } = useRefreshTokenQuery(null);

  // useEffect(() => {
  //   console.log('APP', data)
  // }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {renderRoutes(NAV_ROUTES)}
      </Routes>
    </Suspense>
  );
};

export default App;
