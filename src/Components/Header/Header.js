import React, { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context'
import { useHistory } from 'react-router-dom'
import {useState} from 'react'
import {SearchContext} from '../../store/SearchContext'





function Header() {
  const history = useHistory()
  const { user } = useContext(AuthContext)
  const { firebase } = useContext(FirebaseContext)
  const [search, setSearch] = useState('')
  const {setSearchDetails} = useContext(SearchContext)
  
  

  function Dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  const searchbutton=()=>{
    firebase.firestore().collection('products').where('category','==',search).get().then((res)=>{
      const result = res.docs.map((product) => {
        return {
          ...product.data()
         
        }
      })
      console.log(result)
      
      setSearchDetails(result)
       
      
    })
    
  }
  const sellbutton=()=>{
    if(user){
      history.push('/create')
      
      
    }else{
      alert('Login first.')
    }
  }


  
  
  
 


  return (
    
      <div className="headerParentDiv">
      
    <div className="headerChildDiv">
      <div className="brandName" onClick={() => { history.push('/') }}>
        <OlxLogo></OlxLogo>
      </div>

      <div className="productSearch">
        <div className="input">
          <input
            type="text"
            placeholder="Find car,mobile phone and more..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
          />
        </div>
        <div className="searchAction" onClick={searchbutton}>
          <Search color="#ffffff"></Search>
        </div>
      </div>

      <div class="dropdown" >
        <button onClick={()=>{
          user ? Dropdown() : history.push('/login')
        }} class="dropbtn">
          {user ? user.displayName : `Login`}
          </button>
        <div id="myDropdown" class="dropdown-content">
          <p onClick={() => {
        firebase.auth().signOut();
        history.push('/')}}>Logout</p>
        <p>account</p>
        <p>wishlist</p>
        <p>notification</p>
        <p>settings</p>
        </div>
      </div>

      <div className="sellMenu" onClick={sellbutton}>
        <SellButton></SellButton>
        <div className="sellMenuContent">
          <SellButtonPlus></SellButtonPlus>
          <span>SELL</span>
        </div>
      </div>

    </div>
  </div>
  
  );
}

export default Header;
