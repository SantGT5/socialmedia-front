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

        if (loggedInUser.user._id || loggedInUser._id){
          return <Component {...routeProps} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: routeProps.location },
              }}
            />
          );
        }
      }}
    />
  );
}

export default ProtectedRoute;
