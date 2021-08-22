import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import React from "react";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

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

function NewPost(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={props.onChange}
      />
      <label htmlFor="contained-button-file">
        <Button
          style={{
            borderRadius: "15px",
            height: "2.5em",
          }}
          variant="contained"
          color={props.color}
          component="span"
        >
          <AddAPhotoIcon style={{ height: "1em", width: "1em" }} />
        </Button>
      </label>
    </div>
  );
}

export default NewPost;
