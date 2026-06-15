import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import App from "./App";
import {
  AddPostPage,
  EditPostPage,
  Home,
  LoginPage,
  SignupPage,
} from "./pages";
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
        <AuthLayout isProtected={true}>
          <AddPostPage />
        </AuthLayout>
      }
    />
    <Route
      path="/edit-post/:slug"
      element={
        <AuthLayout isProtected={true}>
          <EditPostPage />
        </AuthLayout>
      }
    />
  </Route>
);

const browserRouter = createBrowserRouter(routes);

export default browserRouter;
