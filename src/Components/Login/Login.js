import React,{useContext, useState} from 'react';
import Logo from '../../olx-logo.png';
import './Login.css';
import {FirebaseContext} from '../../store/Context'
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


function Login() {
  const history=useHistory()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {firebase} =useContext(FirebaseContext)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  

  const handleLogin=(e)=>{
    e.preventDefault()
    setOpen(!open);
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push('/')
    }).catch((error)=>{
      alert(error.message)
    })
  }
  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='img_logo'></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            placeholder='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            placeholder='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a href='/signup' onClick={()=>setOpen(!open)}>Signup</a>
      </div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default Login;
