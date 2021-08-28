import NavBar from "./GlobalComponents/NavBar";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import api from "../apis/api";

import { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

function SearchUser() {
  const classes = useStyles();
  const [user, setUser] = useState({ userName: "" });
  const [found, setFound] = useState([]);
  console.log("found Search -> ", found);

  const handleChange = (event) => {
    setUser({ ...user, [event.currentTarget.name]: event.currentTarget.value });
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        console.log("user-> ", user);

        const response = await api.post("/search", { userName: user.userName });

        setFound([...response.data]);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchUser();
  }, [user.userName]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <NavBar />
        <div style={{ display: "flex", marginBottom: "2em" }}>
          <TextField
            style={{ marginTop: "2em", maxWidth: "100vw" }}
            value={user.userName}
            onChange={handleChange}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            name="userName"
            type="text"
          />
        </div>
      </div>
      <div>
        <div style={{ flexDirection: "column" }}>
          {user.userName === "" ? (
            <></>
          ) : (
            found.map((elem) => {
              return (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "0.5em",
                    marginLeft: "1em",
                  }}
                >
                  <Avatar
                    src={
                      elem.imgUserURL ? elem.imgUserURL : "/broken-image.jpg"
                    }
                  />
                  <div className="d-flex flex-column bd-highlight mb-3">
                    <span style={{ padding: "0px" }}>{elem.profileName}</span>

                    <span style={{ padding: "0px", fontSize: "13px" }}>
                      {elem.name}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchUser;
