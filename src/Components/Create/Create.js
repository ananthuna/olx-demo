import React, { Fragment,useState,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/Context'
import {useHistory} from 'react-router-dom'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));



const Create = () => {
  const [name,setName] = useState('')
  const [category,setCategory] =useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)
  const date = new Date()
  const history = useHistory()
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  

  const handleSubmit=(e)=>{
    e.preventDefault()
    setOpen(!open);
            firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
              ref.getDownloadURL().then((url)=>{
                firebase.firestore().collection('products').add({
                  name,
                  category,
                  price,
                  url,
                  userId:user.uid,
                  createdAt:date.toDateString()
                })
                history.push('/')
              })
            })
  }

  const handleClose = () => {
    setOpen(false);
  };

  

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="name"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              placeholder="Category"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input 
              className="input"
              type="number" 
              id="fname" 
              name="Price" 
              value={price}
              onChange={(e)=>setPrice(e.target.value)}
              />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""}></img>
          <form>
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }}
            type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Fragment>
  );
};

export default Create;
