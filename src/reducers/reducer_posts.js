import _ from 'lodash'
import { FETCH_POSTS } from '../actions/index'
import { FETCH_POST} from '../actions/index'

export default function(state={}, action){
	switch(action.type){
		case FETCH_POSTS:
			console.log('inside of reducer_posts',action.payload.data) //[post1, post2] is format we'll get. we want format to be post id as key: post ---- {4: post}
			return _.mapKeys(action.payload.data, 'id');

		case FETCH_POST:
			console.log('inside of reducer_posts, fetching a single post', action.payload.data)

			//so we know that there might already be some existing posts in our application level state.
			//therefore, we don't want to throw data we collected over time by making a brand new state.
			//therefore, we can just take everything from our old state and keep it.
			//...states says take everything from our state object and put it into this new object
			//and we are still returning a new object

			//es5 way
			// const post = action.payload.data
			// const newState = { ...state }
			// newState[post.id] = post
			// return newState

			//es6 way
			return { ...state, [action.payload.data.id]: action.payload.data }

		default:
			return state
	}
}





























