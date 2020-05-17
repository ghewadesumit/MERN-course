import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../store/actions/post';

const PostItems = ({ addLike, removeLike, post, auth: { loading, user } }) => {
	return (
		<Fragment>
			<div className='post bg-white p-1 my-1'>
				<div>
					<Link to='/profile'>
						<img className='round-img' src={post.avatar} alt='' />
						<h4>{post.name}</h4>
					</Link>
				</div>

				<div>
					<p className='my-1'>{post.text}</p>
					<p className='post-date'>
						<Moment format='MMM YYYY' ago>
							{post.date}
						</Moment>
					</p>
					<button
						onClick={() => addLike(post._id)}
						type='button'
						className='btn btn-light'
					>
						<i className='fas fa-thumbs-up'></i>{' '}
						{post.likes.length > 0 && <span>{post.likes.length}</span>}
					</button>
					<button
						type='button'
						onClick={() => removeLike(post._id)}
						className='btn btn-light'
					>
						<i className='fas fa-thumbs-down'></i>
					</button>
					<Link to={`/post/${post._id}`} className='btn btn-primary'>
						Discussion{' '}
						{post.comments.length > 0 && (
							<span className='comment-count'>{post.comments.length}</span>
						)}
					</Link>
					{!loading && post.user === user._id && (
						<button type='button' className='btn btn-danger'>
							<i className='fas fa-times'></i>
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
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { addLike, removeLike })(PostItems);
