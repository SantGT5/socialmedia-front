// import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import * as React from "react";
import { useHistory } from "react-router";

import { useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import RedditIcon from "@material-ui/icons/Reddit";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import PinterestIcon from "@material-ui/icons/Pinterest";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";

import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { styled } from "@material-ui/core/styles";

const options = ["Delete"];
const ITEM_HEIGHT = 48;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

function NewGlobalCard(props) {
  const history = useHistory();
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openOption = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
  const [share, setShare] = React.useState(null);
  const openShare = Boolean(setShare);

  const arrShare = [
    {
      text: "Facebook",
      icon: <FacebookIcon />,
      href: `http://www.facebook.com/sharer.php?u=${props.share}`,
    },
    {
      text: "LinkedIn",
      icon: <LinkedInIcon />,
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${props.share}`,
    },
    {
      text: "Pinterest",
      icon: <PinterestIcon />,
      href: `https://www.pinterest.es/pin/create/button/?url=${props.share}`,
    },
    {
      text: "WhatsApp",
      icon: <WhatsAppIcon />,
      href: `whatsapp://send?text=${props.share}`,
    },
    {
      text: "Reddit",
      icon: <RedditIcon />,
      href: `http://www.reddit.com/submit?url=${props.share}`,
    },
  ];

  const handleClickShare = (event) => {
    setShare(event.currentTarget);
  };
  const handleCloseShare = () => {
    setShare(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    history.push(`/deletepost/${props.id}`);
  };

  const handleCloseSlide = () => {
    setOpen(false);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const storedUser = localStorage.getItem("loggedInUser");
  const loggedInUser = JSON.parse(storedUser || '""');

  return (
    <div
      className="card"
      style={{
        width: "95%",
        height: "auto",
        maxWidth: "30em",
        borderRadius: "20px",
      }}
    >
      <div className="post_header">
        <img
          style={{ width: "2.5em", height: "2.5em" }}
          src={props.imgUser}
          alt="User profile"
        />
        <div className="heading">
          <p className="main_heading">{props.userProfileName}</p>
          <p className="sub_heading">{props.addLocation}</p>
        </div>

        <div id="delete">
          {props.loggedInUser === loggedInUser.user.profileName ? (
            <IconButton
              className="d-flex justify-content-end"
              aria-label="more"
              id="long-button"
              aria-controls="long-menu"
              aria-expanded={openOption ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          ) : (
            <></>
          )}
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={openOption}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "15ch",
              },
            }}
          >
            {options.map((option, i) => (
              <MenuItem
                key={i}
                selected={option === "Pyxis"}
                onClick={handleClickOpen}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center" }}
        className="post_img"
      >
        <img src={props.postImgURL} alt="Post" />
      </div>
      <span>{props.description}</span>
      <div style={{ display: "flex" }}>
        <div className="post_footer">
          <div className="d-flex">
            <Link to={`/likedpost/${props.like}`}>
              <IconButton aria-label="add to favorites">
                {props.likeResult === true ? (
                  <FavoriteIcon style={{ color: "red", fontSize: "1.4em" }} />
                ) : (
                  <FavoriteBorderIcon style={{ fontSize: "1.4em" }} />
                )}
              </IconButton>
            </Link>

            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls="long-menu"
              aria-expanded={openShare ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClickShare}
            >
              <ShareIcon style={{ fontSize: "1.4em" }} />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                "aria-labelledby": "long-button",
              }}
              anchorEl={share}
              open={share}
              onClose={handleCloseShare}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: "15ch",
                },
              }}
            >
              <MenuItem style={{ padding: "0px" }} onClick={handleCloseShare}>
                <List style={{ padding: "0px" }}>
                  {arrShare.map((option, i) => {
                    const { text, icon, href } = option;

                    return (
                      <ListItem key={i} style={{ padding: "2px" }}>
                        <a
                          button
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            padding: "0px",
                            marginLeft: "12px",
                            display: "flex",
                            alignItems: "center",
                            textDecoration: "none",
                            color: "black",
                          }}
                        >
                          {icon}
                          <ListItemText
                            style={{ marginLeft: "10px" }}
                            primary={text}
                          />
                        </a>
                      </ListItem>
                    );
                  })}
                </List>
              </MenuItem>
            </Menu>
          </div>
        </div>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon style={{ fontSize: "1.4em" }} />
        </ExpandMore>
      </div>
      <div className="font">
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <p>{props.countLikes} Likes</p>

          <CardContent style={{ padding: "0em" }}>
            <Typography
              style={{
                margin: "0em",
                marginTop: "0.5em",
                alignItems: "flex-start",
              }}
              paragraph
            >
              {props.tagUser}
            </Typography>
          </CardContent>
        </Collapse>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Do you really want to delete this post ? This process cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSlide} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewGlobalCard;
