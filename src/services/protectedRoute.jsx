import { Route, Redirect, useRouteMatch } from "react-router-dom";
import { message, Spin } from "antd";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const route = useRouteMatch();
  // console.log(JSON.parse(localStorage.getItem("user")).isAuthenticated);

  const authenticate = () => {
    let authenticated = false;
    authenticated = JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user")).isAuthenticated
      : false;
    return authenticated;
  };

  const spin = (spin) => {
    return <Spin spinning={spin} />;
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        const authenticated = authenticate();

        if (authenticated===false) {
          spin(authenticated);
        }

        if (authenticated) {
          if (route.pathname === "/") {
            message.success(`Welcome`);
          }

          return <Component {...props} />;
        } else {
          message.error("Not logged in");
          return (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
