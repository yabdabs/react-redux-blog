import React, { Component } from 'react'

//using this snytax is destructuring(es6). Same as saying { Link: Link }. First term is the variable/property
//we want to pull from 'react-router-dom'. Second term is the variable name we want it to be called.
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

//action creators / dispatch
import { postShow } from '../actions/index'
import { deletePost } from '../actions/index'

class PostShow extends Component{
	componentDidMount(){
		/*we need to know about the specific id that's in the url. We don't want all the application state, we 
		are only looking for one specific id, so we can display one specific post. */

		/*react router provides us with this prop on the props object
		the params object list all the wild card tokens that exist inside the url
		in our case, we only want the id, which is the only wildcard that exists also
		this.props.match.params.id */
		//using destructuing is the same as above
		const { id } = this.props.match.params

		//component renders first, so that is why we are able to use the action creator. Everything is linked up before this
		this.props.postShow(id)
	} 

	onDeleteClick(){
		const { id } = this.props.match.params

		this.props.deletePost(id, () =>{
			this.props.history.push('/')
		})
	}

	render(){
		console.log('inside of posts_show.js, targeting a specific post', this.props.posts)

		//we are saying here take the post object out of this.props, and assign it to the const post
		const { post } = this.props

		/*we do this check bc the first time this component renders, before componentDidUpdate is called,
		 this.props.post is undefined.
		 It gets a post value when componentDidUpdate is called, then actioncreator is called, redux stuff happens,
		 and connect links everything. Then component rerenders, because state has changed. */
		if(!post){
			return(
				<div>
					<h2>Fetching Post...</h2>
				</div>
			)
		}

		return(
			<div>
				<Link to='/' className= 'btn btn-primary'>Back To Index</Link>
				<button 
					className='btn btn-danger pull-xs-right'
					onClick ={this.onDeleteClick.bind(this)}
				>
					Delete Post
				</button>
				<h3>{post.title}</h3>
				<h4>Category: {post.categories}</h4>
				<h5>{post.content}</h5>
			</div>
		)
	}
}

//ownProps is the props object that is going to this component. so this.props=== ownProps
//we do this because we only want to send the single id, not the enter post state
function mapStateToProps(state, ownProps){
	return{
		//this post key is put onto the components props
		post: state.posts[ownProps.match.params.id]
	}
}

export default connect(mapStateToProps, { postShow, deletePost })(PostShow)



/* 
-first componentDidMount is called once comp is rendered to screen
-postShow action creator is called
-redux stuff happens, goes through connect
-component re renders
*/