import NavBar from "./NavBar";
import GlobalCard from "./GlobalCard";
import api from "../apis/api";

import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import { useState, useEffect } from "react";
import { useHistory } from "react-router";


const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

function Profile() {
const classes = useStyles();
const history = useHistory()
  const [status, setStatus] = useState([]);




  const handleClick = () => {
    history.push("/newpost")
  }

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get("/allpost");
        console.log("response -> ", response);
        setStatus([ ...response.data ]);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchProfile();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="allPost d-flex flex-column-reverse bd-highlight">
        {status.map((elem, i) => {
          return (
            <div key={i}  style={{ width:"100vw", maxWidth:"33em", marginBottom:"1em" }} className="p-2 bd-highlight">
              <GlobalCard
                // title={elem.profileName}
                addLocation={elem.addLocation}
                postImgURL={elem.postImgURL}
                description={elem.description}
                tagUser={elem.tagUser}
              />
            </div>
          );
        })}
      </div>
      <div id="IconHome" className={classes.root}>
        <Fab onClick={handleClick} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
}

export default Profile;
