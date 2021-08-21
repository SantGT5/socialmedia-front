// import { useEffect, useState } from "react";
// import api from "../apis/api";
import NavBar from "./NavBar";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Home() {
  const classes = useStyles();
  const history = useHistory();

  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');

  async function handleClick() {
    try {

      history.push("/newpost");

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div >
      <NavBar />
      <div className="d-flex justify-content-center">
        <span style={{ fontSize: "1.5em", marginTop: "0.2em" }}>
          @{loggedInUser.user.profileName}
        </span>
      </div>
      <div id="IconHome" className={classes.root}>
        <Fab onClick={handleClick} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}

export default Home;
