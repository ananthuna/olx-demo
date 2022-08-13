import React,{useContext,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import {AuthContext,FirebaseContext} from './store/Context'
import Create from './Pages/Create'


function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      console.log(user)
      setUser(user)
    })
  })
  

  return (
    <div>
      <Router>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/signup'>
          <Signup/>
        </Route>
        <Route path='/login'>
          <Login/>
        </Route>
        <Route path='/create'>
          <Create/>
        </Route>
      </Router>
    </div>
  );
}

export default App;
