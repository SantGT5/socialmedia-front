import { useEffect, useState } from "react";
import api from "../apis/api";
import NavBar from "./GlobalComponents/NavBar";
import FloatingBTN from "./GlobalComponents/FloatingBTN";
import GlobalCard from "../components/GlobalComponents/GlobalCard"

function Home() {
  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');

const [ allpost, setAllPost ] = useState([])

console.log("Home Post test -> ", allpost)

useEffect(() => {
  async function fetchAllPost(){
try{

const response = await api.post( "allpost" )

setAllPost([ ...response.data ])

}catch( err ){
  console.log( err.respone )
}
  }
  fetchAllPost()
}, [])


  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-center">
        <span style={{ fontSize: "1.5em", marginTop: "0.2em" }}>
          @{loggedInUser.user.profileName}
        </span>
      </div>

      <div className="allPost d-flex flex-column-reverse bd-highlight">
        {allpost.map((elem, i) => {
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
