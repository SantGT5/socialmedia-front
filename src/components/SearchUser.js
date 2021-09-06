import TextField from "@material-ui/core/TextField";

function SearchUser(props) {
  return (
    <div>
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
      </div>
    </div>
  );
}

export default SearchUser;
