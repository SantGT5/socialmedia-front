import NavBar from "../components/GlobalComponents/NavBar";
import api from "../apis/api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import FloatingBTN from "../components/GlobalComponents/FloatingBTN";
import imgUser from "../img/pngwing.com.png";
import NewGlobalCard from "./GlobalComponents/NewGlocalCard";

function UserProfile() {
  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');
  const { profileName } = useParams();
  const [userprofile, setUserProfile] = useState([]);

  useEffect(() => {
    async function fetchProfileUser() {
      try {
        const response = await api.post(`/userprofile/${profileName}`);

        setUserProfile([...response.data]);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchProfileUser();
  }, []);

  return (
    <div style={{ marginBottom: "4em" }}>
      <NavBar />
      <div className="d-flex justify-content-center">
        <span
          style={{ fontSize: "1.5em", marginTop: "0.2em", marginBottom: "2em" }}
        >
          {"@" + profileName}
        </span>
      </div>

      {userprofile[0] ? (
        <div className="d-flex flex-column-reverse bd-highlight">
          {userprofile.map((elem, i) => {
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
                    imgUser={elem.imgUser ? elem.imgUser : imgUser}
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

export default UserProfile;
