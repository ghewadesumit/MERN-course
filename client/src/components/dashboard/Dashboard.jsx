import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCurrentProfile, deleteProfile } from '../../store/actions/profile';

import Spinner from '../layout/Spinner';
import Experience from './Experience';
import Education from './Education';
import DashboardAction from './DashboardAction';

const Dashboard = ({
	profile: { profile, loading, isModal },
	auth: { user },
	getCurrentProfile,
	deleteProfile,
	history,
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, [getCurrentProfile]);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>
					<DashboardAction />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
					<div className='my-2'>
						<button
							onClick={() => deleteProfile(history)}
							className='btn btn-danger'
						>
							<i className='fas fa-user-minus'>Delete My Account</i>
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>
						You haven't set your profile yet please share your information here
					</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						{' '}
						Click me
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
	auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteProfile })(
	Dashboard
);
