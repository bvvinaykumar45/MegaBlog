import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import App from "./App";
import { Home } from "./pages";

const routes = createRoutesFromElements(
  <Route path="/" Component={App}>
    <Route index Component={Home} />
  </Route>
);

const browserRouter = createBrowserRouter(routes);

export default browserRouter;
