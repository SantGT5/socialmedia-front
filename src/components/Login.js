import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import React, { useState, useContext } from "react";
import { authContext } from "../contexts/authContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import api from "../apis/api";

import { Alert, AlertTitle } from "@material-ui/lab";

function Login(props) {
  const { setLoggedInUser } = useContext(authContext);
  const [state, setState] = useState({
    email: "",
    password: "",
  });

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
      console.log("setLoggedInUser -> ", response.data);
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
