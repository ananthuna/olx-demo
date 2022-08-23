import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FirebaseContext} from './store/Context'
import firebase from './firebase/config'
import Context from './store/Context'
import Post from './store/PostContext'
import Search from './store/SearchContext'

ReactDOM.render(
<FirebaseContext.Provider value={{firebase}}>
<Context>
<Post>
<Search>
<App/>
</Search>
</Post>
</Context>
</FirebaseContext.Provider>
, document.getElementById('root'));
