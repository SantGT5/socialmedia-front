import NavBar from "./GlobalComponents/NavBar";
import FloatingBTN from "../components/GlobalComponents/FloatingBTN"
import TextField from "@material-ui/core/TextField";
import api from "../apis/api";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";

function SearchUser() {
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
      <div>
        <NavBar />
      </div>
      <div style={{ marginLeft: "2em", marginRight: "2em" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1em",
          }}
        >
          <TextField
            style={{ marginTop: "2em", width: "100vw", maxWidth: "90vw" }}
            value={user.userName}
            onChange={handleChange}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            name="userName"
            type="text"
          />
        </div>
        <div>
          <div style={{ flexDirection: "column" }}>
            {user.userName === "" ? (
              <></>
            ) : (
              found.map((elem) => {
                return (
                  <Link to={ `/userprofile/${elem.profileName}` } style={{ display: "flex", justifyContent: "center", textDecoration:"none", color:"black" }}>
                    <div
                      className="borderSearch"
                      style={{
                        width: "20em",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "0.5em",
                      }}
                    >
                      <Avatar
                        src={
                          elem.imgUserURL
                            ? elem.imgUserURL
                            : "/broken-image.jpg"
                        }
                        style={{ marginLeft:"6px" }}
                      />
                      <div
                        style={{ marginTop: "9px" }}
                        className="d-flex flex-column bd-highlight mb-3"
                      >
                        <span style={{ padding: "0px" }}>
                          {elem.profileName}
                        </span>

                        <span style={{ padding: "0px", fontSize: "13px" }}>
                          {elem.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
      <FloatingBTN />
    </div>
  );
}

export default SearchUser;
