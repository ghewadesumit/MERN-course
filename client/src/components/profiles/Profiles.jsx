import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../store/actions/profile';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getProfiles();
	}, [getProfiles]);
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className='large text-primary'>Developers</h1>
					<p className='lead'>
						<i class='fab fa-connectdevelop'></i> Browse and connect with
						Developers
					</p>
					<div class='profiles'>
						{profiles.length > 0 ? (
							profiles.map((profile) => (
								<ProfileItem key={profile._id} profile={profile} />
							))
						) : (
							<h4> No profiles found</h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});
Profiles.propTypes = {
	profile: PropTypes.object.isRequired,
	getProfiles: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
