import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import userImg from "../img/avatardefault_92824.png"

import GlobalCard from './GlobalCard';

import NavBar from "./NavBar"


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));


function NewPost(){
    const classes = useStyles();

    const [ img, setImg ] = useState({file: null})

async function handleImage(event){
    try{

        setImg({ file: URL.createObjectURL(event.target.files[0]) })

    }catch( err ){
        console.log( err )
    }
}

console.log("img -> ", img)
return(
    <div>
        <div>
        <NavBar />
    </div>

<div className="d-flex justify-content-center" >
<GlobalCard
    image={ img.file ? img.file : userImg }
    />
</div>

    {img.file ? <img className="imgNewPost" src={ img.file } alt="your image"></img> : <></> }




<div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={ handleImage }
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          Insert Photo
        </Button>
      </label>
      </div>




      
    </div>
    
)

}

export default NewPost