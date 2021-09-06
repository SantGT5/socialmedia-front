import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { useState, useContext } from "react";
import { authContext } from "../contexts/authContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import api from "../apis/api";
import { Alert, AlertTitle } from "@material-ui/lab";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

function Login(props) {
  const classes = useStyles();
  const { setLoggedInUser } = useContext(authContext);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [error, setError] = useState(null);

  const history = useHistory();

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault(props);

    try {
      const response = await api.post("/login", state);
      setError(null);

      // Atualizando o state do Context para que todos os componentes tenham acesso ao usuário logado
      setLoggedInUser({ ...response.data });
      // Salvando o usuário no localStorage para persistir a informação no computador do usuário, dessa forma, o usuário pode fechar a janela do site e ainda assim permanecerá logado
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data }) // O localStorage só aceita armazenar strings, por isso precisamos transformar nosso objeto em JSON
      );

      history.push("/");
    } catch (err) {
      if (err.response && err.response.data.msg) {
        setError(err.response.data.msg);
      }

      // setError(err.response.data.msg);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="containerLogin">Log in</h1>
      <Box>
        <div className="containerLogin">
          <div className="borderLogin">
            <TextField
              style={{ marginTop: "1em", width: "14.7em" }}
              onChange={handleChange}
              name="email"
              value={state.email}
              label="E-mail"
              variant="standard"
            />
            {/* <TextField
              style={{ marginTop: "4%", width: "70%" }}
              onChange={handleChange}
              name="password"
              value={state.password}
              label="Password"
              variant="standard"
            /> */}

            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="standard-adornment-password">
                Password
              </InputLabel>
              <Input
                style={{ marginTop: "1em", width: "14.7em" }}
                id="standard-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={state.password}
                onChange={handleChange}
                name="password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <div style={{ marginTop: "10%" }}>
              <Button variant="outlined" type="submit">
                Next
              </Button>
            </div>
            <div style={{ marginTop: "8%" }}>
              <span>
                Don't have an account?{" "}
                <Link to="/signup" className="links">
                  Sign Up
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

export default Login;
