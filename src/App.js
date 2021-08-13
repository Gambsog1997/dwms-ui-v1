import "./App.css";
// import LoginForm from "./dashboardComponents/login.jsx";
import DashboardHome from "./dashboardComponents/home";
import { Switch, Route } from "react-router-dom";
import HomePage from "./customerComponents/homePage_";
import CustomerReg from "./dashboardComponents/Customer/customerReg";
import ProtectedRoute from "./services/protectedRoute";
import LandingPage from "./landingpage";

function App() {
  return (
    <div className="container">
      <Switch>
        <Route path="/" exact component={LandingPage}></Route>
        <ProtectedRoute path="/homedashboard" component={DashboardHome} />
        <ProtectedRoute path="/home" component={HomePage} />
        <Route path="/cust-registration" component={CustomerReg}></Route>
      </Switch>
    </div>
  );
}

export default App;
