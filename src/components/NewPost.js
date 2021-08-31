import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { useHistory } from "react-router";
import userImg from "../img/Sem Título.png";
import TextField from "@material-ui/core/TextField";
import React from "react";
import Box from "@material-ui/core/Box";
import PublishIcon from "@material-ui/icons/Publish";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import UserTag from "./GlobalComponents/UserTag";
import api from "../apis/api";
import { Alert, AlertTitle } from "@material-ui/lab";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green } from "@material-ui/core/colors";
import clsx from "clsx";
import GoogleLocation from "./GlobalComponents/GoogleLocation";
import NavBar from "./GlobalComponents/NavBar";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  rootSuccess: {
    display: "flex",
    alignItems: "center",
  },
  input: {
    display: "none",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}));

function NewPost() {
  const classes = useStyles();
  const history = useHistory();
  const [des, setDes] = useState({ description: "" });
  const [value, setValue] = React.useState({});
  const [img, setImg] = useState({ file: null, postImg: null });
  const [listTag, setListTag] = useState([]);
  const [error, setError] = useState(null);

  const [loading, setLoading] = React.useState(false);
  const timer = React.useRef();
  const [success, setSuccess] = React.useState(false);

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  const handleButtonClick = () => {
    if (error === null && success === false) {
      setSuccess(false);
      setLoading(true);

      timer.current = window.setTimeout(() => {
        setSuccess(false);
        setLoading(false);
      }, 1000);
    }

    if (error) {
      setSuccess(false);
      setLoading(true);

      timer.current = window.setTimeout(() => {
        setSuccess(false);
        setLoading(false);
      }, 500);
    }

    if (img.postImg) {
      setLoading(true);
    }
  };

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
      handleButtonClick();

      const newArr = [];
      for (let list of listTag) {
        for (let result of list) {
          newArr.push(result);
        }
      }

      let location = value === null ? "" : value.description;

      const postImgURL = await handleFileUpload(img.postImg);

      const response = await api.post(`/newpost`, {
        ...des,
        addLocation: location,
        tagUser: newArr,
        postImgURL,
      });

      setSuccess(true);
      setError(null);

      setTimeout(() => {
        history.push("/profile");
      }, 1000);
    } catch (err) {
      console.log(err.response);
      setTimeout(() => {
        setError(err.response.data.msg);
      }, 1000);
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
          <img
            className="imgNewPost"
            src={img.file}
            alt="Your preview file selected"
          />
        ) : (
          <img className="imgNull" src={userImg} alt="Preview file selected" />
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
                  style={{
                    borderRadius: "20px",
                    height: "4em",
                    marginBottom: "2em",
                  }}
                  variant="contained"
                  color="primary"
                  component="span"
                >
                  <AddAPhotoIcon style={{ height: "1.3em", width: "11.2em" }} />
                </Button>
              </label>
            </div>

            {error ? (
              <div
                style={{
                  width: "19.5em",
                  marginBottom: "2em",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Alert severity="warning">
                  <AlertTitle>Warning</AlertTitle> {error} —{" "}
                  <strong>check it out!</strong>
                </Alert>
              </div>
            ) : (
              <></>
            )}

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
                  style={{ width: "18.7em", marginBottom: "1em" }}
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

            <div className="p-2 bd-highlight" style={{ marginBottom: "1em" }}>
              <GoogleLocation value={value} setValue={setValue} />
            </div>

            <div className="p-2 bd-highlight" style={{ marginBottom: "1em" }}>
              <UserTag onChange={handleChange} />
            </div>

            <div className={classes.rootSuccess}>
              <div className={classes.wrapper}>
                <Button
                  style={{ borderRadius: "15px" }}
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={buttonClassname}
                  disabled={loading}
                  endIcon={<PublishIcon />}
                >
                  Post
                </Button>
                {loading && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default NewPost;
