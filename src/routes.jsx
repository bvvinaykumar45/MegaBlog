import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import App from "./App";
import { AddPostPage, Home, LoginPage, SignupPage } from "./pages";
import { AuthLayout } from "./components/layout";

const routes = createRoutesFromElements(
  <Route path="/" Component={App}>
    <Route index Component={Home} />
    <Route
      path="/login"
      element={
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      }
    />
    <Route
      path="/signup"
      element={
        <AuthLayout>
          <SignupPage />
        </AuthLayout>
      }
    />
    <Route
      path="/add-post"
      element={
        <AuthLayout>
          <AddPostPage />
        </AuthLayout>
      }
    />
  </Route>
);

const browserRouter = createBrowserRouter(routes);

export default browserRouter;
