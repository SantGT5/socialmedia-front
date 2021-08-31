import NavBar from "./GlobalComponents/NavBar";
import GlobalCard from "./GlobalComponents/GlobalCard";
import NewGlobalCard from "./GlobalComponents/NewGlocalCard";
import api from "../apis/api";

import FloatingBTN from "./GlobalComponents/FloatingBTN";
import { useState, useEffect } from "react";

function Profile(props) {
  const [status, setStatus] = useState([]);

  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');

  console.log("loggedInUser -> ", loggedInUser);

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
    <div style={{ marginBottom:"4em" }}>
      <NavBar />
      <div className="d-flex justify-content-center">
        <span style={{ fontSize: "1.5em", marginTop: "0.2em", marginBottom:"2em" }}>
          @{loggedInUser.user.profileName}
        </span>
      </div>
      <div className="d-flex flex-column-reverse bd-highlight">
        {status.map((elem, i) => {
          for (let y = 0; y <= elem.like.length; y++) {
            // console.log("elem.like[y] test -> ", elem.like[0], elem.like[1], y, i, count)

            return (
              <div
                key={i}
                style={{
                  display:"flex",
                  justifyContent:"center",
                  marginBottom: "1.5em",
                }}
                
              >
                <NewGlobalCard
                  like={elem._id}
                  className="p-2 bd-highlight"
                  likeResult={
                    elem.like[y] === loggedInUser.user.profileName
                      ? true
                      : false
                  }
                  loggedInUser={elem.userProfileName}
                  id={elem._id}
                  imgUser={elem.imgUser}
                  share={elem.postImgURL}
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
      <FloatingBTN />
    </div>
  );
}

export default Profile;
