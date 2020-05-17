import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getPost } from '../../store/actions/post';
import PropTypes from 'prop-types';

const PostComments = ({ getPost, post, match }) => {
	useEffect(() => {
		// console.log('id is', match.params.id);
		getPost(match.params.id);
	}, [getPost, match]);
	return (
		<Fragment>
			<Link to='/posts' className='btn'>
				Back To Posts
			</Link>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	post: state.post,
});
PostComments.propTypes = {
	getPost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getPost })(PostComments);
