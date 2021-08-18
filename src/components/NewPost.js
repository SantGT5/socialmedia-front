import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import userImg from "../img/Sem Título.png";
import TextField from "@material-ui/core/TextField";
import React from "react";
import Box from "@material-ui/core/Box";

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import UserTag from "./UserTag"


import GoogleLocation from "./GoogleLocation";
import NavBar from "./NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function NewPost() {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [img, setImg] = useState({ file: null });

  async function handleImage(event) {
    try {
      setImg({ file: URL.createObjectURL(event.target.files[0]) });
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div
        style={{ marginBottom: "1em" }}
        className="d-flex justify-content-center"
      >
        {/* <GlobalCard
    image={ img.file ? img.file : userImg }
    /> */}

        {img.file ? (
          <img className="imgNewPost" src={img.file} alt="Your preview image" />
        ) : (
          <img className="imgNull" src={userImg} alt="Preview image" />
        )}
      </div>

      <div className="d-flex justify-content-center">
        <div className="d-flex flex-column bd-highlight mb-3">
          <div className="p-2 bd-highlight">
            <div className={classes.root}>
              <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleImage}
              />
              <label htmlFor="contained-button-file">
                <Button style={{ borderRadius:"20px", height:"4em" }} variant="contained" color="primary" component="span">
                  <AddAPhotoIcon style={{ height:"1.3em", width:"auto" }} />
                </Button>
              </label>
            </div>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <form className={classes.root} noValidate autoComplete="off">
                <TextField
                style={{ width:"18.7em" }}
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </form>
            </Box>

            <div className="p-2 bd-highlight">
              <GoogleLocation value={value} setValue={setValue} />
            </div>

            <div className="p-2 bd-highlight">
              <UserTag />
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPost;
