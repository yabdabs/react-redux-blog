import React from 'react'
import _ from 'lodash'

//wire up fetch_post action creator to this component
//connect is what connects redux store, or application state, to our components.
//....uses connect to map the stores state and dispatch to the props of a component 
import { connect } from 'react-redux'
// Link is the react equivilant of the a tag in html, except we are pulling up a new component, not hmtl document
import { Link } from 'react-router-dom'

import { fetchPosts } from '../actions/index'

class PostsIndex extends React.Component {

	componentDidMount(){
		this.props.fetchPosts()
	}

	renderPosts(){
		return _.map(this.props.posts, post =>{
			return(
				<li className='list-group-item' key={post.id}>
					<Link to=	{`/posts/${post.id}`}>{post.title} </Link>
				</li>
			)
		})
	}

	render(){	
		console.log('inside render of PostsIndex Componnent',this.props.posts)
		return(
			<div>
				<div className='text-xs-right'>
					<Link className='btn btn-primary' to='/posts/new'> Add a Post </Link>
				</div>

				<h3>Posts</h3>
				<ul className='list-group-item'>
					{this.renderPosts()}
				</ul>
			</div>
		)
	}
}

//whenever we want to consume application level state, always define mapStateToProps()
//In mapStateToProps you assign what information in your store you want to be available inside the component.

// mapStateToProps and mapDispatchToProps are both pure functions that are provided the stores “state” and “dispatch” respectively
// Both mapStateToProps and mapDispatchToProps have to return an object, 
// whose keys will then be passed on as the props of the component they are connected to.
function mapStateToProps(state){
	return{
		posts: state.posts
	}
}
// mapStateToProps is first arg
// {fetchPosts:fetchPosts} is the same as {fetchPosts}
// we do this instead of mapDispatchToProps, it's another way
//so this still wires up action creator to this components props
export default connect(mapStateToProps, {fetchPosts} )(PostsIndex)



// The intent of a mapDispatch function is to return an object, and each key/value in the object will become a prop for the component. 
// In mapStateToProps you assign what information in your store you want to be available inside the component 

// Since reducers hold our application level state, and we are in a component, that means if we want to use app level state 
// inside of our component, we must use mapStateToProps
// app level state and store are the same thing


//mapStateToProps is saying map the app level state to the components props



/* Steps for this Component

1. User visits this component, and component mounts.
2. ComponentDidMount runs, and calls fetchPosts, which is on the props object
	- Question: How did fetchPosts action creator get on the components props object?
	- Answer:
		- We created the fetchPosts action creator in the actions folder, which is just a function 
			that returns a type and a payload.
		- We know action creators send actions to the reducers
		- So, inside of our reducer_posts.js reducer, we create a case for a type of FETCH_POSTS. This case handles 
			that action.
		- The reducer handles and updates our new state
		- This new state is then imported into index.js in the reducers folder, which combines all of our reducers
		- Now lets go back to this component. We set up mapStateToProps, because we want certain data from app level state to be 
			on this props. All mapStateToProps does is returns an object, whose keys will then be passed to the props 
			of the component it is connected to
		- Lastly and in relation to the last point, the connect function is what maps the stores state and dispatch
			to the props of a component. We pass in mapStateToProps, which returns that state we want, the action creator/dispatch,
			and lastly, the component we want it all to connect to.
		- In the end, app state is on props, and dispatch/action creator is on props. So we can call the action creator
			to then ultimately change app level state
*/