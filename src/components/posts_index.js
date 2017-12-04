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
					{post.title}
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