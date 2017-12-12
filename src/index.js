import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//BrowserRouter interacts with the history library and decides what to do 
//based on a change in the url
//Route purpose is for the configuration of showing a certain component based on the url
import { BrowserRouter, Route, Switch} from 'react-router-dom'

import reducers from './reducers';
import PostsIndex from './components/posts_index.js'
import PostsNew from './components/posts_new.js'
import PostShow from './components/posts_show.js'

//we need this because of ascync nature of axios call. It returns a promise and this middleware handles that promise for us
import promise from 'redux-promise'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  // Provider is a React component given to us by the “react-redux” library. 
  // It serves just one purpose : to “provide” the store to its child components.
  //Since our entire application is a child of Provider, then that means that Provider provides the store to our entire application
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
	  		{/*instead of Switch, we could have put the 'exact' property on the Route tag*/}	
	    	<Switch>
	    	  {/*We put the most specific route at the top of this */}	
	    		<Route path='/posts/new' component={PostsNew} />
          <Route path= '/posts/:id' component={PostShow} />
	    		<Route path='/' component={PostsIndex} />
	    	</Switch>
    	</div>
  
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
