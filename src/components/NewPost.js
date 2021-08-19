import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import userImg from "../img/Sem Título.png";
import TextField from "@material-ui/core/TextField";
import React from "react";
import Box from "@material-ui/core/Box";
import PublishIcon from "@material-ui/icons/Publish";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import UserTag from "./UserTag";
import api from "../apis/api";

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
  const [des, setDes] = useState({ description: "" });
  const [value, setValue] = React.useState({ addLocation: "" });
  const [img, setImg] = useState({ file: null, postImg: null });
  const [listTag, setListTag] = useState({});

  async function handleImage(event) {
    if (event.target.files.length) {
      setImg({
        file: URL.createObjectURL(event.target.files[0]),
        postImg: event.target.files[0],
      });
    }
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async function handleFileUpload(file) {
    const uploadData = new FormData();

    uploadData.append("postImg", file);

    const response = await api.post("/upload", uploadData);

    return response.data.url;
  }

  const handleChange = (event, values) => {
    setListTag([values]);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      let newArr = [];

      for (let list of listTag) {
        for (let result of list) {
          newArr.push(result.tagUser);
        }
      }

      const postImgURL = await handleFileUpload(img.postImg);

      console.log("img.postImg -> ", img.postImg)

      const response = await api.post(`/newpost`, {
        ...des,
        addLocation: value.description,
        tagUser: newArr,
        postImgURL,
      });
    } catch (err) {
      console.log(err.response);
    }
  }

  const handleChangeDes = (event) => {
    setDes({ [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <NavBar />
      </div>

      <div
        style={{ marginBottom: "0.6em" }}
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
                <Button
                  style={{ borderRadius: "20px", height: "4em", marginBottom:"2em" }}
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  <AddAPhotoIcon style={{ height: "1.3em", width: "11.2em" }} />
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
                  style={{ width: "18.7em", marginBottom:"1em" }}
                  id="outlined-multiline-static"
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  onChange={handleChangeDes}
                  name="description"
                  value={des.description}
                />
              </form>
            </Box>

            <div className="p-2 bd-highlight" style={{ marginBottom:"1em" }}>
              <GoogleLocation value={value} setValue={setValue} />
            </div>

            <div className="p-2 bd-highlight" style={{ marginBottom:"1em" }}>
              <UserTag onChange={handleChange} />
            </div>

            <Button
              className="p-2 bd-highlight"
              variant="contained"
              endIcon={<PublishIcon />}
              type="submit"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default NewPost;
