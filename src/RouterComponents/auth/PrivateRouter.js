import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { authContext } from "../../contexts/authContext";

function ProtectedRoute(props) {
  const { loggedInUser } = useContext(authContext);

  const propsClone = { ...props };
  const { component } = propsClone;
  const Component = component;
  delete propsClone.component;

  return (
    <Route
      {...propsClone}
      render={(routeProps) => {
        console.log("loggedInUser PrivateRouter -> ", loggedInUser);

        if (loggedInUser.user._id) {
          return <Component {...routeProps} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
