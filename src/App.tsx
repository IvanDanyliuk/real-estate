import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css"
import { Layout } from "./components/layout";
import { routes } from "./router/routes";
import { RouteParams } from "./router/types";

const renderRoutes = (routes: RouteParams[]) => {
  return routes.map(({ path, component: Component, children }) =>(
    <Route path={path} element={<Component />}>
      {children && renderRoutes(children)}
    </Route>
  ));
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {renderRoutes(routes)}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
