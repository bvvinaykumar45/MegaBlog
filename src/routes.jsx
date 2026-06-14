import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import App from "./App";
import { Home, LoginPage } from "./pages";
import { AuthLayout } from "./components/layout";

const routes = createRoutesFromElements(
  <Route path="/" Component={App}>
    <Route index Component={Home} />
    <Route
      path="/loging"
      element={
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      }
    />
  </Route>
);

const browserRouter = createBrowserRouter(routes);

export default browserRouter;
