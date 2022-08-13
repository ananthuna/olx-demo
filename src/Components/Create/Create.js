import React, { Fragment,useState,useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {FirebaseContext,AuthContext} from '../../store/Context'

const Create = () => {
  const [name,setName] = useState('')
  const [category,setCategory] =useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const {firebase} = useContext(FirebaseContext)
  const {user} = useContext(AuthContext)

  const handleSubmit=()=>{

  }

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
              name="category"
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
            <button onChange={handleSubmit} className="uploadBtn">upload and Submit</button>
          </form>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
