import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Home() {
  const classes = useStyles();
  const history = useHistory();


  const handleClick = () =>{
    history.push("/newpost");
  }


  return (
      <div id="IconHome" className={classes.root}>
        <Fab onClick={handleClick} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>

  );
}

export default Home;
