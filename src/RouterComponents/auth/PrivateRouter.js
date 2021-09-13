import { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { isJwtExpired } from "jwt-check-expiration";

function ProtectedRoute(props) {
  const [state, setState] = useState("loggedin");
  const { loggedInUser } = useContext(authContext);

  // const storedUser = localStorage.getItem("loggedInUser");
  // const loggedInUser = JSON.parse(storedUser || '""');

  useEffect(() => {
    (async function () {
      try {
        const isValidToken = isJwtExpired(loggedInUser.token);

        setState(isValidToken === false ? "loggedin" : "redirect");
      } catch {}
    })();
  }, []);

  const propsClone = { ...props };
  const { component } = propsClone;
  const Component = component;
  delete propsClone.component;

  return (
    <Route
      {...propsClone}
      render={(routeProps) =>
        state === "loggedin" ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default ProtectedRoute;
