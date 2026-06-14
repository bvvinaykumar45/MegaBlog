import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function AuthLayout({ isProtected, children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    if (isProtected && !authStatus) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(false);
  }, [authStatus, isProtected, navigate]);
  return loading ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout;
