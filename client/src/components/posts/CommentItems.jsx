import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { deleteComment } from '../../store/actions/post';

const CommentItems = ({
	post: {
		post: { user, comments },
	},
	auth: {
		loading,
		user: { _id },
	},
	postId,
	deleteComment,
}) => {
	return comments.length > 0 ? (
		comments.map((comment) => (
			<Fragment key={comment._id}>
				<div className='post bg-white p-1 my-1'>
					<div>
						<a href='profile.html'>
							<img className='round-img' src={comment.avatar} alt='' />
							<h4>{comment.name}</h4>
						</a>
					</div>
					<div>
						<p className='my-1'>{comment.text}</p>
						<p className='post-date'>
							Posted on{' '}
							<Moment format='MMM YYYY' ago>
								{comment.date}
							</Moment>
						</p>
						{!loading && _id === comment.user && (
							<button
								type='button'
								onClick={() => deleteComment(postId, comment._id)}
								className='btn btn-danger'
							>
								<i class='fas fa-times'></i>
							</button>
						)}
					</div>
				</div>
			</Fragment>
		))
	) : (
		<div>
			{' '}
			<h3>No Comments yet</h3>
			<h4> Be the First one to add comment</h4>
		</div>
	);
};

const mapStateToProps = (state) => ({
	post: state.post,
	auth: state.auth,
});

CommentItems.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteComment: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { deleteComment })(CommentItems);
