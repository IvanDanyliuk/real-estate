import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { Loader } from './components/layout/Loader/Loader';
import { useGetUserQuery } from './features/users/state/userApi';
import { setUser } from './features/users/state/userSlice';
import { useAppDispatch } from './hooks/useAppDispatch';
import { NAV_ROUTES, NavRoute } from './constants/navRoutesPaths';

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
  const { data } = useGetUserQuery(null);

  useEffect(() => {
    if(data) {
      dispatch(setUser(data));
    }
  }, [dispatch, data]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {renderRoutes(NAV_ROUTES)}
      </Routes>
    </Suspense>
  );
};

export default App;
