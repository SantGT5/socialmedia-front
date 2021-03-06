import "../App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PrivateRoute from "../RouterComponents/auth/PrivateRouter";
import { AuthContextComponent } from "../contexts/authContext";
import "bootstrap/dist/css/bootstrap.min.css";

import Signup from "./Signup";
import Login from "./Login";
import PersonalInfo from "./PersonalInfo";
import EditUser from "./EditUser";
import Home from "./Home";
import NewPost from "./NewPost";
import Profile from "./Profile";
import DeletePost from "./GlobalComponents/DeletePost";
import UserProfile from "./UserProfile";
import Mensage from "./Mensage";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute path="/personal-info" component={PersonalInfo} />
          <PrivateRoute path="/edit/:id" component={EditUser} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute exact path="/newpost" component={NewPost} />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/mensage" component={Mensage} />
          <Route path="/userprofile/:profileName" component={UserProfile} />
          <PrivateRoute path="/deletepost/:id" component={DeletePost} />
        </Switch>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
