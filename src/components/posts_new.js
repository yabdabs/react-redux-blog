import React, { Component } from 'react'

// reduxForm can be thought of as similar to connect helper. it's what allows our component to communicate with that 
//additional reducer that we just wired in (formReducer?). It is what is allowing our component to talk directly to the redux store
//for every different pieces of form state, we create a Field 
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../actions/index.js'

// steps for redux-form
// 1. identify different pieces of form state 
// 2. Make one field component per piece of state (created by redux-form for us)
// 3. User changes a 'Field' input
// 4. Redux form automatically handles changes
// 5. User submits form
// 6. we validate inputs and handle form submittal
{/**/}

class PostsNew extends Component{

	//how is the input below supposed to be related to the Field component? How does this input know about the Field when it changes?
	// does it track to the field component naturally?
	// No, we have to wire it up together, so we pass in the field arguement. The field arg is what is in charge of making sure 
	//the Field component knows that it is responsible for dealing with the below particular text input.
	// The field argument is what holds the respective input/ single piece of reduxform state 
	renderField(field){

		const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`

		return(
			<div className= {className}>
				<label>{field.label}</label>
				<input
					type='text'
					className='form-control'
					// field.input is an object that contains a bunch of different event handlers and props. It also contains the input value
					//... means this is an object and we we want all the properties on the object to be communicated as props to the input tag 
					//so this is shorter syntax to writing onChange={field.input.onChange} and other stuff.
					{...field.input}
				/>

				<div className='text-help'>
					{/*this field.meta.error property is automatically added to that field object from the validate function */ }
					{/*ternary operator. before the ? is the condition. If condition is truthy, it goes to first after question mark.
						if falsy value, it goes to whatever is after the colon */ }
					{field.meta.touched ? field.meta.error: ''}
				</div>
			</div>
		)
	}

	onSubmit(values){
		//values arg holds the values from the form
		//this === component
		console.log(values)

		//call the createPost action creator
		this.props.createPost(values)
	}

	render(){

		//this is a property that is being passed to this component on behalf of reduxForm
		//Remember we connected reduxFrom to this component at the bottom
		//so handleSubmit is a property from reduxForm
		const { handleSubmit } = this.props

		return(
			//handleSubmit takes a function that we define 
			// .bind(this) binds to our component
			// we do this because we are passing onSubmit as a callback to handleSubmit. Therefore context will be lost
			<form onSubmit= {handleSubmit(this.onSubmit.bind(this))}>
				<Field
					//any property in here gets passed to renderField
					label='Title'
					/*name is what piece of state the user is editing */
					//we want the name to match the property on the errors object
					name='title' 
					/*component takes in a function/ other component that will be used to display this Field Component*/
					/*Also, we don't add () to call the function, because the Field component will call it later*/
					component= {this.renderField}
				/>

				<Field
					label='Categories'
					name='categories'
					component={this.renderField}
				/>

				<Field
					label='Post Content'
					name='content'
					component={this.renderField}
				/>
				
				<button type= 'submit' className='btn btn-primary'>Submit</button>
				<Link className='btn btn-danger back-button' to='/'>Back</Link>
			</form>
		)
	}
}

//reduxFrom handles validation for us
function validate(values){
	const errors = {}

	// console.log(values) ---> {title: "osfss" , categories: "sfmsmf", content: "jsfsf"}

	// if the user submits the form and there are no errors, meaning all the fields are properly filled,
	// then an empty errors object will be returned from this function

	//if there is an error/ the object has any properties, the errors object will be returned with respective errors inside
	//and redux form assumes the form is invalid

	if(!values.title){
		//we want each error property to match it's respective name property in the field object
		//the name property is what connects to our validate function
		//if they are matching, then the respective error is passed to the renderField function, for that Field
		errors.title = 'enter a title'
	}
	if(!values.categories){
		errors.categories = 'enter a category'
	}
	if(!values.content){
		errors.content = 'enter content bitch'
	}

	return errors
}


// helper that allows redux form to communicate directly from the component to the reducer we've already set up (formReducer? )
// wires up reduxForm to this component
export default reduxForm({
	//key form reporesents name of the form
	//make sure string is unique
	form: 'PostsNewForm',
	validate: validate
})(
	connect(null, {createPost})(PostsNew)
)
//we pass in the component