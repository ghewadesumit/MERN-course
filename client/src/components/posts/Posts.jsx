import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getPosts } from '../../store/actions/post';

const Posts = ({ getPosts, post: { posts, loading } }) => {
	useEffect(() => {
		getPosts();
	}, [getPosts]);

	return <div>posts</div>;
};

const mapStateToProps = (state) => ({
	post: state.post,
});

Posts.propTypes = {
	getPosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getPosts })(Posts);
