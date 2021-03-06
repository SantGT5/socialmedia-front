import NavBar from "./GlobalComponents/NavBar";
import { useState, useEffect } from "react";
import api from "../apis/api";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { Alert, AlertTitle } from "@material-ui/lab";
import imgUser from "../img/pngwing.com.png";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import Button from "@material-ui/core/Button";
import ClearIcon from "@material-ui/icons/Clear";
import Snackbar from "@material-ui/core/Snackbar";
import { useHistory, useParams } from "react-router";
import AddPhotoBTN from "./GlobalComponents/AddPhotoBTN";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 162,
    marginLeft: "2em",
  },
  selectEmpty: {
    margin: theme.spacing(1),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditUser(props) {
  const classes = useStyles();
  const history = useHistory();

  const [status, setStatus] = useState({
    name: "",
    profileName: "",
    email: "",
    gender: "",
    imgUserURL: "",
  });


  console.log("status -> ", status)

  const arrGender = ["Male", "Female", "Other"];
  const [open, setOpen] = React.useState(false);
  const [error, setErro] = useState(null);
  const [mensage, setMensage] = React.useState(false);
  const [img, setImg] = useState({ file: null, imgUser: null });



  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');

  const handleImage = (event) => {
    if (event.target.files.length) {
      setImg({
        file: URL.createObjectURL(event.target.files[0]),
        imgUser: event.target.files[0],
      });
    }
  };

  async function handleFileUpload(file) {
    if (file) {
      const uploadData = new FormData();

      uploadData.append("imgUser", file);

      const response = await api.post("/uploaduser", uploadData);

      return response.data.url;
    }

    return status.imgUserURL;
  }

  const handleChange = (event) => {
    setStatus({
      ...status,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  useEffect(() => {
    async function fetchEdit() {
      try {
        const response = await api.get("/profile");
        setStatus({ ...response.data });
      } catch (err) {
        console.log(err);
      }
    }
    fetchEdit();
  }, []);

  const handleClick = () => {
    history.push("/personal-info");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { id } = useParams();

  async function handleSubmit(event) {
    event.preventDefault(props);
    try {
      const imgUserURL = await handleFileUpload(img.imgUser);

      const response = await api.put(`/edite/${id}`, { ...status, imgUserURL });

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          token: loggedInUser.token,
          user: { ...status, imgUserURL },
        })
      );

      setMensage(true);
      setErro(null);

      setTimeout(() => {
        handleCloseMensage();
      }, 1500);
    } catch (err) {
      if (err.response && err.response.data.msg) {
        setErro(err.response.data.msg);
      }
    }
  }

  const handleCloseMensage = (event, reason) => {
    setMensage(false);
    history.push("/personal-info");
  };

  return (
    <form onSubmit={handleSubmit}>
      <NavBar />
      <div>
        <div className="container">
          <Avatar
            style={{ width: "6.5em", height: "6.5em" }}
            src={img.file !== null ? img.file  :  status.imgUserURL }
          />
          <AddPhotoBTN onChange={handleImage} />

          <div className={classes.margin}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Name"
                  value={status.name}
                  onChange={handleChange}
                  name="name"
                />
              </Grid>
            </Grid>

            <Grid
              style={{ marginTop: "1em" }}
              container
              spacing={1}
              alignItems="flex-end"
            >
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="Username"
                  value={status.profileName}
                  onChange={handleChange}
                  name="profileName"
                />
              </Grid>
            </Grid>

            <Grid
              style={{ marginTop: "1em" }}
              container
              spacing={1}
              alignItems="flex-end"
            >
              <Grid item>
                <EmailIcon />
              </Grid>
              <Grid item>
                <TextField
                  id="input-with-icon-grid"
                  label="E-mail"
                  value={status.email}
                  type="email"
                  onChange={handleChange}
                  name="email"
                />
              </Grid>
            </Grid>
            <div>
              <select
                className="container form-select"
                style={{
                  marginTop: "2em",
                  width: "10em",
                  backgroundColor: "#ebebeb",
                }}
                aria-label="Default select example"
                value={status.gender}
                onChange={handleChange}
                name="gender"
              >
                {arrGender.map((text, i) => {
                  return (
                    <option key={i} value={text}>
                      {text}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2em",
        }}
      >
        <Button
          style={{ marginLeft: "0.5em", marginRight: "0.5em" }}
          variant="contained"
          endIcon={<SaveAltIcon />}
          type="submit"
        >
          Save
        </Button>

        <Button
          variant="contained"
          endIcon={<ClearIcon />}
          onClick={handleClickOpen}
          style={{ marginLeft: "0.5em", marginRight: "0.5em" }}
        >
          Cancel
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Are you sure you want to exit without saving?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Any unsaved changes will be lost.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClick} color="primary">
              Leave
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <div className="alertMSG" style={{ marginTop: "2em" }}>
        {error ? (
          <div>
            <Alert severity="warning">
              {" "}
              <AlertTitle>Warning</AlertTitle> {error} ???{" "}
              <strong>check it out!</strong>{" "}
            </Alert>
          </div>
        ) : (
          <></>
        )}
      </div>

      <Snackbar open={mensage}>
        <Alert
          onClose={handleCloseMensage}
          severity="success"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </form>
  );
}

export default EditUser;
