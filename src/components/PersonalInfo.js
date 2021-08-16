import NavBar from "./NavBar";
import api from "../apis/api";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import WcIcon from "@material-ui/icons/Wc";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";

import { useHistory } from "react-router";

import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function PersonalInfo() {
  const classes = useStyles();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    profileName: "",
    gender: "",
  });

console.log("profile", profile)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get("/profile");

        setProfile({ ...response.data });
      } catch (err) {
        console.log(err);
      }
    }
    fetchProfile();
  }, []);

  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');
  const id = loggedInUser.user._id;
  const history = useHistory();

  async function handleClick() {
    try {
      history.push(`/edit/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <NavBar />
      <div className="container">
        <Avatar
          style={{ width: "4em", height: "4em" }}
          src="/broken-image.jpg"
        />

        <div className={classes.margin}>
          <Grid
            style={{ marginTop: "1em" }}
            container
            spacing={1}
            alignItems="flex-end"
          >
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField
                label="Name"
                value={profile.name}
              />
            </Grid>
          </Grid>

          <Grid
            style={{ marginTop: "1em" }}
            container
            spacing={1}
            alignItems="flex-end"
          >
            <Grid item>
              <AccountCircle />
            </Grid>
            <Grid item>
              <TextField
                label="Username"
                value={profile.profileName}
              />
            </Grid>
          </Grid>

          <Grid
            style={{ marginTop: "1em" }}
            container
            spacing={1}
            alignItems="flex-end"
          >
            <Grid item>
              <EmailIcon />
            </Grid>
            <Grid item>
              <TextField
                label="E-mail"
                value={profile.email}
              />
            </Grid>
          </Grid>

          <Grid
            style={{ marginTop: "1em" }}
            container
            spacing={1}
            alignItems="flex-end"
          >
            <Grid item>
              <WcIcon />
            </Grid>
            <Grid item>
              <TextField
                id="input-with-icon-grid"
                label="Gender"
                value={profile.gender}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2em" }}
      >
        <Button
          onClick={handleClick}
          variant="contained"
          endIcon={<EditIcon />}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}

export default PersonalInfo;
