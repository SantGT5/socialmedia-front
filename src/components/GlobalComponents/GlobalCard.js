// import * as React from "react";
// import { styled } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia";
// import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
// import Collapse from "@material-ui/core/Collapse";
// import Avatar from "@material-ui/core/Avatar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// // import { red } from "@material-ui/core/colors";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import ShareIcon from "@material-ui/icons/Share";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";

// import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import api from "../../apis/api";

// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import Slide from "@material-ui/core/Slide";

// import Menu from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import { useHistory } from "react-router";

// import RedditIcon from "@material-ui/icons/Reddit";
// import WhatsAppIcon from "@material-ui/icons/WhatsApp";
// import FacebookIcon from "@material-ui/icons/Facebook";
// import LinkedInIcon from "@material-ui/icons/LinkedIn";
// import PinterestIcon from "@material-ui/icons/Pinterest";
// import ListItem from "@material-ui/core/ListItem";
// import List from "@material-ui/core/List";

// import ListItemText from "@material-ui/core/ListItemText";
// const options = ["Delete"];

// const ITEM_HEIGHT = 48;

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// export default function RecipeReviewCard(props) {
//   const history = useHistory();

//   const arrShare = [
//     {
//       text: "Facebook",
//       icon: <FacebookIcon />,
//       href: `http://www.facebook.com/sharer.php?u=${props.share}`,
//     },
//     {
//       text: "LinkedIn",
//       icon: <LinkedInIcon />,
//       href: `https://www.linkedin.com/shareArticle?mini=true&url=${props.share}`,
//     },
//     {
//       text: "Pinterest",
//       icon: <PinterestIcon />,
//       href: `https://www.pinterest.es/pin/create/button/?url=${props.share}`,
//     },
//     {
//       text: "WhatsApp",
//       icon: <WhatsAppIcon />,
//       href: `whatsapp://send?text=${props.share}`,
//     },
//     {
//       text: "Reddit",
//       icon: <RedditIcon />,
//       href: `http://www.reddit.com/submit?url=${props.share}`,
//     },
//   ];

//   const [share, setShare] = React.useState(null);
//   const openShare = Boolean(setShare);

//   console.log("share -> ", share);

//   const handleClickShare = (event) => {
//     setShare(event.currentTarget);
//   };
//   const handleCloseShare = () => {
//     setShare(null);
//   };

//   const storedUser = localStorage.getItem("loggedInUser");
//   const loggedInUser = JSON.parse(storedUser || '""');

//   const [expanded, setExpanded] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [heart, setHeart] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const openOption = Boolean(anchorEl);

//   const handleClickOpen = () => {
//     setOpen(true);
//     setAnchorEl(false);
//   };

//   const handleCloseSlide = () => {
//     setOpen(false);
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleDelete = () => {
//     history.push(`/deletepost/${props.id}`);
//   };

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   useEffect(() => {
//     async function fetchLike() {
//       try {
//         const response = await api("/userpost");
//         setHeart([...response.data]);
//       } catch (err) {
//         console.log(err.response);
//       }
//     }
//     fetchLike();
//   }, []);

//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardHeader
//         avatar={<Avatar src={props.imgUser ? props.imgUser : ""} />}
//         action={
//           <div>
//             {props.loggedInUser === loggedInUser.user.profileName ? (
//               <IconButton
//                 aria-label="more"
//                 id="long-button"
//                 aria-controls="long-menu"
//                 aria-expanded={openOption ? "true" : undefined}
//                 aria-haspopup="true"
//                 onClick={handleClick}
//               >
//                 <MoreVertIcon />
//               </IconButton>
//             ) : (
//               <></>
//             )}

//             <Menu
//               id="long-menu"
//               anchorEl={anchorEl}
//               keepMounted
//               open={openOption}
//               onClose={handleClose}
//               PaperProps={{
//                 style: {
//                   maxHeight: ITEM_HEIGHT * 4.5,
//                   width: "15ch",
//                 },
//               }}
//             >
//               {options.map((option, i) => (
//                 <MenuItem
//                   key={i}
//                   selected={option === "Pyxis"}
//                   onClick={handleClickOpen}
//                 >
//                   {option}
//                 </MenuItem>
//               ))}
//             </Menu>
//           </div>
//         }
//         title={props.userProfileName}
//         subheader={props.addLocation}
//       />
//       <CardMedia
//         sx={{
//           height: 0,
//           paddingTop: "56.25%", // 16:9
//         }}
//         src={props.postImgURL}
//         component="img"
//       />
//       <CardContent>
//         <Typography variant="body2" color="text.secondary">
//           {props.description}
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <Link to={`/likedpost/${props.like}`}>
//           <IconButton aria-label="add to favorites">
//             {props.likeResult === true ? (
//               <FavoriteIcon />
//             ) : (
//               <FavoriteBorderIcon />
//             )}
//           </IconButton>
//         </Link>
//         <div>
//           <IconButton
//             aria-label="more"
//             id="long-button"
//             aria-controls="long-menu"
//             aria-expanded={openShare ? "true" : undefined}
//             aria-haspopup="true"
//             onClick={handleClickShare}
//           >
//             <ShareIcon />
//           </IconButton>
//           <Menu
//             id="long-menu"
//             MenuListProps={{
//               "aria-labelledby": "long-button",
//             }}
//             anchorEl={share}
//             open={share}
//             onClose={handleCloseShare}
//             PaperProps={{
//               style: {
//                 maxHeight: ITEM_HEIGHT * 4.5,
//                 width: "15ch",
//               },
//             }}
//           >
//             <MenuItem style={{ padding: "0px" }} onClick={handleCloseShare}>
//               <List style={{ padding: "0px" }}>
//                 {arrShare.map((option, i) => {
//                   const { text, icon, href } = option;

//                   return (
//                     <ListItem style={{ padding: "2px" }}>
//                       <a
//                         button
//                         key={i}
//                         style={{
//                           padding: "0px",
//                           marginLeft: "12px",
//                           display: "flex",
//                           alignItems: "center",
//                           textDecoration: "none",
//                           color: "black",
//                         }}
//                         button
//                         key={i}
//                         href={href}
//                         target="_blank"
//                         rel="noreferrer"
//                       >
//                         {icon}
//                         <ListItemText
//                           style={{ marginLeft: "10px" }}
//                           primary={text}
//                         />
//                       </a>
//                     </ListItem>
//                   );
//                 })}
//               </List>
//             </MenuItem>
//           </Menu>
//         </div>
//         <ExpandMore
//           expand={expanded}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </ExpandMore>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <Typography paragraph>{props.tagUser}</Typography>
//         </CardContent>
//       </Collapse>

//       <div>
//         <Dialog
//           open={open}
//           TransitionComponent={Transition}
//           keepMounted
//           onClose={handleClose}
//           aria-labelledby="alert-dialog-slide-title"
//           aria-describedby="alert-dialog-slide-description"
//         >
//           <DialogTitle id="alert-dialog-slide-title">
//             {"Are you Sure?"}
//           </DialogTitle>
//           <DialogContent>
//             <DialogContentText id="alert-dialog-slide-description">
//               Do you really want to delete this post ? This process cannot be
//               undone.
//             </DialogContentText>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseSlide} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={handleDelete} color="primary">
//               Delete
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </div>
//     </Card>
//   );
// }
