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
  const [value, setValue] = React.useState({addLocation: ""});
  const [img, setImg] = useState({ file: null, img: null });
  const [listTag, setListTag] = useState({});

  console.log("des -> ", des);
  console.log("value -> ", value);
  console.log("img -> ", img);
  console.log("listTag -> ", listTag);

  async function handleImage(event) {
    try {
      setImg({
        file: URL.createObjectURL(event.target.files[0]),
        img: event.target.value,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (event, values) => {
    setListTag([values]);
  };










  async function handleSubmit(event) {
    event.preventDefault()

    try {
      let newArr = []

      for(let list of listTag){
        for(let result of list){
        newArr.push( result.tagUser )
      
      }}

            console.log("des -> ", des)
            console.log("newArr -> ", newArr)

const mapLocation = value.description
console.log("mapLocation -> ", mapLocation)

      const response = await api.post(`/newpost`, { ...des,  addLocation: value.description, tagUser: newArr });


      console.log("response NewPost -> ", response.data);

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
                <Button
                  style={{ borderRadius: "20px", height: "4em" }}
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  <AddAPhotoIcon style={{ height: "1.3em", width: "auto" }} />
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
                  style={{ width: "18.7em" }}
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

            <div className="p-2 bd-highlight">
              <GoogleLocation value={value} setValue={setValue} />
            </div>

            <div className="p-2 bd-highlight">
              <UserTag onChange={handleChange} />
            </div>

            <Button
              className="p-2 bd-highlight"
              style={{ marginLeft: "0.5em", marginRight: "0.5em" }}
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
