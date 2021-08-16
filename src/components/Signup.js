import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom"
import api from "../apis/api";


import { Alert, AlertTitle } from '@material-ui/lab';



function Signup(props) {
  const [state, setState] = useState({
    name: "",
    email: "",
    profileName: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const history = useParams()

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault(props);

    try {

      const response = await api.post("/signup", { ...state });

      history.push("/login");
    } catch (err) {
      console.log("eu sou err -> ", err.response.data.msg);
      setError(err.response.data.msg);
    }
  }

  return (
    
    <form onSubmit={handleSubmit}>
      <h1 className="container">Sign Up</h1>
      <Box>
        <div className="container">
          <div className="border">
            <TextField
            style={{ marginTop: "4%", width: "70%" }}
              onChange={handleChange}
              name="name"
              value={state.name}
              label="Name"
              variant="standard"
            />
            <TextField
            style={{ marginTop: "4%", width: "70%" }}
              onChange={handleChange}
              name="profileName"
              value={state.profileName}
              label="Profile Name"
              variant="standard"
            />
            <TextField
            style={{ marginTop: "4%", width: "70%" }}
              onChange={handleChange}
              name="email"
              value={state.email}
              label="E-mail"
              variant="standard"
            />
            <TextField
            style={{ marginTop: "4%", width: "70%" }}
              onChange={handleChange}
              name="password"
              value={state.password}
              label="Password"
              variant="standard"
            />
            <div style={{ marginTop:"10%" }}>
              <Button variant="outlined" type="submit">
                Next
              </Button>
            </div>
            <div style={{ marginTop:"8%" }}>
            <span>Have an account? <Link to="/login" className="links">Log in</Link></span>
            </div>
            
          </div>
        </div>
      </Box>
      <div className="alertMSG">
      { error ? <div><Alert  severity="warning"> <AlertTitle>Warning</AlertTitle> { error } — <strong>check it out!</strong> </Alert></div>  : <></> }
      </div>
      
    </form>
  );
}

export default Signup;