import { BrowserRouter, Route, Routes } from "react-router";
import { ThemeProvider } from "@mui/material";
import { Layout } from "./components/layout";
import { routes } from "./router/routes";
import { RouteParams } from "./router/types";
import theme from "./config/theme";
import "./App.css"

const renderRoutes = (routes: RouteParams[]) => {
  return routes.map(({ path, component: Component, children }) =>(
    <Route path={path} element={<Component />}>
      {children && renderRoutes(children)}
    </Route>
  ));
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            {renderRoutes(routes)}
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
