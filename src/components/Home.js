import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import api from "../apis/api";
import NavBar from "./GlobalComponents/NavBar";
import FloatingBTN from "./GlobalComponents/FloatingBTN";
import { isJwtExpired } from "jwt-check-expiration";

import NewGlobalCard from "./GlobalComponents/NewGlocalCard";
import SearchUser from "./SearchUser";
import { Link } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";

function Home() {
  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');
  const [allpost, setAllPost] = useState([]);
  const history = useHistory();

  const [user, setUser] = useState({ userName: "" });

  const [found, setFound] = useState([]);

  console.log(allpost);

  const handleChange = (event) => {
    setUser({ [event.currentTarget.name]: event.currentTarget.value });
  };

  useEffect(() => {
    async function fetchAllPost() {
      try {
        const response = await api.post("allpost");

        setAllPost([...response.data]);
      } catch (err) {
        console.log(err.respone);
        const expired = isJwtExpired(loggedInUser.token);
        if (expired === true) {
          window.localStorage.clear();
          history.push("/login");
        }
      }
    }
    fetchAllPost();
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.post("/search", { userName: user.userName });

        setFound([...response.data]);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchUser();
  }, [user.userName]);

  return (
    <div style={{ marginBottom: "4em" }}>
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <NavBar />
        <div style={{ width: "100%" }}>
          <SearchUser userName={user.userName} onChange={handleChange} />
        </div>
      </div>

      {user.userName === "" ? (
        <div>
          <div className="d-flex justify-content-center">
            <span
              style={{
                fontSize: "1.5em",
                marginTop: "1em",
                marginBottom: "1.5em",
              }}
            >
              <i className="far fa-compass"></i>Explore
            </span>
          </div>

          <div className="d-flex flex-column-reverse bd-highlight">
            {allpost.map((elem, i) => {
              for (let y = 0; y <= elem.like.length; y++) {
                let count = 0;
                let countLikes = 0;
                elem.like.forEach((item) => {
                  if (item === loggedInUser.user.profileName) {
                    count++;
                  }
                });

                elem.like.forEach((likes) => {
                  if (likes) {
                    countLikes++;
                  }
                });
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "1.5em",
                    }}
                  >
                    <NewGlobalCard
                      like={elem._id}
                      className="p-2 bd-highlight"
                      likeResult={count > 0 ? true : false}
                      loggedInUser={elem.userProfileName}
                      id={elem._id}
                      imgUser={elem.imgUser}
                      share={elem.postImgURL}
                      userProfileName={elem.userProfileName}
                      addLocation={elem.addLocation}
                      postImgURL={elem.postImgURL}
                      description={elem.description}
                      countLikes={countLikes}
                      tagUser={
                        elem.tagUser[0] ? (
                          <span className="font">
                            User tagged:
                            {elem.tagUser.map((tag) => (
                              <li>{tag}</li>
                            ))}
                          </span>
                        ) : (
                          <></>
                        )
                      }
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-center">
            <span
              style={{
                fontSize: "1.5em",
                marginTop: "1em",
                marginBottom: "1.5em",
              }}
            >
              <i className="fas fa-user-plus"></i> Search Profiles
            </span>
          </div>

          {found.map((elem) => {
            return (
              <Link
                to={`/userprofile/${elem.profileName}`}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  textDecoration: "none",
                  color: "black",
                }}
              >
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
                      elem.imgUserURL ? elem.imgUserURL : "/broken-image.jpg"
                    }
                    style={{ marginLeft: "6px" }}
                  />
                  <div
                    style={{ marginTop: "9px" }}
                    className="d-flex flex-column bd-highlight mb-3"
                  >
                    <span style={{ padding: "0px" }}>{elem.profileName}</span>

                    <span style={{ padding: "0px", fontSize: "13px" }}>
                      {elem.name}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <FloatingBTN />
    </div>
  );
}

export default Home;
