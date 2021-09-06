import NavBar from "./GlobalComponents/NavBar";
import NewGlobalCard from "./GlobalComponents/NewGlocalCard";
import api from "../apis/api";
import img from "../img/pngwing.com.png";
import FloatingBTN from "./GlobalComponents/FloatingBTN";
import { useState, useEffect } from "react";

function Profile(props) {
  const [status, setStatus] = useState([]);

  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get("/userpost");
        setStatus([...response.data]);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchProfile();
  }, []);

  return (
    <div style={{ marginBottom: "4em" }}>
      <NavBar />
      <div className="d-flex justify-content-center">
        <span
          style={{ fontSize: "1.5em", marginTop: "0.2em", marginBottom: "2em" }}
        >
          @MyProfile
        </span>
      </div>

      {status[0] ? (
        <div className="d-flex flex-column-reverse bd-highlight">
          {status.map((elem, i) => {
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
                    imgUser={elem.imgUser ? elem.imgUser : img}
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
      ) : (
        <div style={{ textAlign: "center", marginTop: "1.5em" }}>
          <i style={{ fontSize: "2.5em" }} className="fas fa-camera"></i>
          <h1>No post yet</h1>
        </div>
      )}

      <FloatingBTN />
    </div>
  );
}

export default Profile;
