import { Route, Redirect } from "react-router-dom";
import { useContext, FC } from "react";
import { authContext } from "./Authcontext";

const ProtectedRoute: FC<{ path: string }> = ({ children, ...others }) => {
  const { token } = useContext(authContext);

  return (
    <Route
      {...others}
      exact
      render={({ location }) => {
        return token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
