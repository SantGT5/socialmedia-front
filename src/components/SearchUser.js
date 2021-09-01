import TextField from "@material-ui/core/TextField";

function SearchUser(props) {
  // useEffect(() => {
  //   async function fetchUser() {
  //     try {

  //       const response = await api.post("/search", { userName: props.userName });

  //       setFound([...response.data]);
  //     } catch (err) {
  //       console.log(err.response);
  //     }
  //   }
  //   fetchUser();
  // }, [props.userName]);

  return (
    <div>
      {/* <div>
        <NavBar />
        <div className="d-flex justify-content-center">
        <span style={{ fontSize: "1.5em", marginTop: "0.2em", marginBottom:"0em" }}>
        <i className="fas fa-user-plus"></i> Search Profiles
        </span>
      </div>
      </div> */}
      <div style={{ marginLeft: "0.7em" }}>
        <div
          style={{
            marginBottom: "1em",
          }}
        >
          <TextField
            style={{
              display: "flex",
              justifyContent: "end",
              marginTop: "2em",
              width: "100%",
              maxWidth: "16.5em",
            }}
            value={props.userName}
            onChange={props.onChange}
            id="outlined-basic"
            label="Search"
            variant="outlined"
            name="userName"
            type="text"
          />
        </div>
        {/* <div>
          <div style={{ flexDirection: "column" }}>
            {props.userName === "" ? (
              <></>
            ) : (
              found.map((elem) => {
                return (
                  <Link to={ `/userprofile/${elem.profileName}` } style={{ display: "flex", justifyContent: "center", textDecoration:"none", color:"black" }}>
                    <div
                      className="borderSearch"
                      style={{
                        width: "20em",
                        display: "flex",
                        alignItems: "center",
                        marginTop: "0.5em",
                      }}
                    >
                      <Avatar
                        src={
                          elem.imgUserURL
                            ? elem.imgUserURL
                            : "/broken-image.jpg"
                        }
                        style={{ marginLeft:"6px" }}
                      />
                      <div
                        style={{ marginTop: "9px" }}
                        className="d-flex flex-column bd-highlight mb-3"
                      >
                        <span style={{ padding: "0px" }}>
                          {elem.profileName}
                        </span>

                        <span style={{ padding: "0px", fontSize: "13px" }}>
                          {elem.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default SearchUser;
