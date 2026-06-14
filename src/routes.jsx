import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router";

import App from "./App";

const routes = createRoutesFromElements(
  <Route path="/" Component={App}></Route>
);

const browserRouter = createBrowserRouter(routes);

export default browserRouter;
