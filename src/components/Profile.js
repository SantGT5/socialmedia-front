import NavBar from "./GlobalComponents/NavBar";
import GlobalCard from "./GlobalComponents/GlobalCard";
import api from "../apis/api";

import FloatingBTN from "./GlobalComponents/FloatingBTN"
import { useState, useEffect } from "react";


function Profile(props) {
  const [status, setStatus] = useState([]);

  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');

  console.log("loggedInUser -> ", loggedInUser)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await api.get("/userpost");
        setStatus([ ...response.data ]);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchProfile();
  }, []);

  console.log(status)
  

// async function handleSubmit(event){
//   event.preventDefault(props);
// try{
//   console.log("dentro do Submit -> ", params )
//   // const response = api.post( `/likedpost/${  }` )

// }catch( err ){
//   console.log( err )
//   }
// }


  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-center">
        <span style={{ fontSize: "1.5em", marginTop: "0.2em" }}>
          @{loggedInUser.user.profileName}
        </span>
      </div>
      <div className="allPost d-flex flex-column-reverse bd-highlight">
        {status.map((elem, i) => {
          return (
            <div key={i}  style={{ width:"100vw", maxWidth:"33em", marginBottom:"1em" }} className="p-2 bd-highlight">
              <GlobalCard
                like={elem._id}
                userProfileName={elem.userProfileName}
                addLocation={elem.addLocation}
                postImgURL={elem.postImgURL}
                description={elem.description}
                tagUser={elem.tagUser}
              />
            </div>
          );
        })}
      </div>
      <FloatingBTN />
    </div>
  );
}

export default Profile;
