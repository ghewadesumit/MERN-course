import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const PostItems = ({ post, auth: { loading, user } }) => {
	return (
		<Fragment>
			<div class='post bg-white p-1 my-1'>
				<div>
					<Link to='/profile'>
						<img class='round-img' src={post.avatar} alt='' />
						<h4>{post.name}</h4>
					</Link>
				</div>

				<div>
					<p class='my-1'>{post.text}</p>
					<p class='post-date'>
						<Moment format='MMM YYYY' ago>
							{post.date}
						</Moment>
					</p>
					<button type='button' class='btn btn-light'>
						<i class='fas fa-thumbs-up'></i>{' '}
						{post.likes.length > 0 && <span>{post.likes.length}</span>}
					</button>
					<button type='button' class='btn btn-light'>
						<i class='fas fa-thumbs-down'></i>
					</button>
					<Link to={`/post/${post._id}`} class='btn btn-primary'>
						Discussion{' '}
						{post.comments.length > 0 && (
							<span class='comment-count'>{post.comments.length}</span>
						)}
					</Link>
					{!loading && post.user === user._id && (
						<button type='button' class='btn btn-danger'>
							<i class='fas fa-times'></i>
						</button>
					)}
				</div>
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

PostItems.propTypes = {
	post: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(PostItems);
