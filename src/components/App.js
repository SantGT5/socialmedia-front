import "../App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../RouterComponents/auth/PrivateRouter";
import { AuthContextComponent } from "../contexts/authContext";
import "bootstrap/dist/css/bootstrap.min.css";
// import { CartContextComponent } from "../contexts/cardContext";

import Signup from "./Signup";
import Login from "./Login";
import PersonalInfo from "./PersonalInfo";
import EditUser from "./EditUser";
import Home from "./Home";
import NewPost from "./NewPost";
import Profile from "./Profile";
import LikePost from "./GlobalComponents/LikePost";

function App() {
  return (
    <BrowserRouter>
    <Switch>
        <AuthContextComponent>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/personal-info" component={PersonalInfo} />
          <Route path="/edit/:id" component={EditUser} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/newpost" component={NewPost} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/likedpost/:id" component={LikePost} />
          <Redirect exact from="/login" to="/" />
        </AuthContextComponent>
      </Switch>      
    </BrowserRouter>
  );
}

export default App;
