import React, { Fragment, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
// import Moment from 'react-moment';
import PostItems from './PostItems';
import PostForm from './PostForm';
import { getPosts } from '../../store/actions/post';

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return loading && posts.length <= 0 ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Posts</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome to the community!
			</p>
			<PostForm></PostForm>
			<div className='posts'>
				{posts.map((post) => (
					<PostItems key={post._id} post={post} />
				))}
			</div>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	post: state.post,
});

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getPosts })(Posts);
