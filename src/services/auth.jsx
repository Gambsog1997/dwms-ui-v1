import jwt_decode from "jwt-decode";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login = (res, status, history, values) => {
    const token = jwt_decode(status.data.accessToken);

    if (values.username === token.email && values.password === token.password) {
      this.authenticated = true;
      if (status.data.dataValues.role === "admin") {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...res.data, isAuthenticated: this.authenticated })
        );

        history.replace({
          pathname: "/homedashboard",
          // state: { credentials: JSON.stringify(status) },
        });
      }
      if (status.data.dataValues.role === "guest") {
        localStorage.setItem(
          "user",
          JSON.stringify({ ...res.data, isAuthenticated: this.authenticated })
        );

        history.replace({
          pathname: "/home",
          // state: { credentials: JSON.stringify(status) },
        });
      }
    }
  };
}

export default new Auth();
