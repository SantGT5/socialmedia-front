import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddPhotoBTN from "../components/GlobalComponents/AddPhotoBTN";

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../apis/api";
import Avatar from "@material-ui/core/Avatar";

import { Alert, AlertTitle } from "@material-ui/lab";

function Signup(props) {
  const history = useHistory();
  const [img, setImg] = useState({ file: null, imgUser: null });
  const arrGender = ["Male", "Female", "Other"];
  const [error, setError] = useState(null);
  const [state, setState] = useState({
    name: "",
    email: "",
    profileName: "",
    password: "",
    gender: "",
  });

  async function handleImage(event) {
    if (event.target.files.length) {
      setImg({
        file: URL.createObjectURL(event.target.files[0]),
        imgUser: event.target.files[0],
      });
    }
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async function handleFileUpload(file) {
    if(file){

      const uploadData = new FormData();

      uploadData.append("imgUser", file);
  
      const response = await api.post("/uploaduser", uploadData);
  
      return response.data.url;
    }

    return ""
    
  }

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault(props);
    try {
      const imgUserURL = await handleFileUpload(img.imgUser);

      const response = await api.post("/signup", { ...state, imgUserURL });

      history.push("/login");
    } catch (err) {
      if (err.response) {
        console.log("eu sou err -> ", err.response.data.msg);
        setError(err.response.data.msg);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="container">Sign Up</h1>

      <Box>
        <div className="container">
          <div className="border">
            <div style={{ display: "flex", alignItems: "center" }}>
              <AddPhotoBTN onChange={handleImage} color="primary" />
              <Avatar
                style={{
                  marginTop: "0.7em",
                  marginRight: "3.4em",
                  width: "5em",
                  height: "5em",
                }}
                src={img.file ? img.file : "/broken-image.jpg"}
              />
            </div>

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

            <select
              className="container form-select"
              style={{ marginTop: "2em", width: "10em", backgroundColor:"#f9f7f7" }}
              aria-label="Default select example"
              value={state.gender}
              onChange={handleChange}
              name="gender"
            >
              <option  value="" defaultValue disabled hidden>
                Gender
              </option>
              {arrGender.map((text, i) => {
                return (
                  <option   key={i} value={text}>
                    {text}
                  </option>
                );
              })}
            </select>

            <div style={{ marginTop: "2em" }}>
              <Button variant="outlined" type="submit">
                Next
              </Button>
            </div>
            <div style={{ marginTop: "1.5em", marginBottom:"1.2em" }}>
              <span>
                Have an account?{" "}
                <Link to="/login" className="links">
                  Log in
                </Link>
              </span>
            </div>
          </div>
        </div>
      </Box>
      <div className="alertMSG">
        {error ? (
          <div>
            <Alert severity="warning">
              {" "}
              <AlertTitle>Warning</AlertTitle> {error} —{" "}
              <strong>check it out!</strong>{" "}
            </Alert>
          </div>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
}

export default Signup;
