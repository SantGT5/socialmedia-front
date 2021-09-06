import NavBar from "../components/GlobalComponents/NavBar";
import FloatingBTN from "../components/GlobalComponents/FloatingBTN";
import { Link } from "react-router-dom";

function Mensage() {
  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "4em",
        }}
      >
        <h1>
          Sorry, we still working on it <i class="fas fa-cog fa-spin"></i>
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          marginTop: "4em",
        }}
      >
        <h1>
          Click{" "}
          <Link style={{ textDecoration: "none" }} to="/">
            here
          </Link>{" "}
          to continue
        </h1>
      </div>
      <FloatingBTN />
    </div>
  );
}

export default Mensage;
