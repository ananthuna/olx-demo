import React, { useContext } from 'react';
import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Signup.css';
import {useHistory} from 'react-router-dom'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function Signup() {
  const history = useHistory()
  const {firebase} =useContext(FirebaseContext)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {register,handleSubmit,formState:{errors}} = useForm({mode:"onChange"})

  const onSubmit = (data) => {
    console.log(data);
    setOpen(!open);
      firebase.auth().createUserWithEmailAndPassword(data.email,data.password).then((result)=>{
        result.user.updateProfile({displayName:data.username}).then(()=>{
          firebase.firestore().collection('users').add({
            id:result.user.uid,
            username:data.username,
            phone:data.phone
          }).then(()=>{
            history.push("/login")
          })
        })
      })
    
  }


  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='img'></img>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            placeholder='username'
            {...register("name",{required:true,maxLength:10})}
          />
          {errors.username && <p className='errortag'>*Please check the username</p>}
          <br />
          <label htmlFor="fname">Email</label>  
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            placeholder='email'
            {...register("email",{required:true,pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
          />
          {errors.email && <p className='errortag'>* invalid email id</p>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            placeholder='phone'
            {...register("phone",{required:true})}
          />
          {errors.phone && <p className='errortag'>* phone number required</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            placeholder='password'
            {...register("password",{required:true,pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/})}
          />
          {errors.password && <div>
            <p className='errortag'>* invalid password</p>
            <p>require 1 uppercase and lowercase<br/> number and min 6 character</p>
            </div>}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a href='/login' onClick={()=>setOpen(!open)}>Login</a>
      </div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
