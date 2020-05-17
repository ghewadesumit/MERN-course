import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../store/actions/post';
import CommentForm from './CommentForm';
import Spinner from '../layout/Spinner';
import CommentItems from './CommentItems';
import PropTypes from 'prop-types';

const PostComments = ({ getPost, post: { post, loading }, match }) => {
	useEffect(() => {
		getPost(match.params.id);
	}, [getPost, match]);
	return (
		<Fragment>
			<Link to='/posts' className='btn'>
				Back To Posts
			</Link>

			{loading || post === null ? (
				<Spinner />
			) : (
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
						</div>
					</div>
					<CommentForm postId={match.params.id} />
					<div className='comments'>
						<CommentItems postId={match.params.id} />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	post: state.post,
});
PostComments.propTypes = {
	getPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getPost })(PostComments);
