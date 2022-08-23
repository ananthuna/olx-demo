import React,{useState,useEffect,useContext} from 'react';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/PostContext';
import './View.css';

function View() {
  const [user,setUser] = useState()
  const {postDetails} = useContext(PostContext)
  const {firebase} = useContext(FirebaseContext)

  useEffect(()=>{
    const {userId} = postDetails 
    firebase.firestore().collection('users').where('id','==',userId).get().then((res)=>{
          res.forEach(doc=>{
            setUser(doc.data())
            
          })
    })
    
  },[postDetails,user,firebase,])
  

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt="img"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAt}</span>
        </div>
        {user &&
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{user.username}</p>
          <p>{user.phone}</p>
        </div>
          }
      </div>
    </div>
  );
}
export default View;
