import "../App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../RouterComponents/auth/PrivateRouter";
import { AuthContextComponent } from "../contexts/authContext";
// import { CartContextComponent } from "../contexts/cardContext";

import NavBar from "./NavBar";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthContextComponent>

            <PrivateRoute exact path="/" component={NavBar} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Redirect exact from="/login" to="/" />

        </AuthContextComponent>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
