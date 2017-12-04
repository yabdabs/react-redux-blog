import _ from 'lodash'
import { FETCH_POSTS } from '../actions/index'

export default function(state={}, action){
	switch(action.type){
		case FETCH_POSTS:
			console.log('inside of reducer_posts',action.payload.data) //[post1, post2] is format we'll get. we want format to be post id as key: post ---- {4: post}
			return _.mapKeys(action.payload.data, 'id');

		default:
			return state
	}
}