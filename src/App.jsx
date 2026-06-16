import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";

import { Header, Footer } from "./components/layout";
import authService from "./appwrite/auth";
import { login, logout } from "./features/auth/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return !loading ? (
    <div className="w-full min-h-screen bg-gray-400 flex flex-col">
      <Header />
      <main className="flex flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null;
}

export default App;
