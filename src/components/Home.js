import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import api from "../apis/api";
import NavBar from "./GlobalComponents/NavBar";
import FloatingBTN from "./GlobalComponents/FloatingBTN";
import { isJwtExpired } from "jwt-check-expiration";

import NewGlobalCard from "./GlobalComponents/NewGlocalCard";

function Home() {
  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');
  const [allpost, setAllPost] = useState([]);
  const history = useHistory();

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

  return (
    <div style={{ marginBottom: "4em" }}>
      <NavBar />
      <div className="d-flex justify-content-center">
        <span style={{ fontSize: "1.5em", marginTop: "0.2em", marginBottom:"2em" }}>
        <i class="far fa-compass"></i>Explore
        </span>
      </div>

      <div className="d-flex flex-column-reverse bd-highlight">
        {allpost.map((elem, i) => {
          for (let y = 0; y <= elem.like.length; y++) {
            // console.log("elem.like[y] test -> ", elem.like[0], elem.like[1], y, i, count)

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

export default Home;
