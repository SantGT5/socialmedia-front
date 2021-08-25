import * as React from "react";
import { styled } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../apis/api";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [heart, setHeart] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');

  console.log("heart -> ", heart);






  useEffect(() => {
    async function fetchLike() {
      try {
        const response = await api("/userpost");
        setHeart([...response.data]);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchLike();
  }, []);





  
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            src={
              loggedInUser.user.imgUserURL
                ? loggedInUser.user.imgUserURL
                : "/broken-image.jpg"
            }
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.userProfileName}
        subheader={props.addLocation}
      />
      <CardMedia
        sx={{
          height: 0,
          paddingTop: "56.25%", // 16:9
        }}
        src={props.postImgURL}
        component="img"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/likedpost/${props.like}`}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </Link>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <div className="d-flex justify-content-sm-end">
          <span>Tag</span>
        </div>

        {/* style={{ marginLeft:"13.9em", width:"5.1em" }} */}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{props.tagUser}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
