import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addComment } from '../../store/actions/post';

const CommentForm = ({ addComment, postId }) => {
	const [text, setText] = useState('');
	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Leave A Comment</h3>
			</div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addComment(postId, { text });
					setText('');
				}}
				className='form my-1'
			>
				<textarea
					name='text'
					cols='30'
					rows='5'
					value={text}
					placeholder='Comment on this post'
					onChange={(e) => setText(e.target.value)}
					required
				></textarea>
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>
		</div>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
