// import { useEffect, useState } from "react";
// import api from "../apis/api";
import NavBar from "./GlobalComponents/NavBar";
import FloatingBTN from "./GlobalComponents/FloatingBTN";

function Home() {
  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');

  return (
    <div>
      <NavBar />
      <div className="d-flex justify-content-center">
        <span style={{ fontSize: "1.5em", marginTop: "0.2em" }}>
          @{loggedInUser.user.profileName}
        </span>
      </div>
      <FloatingBTN />
    </div>
  );
}

export default Home;
