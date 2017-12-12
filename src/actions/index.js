import axios from 'axios'

export const FETCH_POSTS = 'fetch_posts'
export const CREATE_POST = 'create_post'
export const FETCH_POST = 'fetch_post'
export const DELETE_POST = 'delete_post'

const ROOT_URL = 'http://reduxblog.herokuapp.com/api'
const API_KEY = '?key=yabadaba'

export function fetchPosts(){
	const request = axios.get(`${ROOT_URL}/posts${API_KEY}`)

	return{
		type: FETCH_POSTS,
		payload: request
	}
}


//we don't have case for this in reducer because we don't do anything after it's posted? all we 
//do is redirect back to / route. So there is no data that we need to do anything with in our app 
export function createPost(values, callback){
	const request = axios.post(`${ROOT_URL}/posts/${API_KEY}`, values)
		//we use a promise because that is what is returned by axios request
		.then(() => callback());


	return{
		type: CREATE_POST,
		payload: request
	}
}

export function postShow(id){
	const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`)

	return{
		type: FETCH_POST,
		payload: request
	}
}


//we don't need a case for this since all we are doing is deleting a post
export function deletePost(id, callback){
	const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
		.then( () => callback())

	return{
		type: DELETE_POST,
		payload: request
	}
}

// http://reduxblog.herokuapp.com/
















/*
To update state inside of child component and have it reflect and be passed up into uppermost parent component
1. create function inside parent component. This function should update the state with setState({}). Use arrow function.
2. pass that function into the child component/ until it reaches the child component
3. also pass in whatever state is needed as props
4. call that passed down function on whatever event happens
5. The state on the utmost parent component will be updated, and passed down to child component
6. Update the state in child component with props state sent down from parent component. 

*/
