import { createContext, useState, useEffect } from "react";
const authContext = createContext();

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState({ user: {}, token: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    const loggedInUser = JSON.parse(storedUser || '""');

    if (loggedInUser.user) {
      setLoggedInUser({ ...loggedInUser });
    }
  }, []);

  // function logoff() {
  //   setLoggedInUser({ user: {}, token: "" });
  //   localStorage.removeItem("loggedInUser");
  // }

  console.log("VALOR ATUAL DO CONTEXT =>", loggedInUser);

  return (

        <authContext.Provider value={{ loggedInUser, setLoggedInUser }}>
          {props.children}
        </authContext.Provider>

  );
}

export { authContext, AuthContextComponent };
