import NavBar from "../components/GlobalComponents/NavBar";
import api from "../apis/api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

import GlobalCard from "../components/GlobalComponents/GlobalCard";

function UserProfile() {
  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');
  const { profileName } = useParams();
  const [userprofile, setUserProfile] = useState([]);

  console.log("userprofile -> ", userprofile);

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
    <div style={{ marginBottom:"4em" }}>
      <NavBar />
      <div className="d-flex justify-content-center">
        <span style={{ fontSize: "1.5em", marginTop: "0.2em" }}>
          {userprofile[0] ? "@" + userprofile[0].userProfileName : null}
        </span>
      </div>
      <div className="allPost d-flex flex-column-reverse bd-highlight">
        {userprofile.map((elem, i) => {
          for (let y = 0; y <= elem.like.length; y++) {
            // console.log("elem.like[y] test -> ", elem.like[0], elem.like[1], y, i, count)

            return (
              <div
                key={i}
                style={{
                  width: "100vw",
                  maxWidth: "33em",
                  marginBottom: "1em",
                }}
                className="p-2 bd-highlight"
              >
                <GlobalCard
                  like={elem._id}
                  likeResult={
                    elem.like[y] === loggedInUser.user.profileName
                      ? true
                      : false
                  }
                  loggedInUser={elem.userProfileName}
                  id={elem._id}
                  share={elem.postImgURL}
                  imgUser={elem.imgUser}
                  userProfileName={elem.userProfileName}
                  addLocation={elem.addLocation}
                  postImgURL={elem.postImgURL}
                  description={elem.description}
                  tagUser={
                    <span>{elem.tagUser ? elem.tagUser + "" : null}</span>
                  }
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default UserProfile;
