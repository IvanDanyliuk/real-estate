import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Loader } from './components/layout/Loader/Loader';
import { useGetUserQuery } from './features/users/state/userApi';
import { setUser } from './features/users/state/userSlice';
import { useAppDispatch } from './hooks/useAppDispatch';
import { NAV_ROUTES, NavRoute } from './constants/navRoutesPaths';
import 'leaflet/dist/leaflet.css';


const renderRoutes = (routes: NavRoute[]) => {
  return routes.map((route, i) => (
    <Route 
      key={`${route.path}-${i}`} 
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
      <Toaster />
      <Routes>
        {renderRoutes(NAV_ROUTES)}
      </Routes>
    </Suspense>
  );
};

export default App;
