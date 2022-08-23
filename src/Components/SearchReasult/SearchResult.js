import React, { useContext } from 'react';
import Heart from '../../assets/Heart';
import './SearchResult.css';
import {useHistory} from 'react-router-dom' 
import { PostContext } from '../../store/PostContext';
import {SearchContext} from '../../store/SearchContext'

function SearchResult() {
  const history = useHistory()
  const {setPostDetails} = useContext(PostContext)
  const {SearchDetails} =useContext(SearchContext)
  

  



  return (
   
      <div className="moreView">
        <div className="heading">
          <span>Search Results</span>
          <span>View more</span>
        </div>
        <div className="cards" >

          {SearchDetails.map(product => {


            return <div
              className="card"
            onClick={()=>{
              setPostDetails(product)
              history.push('/view')
            }}
            
            >
              <div className="favorite">
                <Heart></Heart>
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.createdAt}</span>
              </div>
            </div>
          })

          }

        </div>
      </div>
     
    
  );
}

export default SearchResult;
