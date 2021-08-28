import NavBar from "./GlobalComponents/NavBar";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import api from "../apis/api";

import { useEffect, useState } from "react";

function SearchUser() {
  const [ user, setUser ] = useState({userName: "",});
  const [ found, setFound ] = useState([]);
  console.log("found Search -> ", found);


const handleChange = (event) => {
    setUser({ ...user, [event.currentTarget.name]: event.currentTarget.value })
}


  useEffect(() => {
    async function fetchUser() {
      try {
        console.log("user-> ", user)
        const response = await api.post("/search", {userName: user.userName});

        setFound([ ...response.data ]);

      } catch (err) {
        console.log(err.response);
      }
    }
    fetchUser();
  }, [user.userName]);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          value={user.userName}
          onChange={handleChange}
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          name="userName"
          type="text"
        />
      </Box>

<div>

  { found.map(( elem ) =>{
    return <ul><li>{elem.profileName}</li></ul>
  }) }
</div>

    </div>
  );
}

export default SearchUser;
