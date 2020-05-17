import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPost } from '../../store/actions/post';

const PostForm = ({ addPost }) => {
	const [text, setText] = useState('');
	return (
		<Fragment>
			<div className='post-form'>
				<div className='bg-primary p'>
					<h3>Say Something...</h3>
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						console.log(text);
						addPost({ text });
						setText('');
					}}
					className='form my-1'
				>
					<textarea
						name='text'
						cols='30'
						rows='5'
						value={text}
						onChange={(e) => setText(e.target.value)}
						placeholder='Create a post'
						required
					></textarea>
					<input type='submit' className='btn btn-dark my-1' value='Submit' />
				</form>
			</div>
		</Fragment>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
