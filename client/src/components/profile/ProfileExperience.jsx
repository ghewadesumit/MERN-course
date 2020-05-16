import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
	experience: { company, title, location, current, to, from, description },
}) => (
	<div>
		<h3 className='text-dark'>{company}</h3>
		<p>
			<Moment format='MMM YYYY'>{from}</Moment> -{' '}
			{to == null ? 'Present' : <Moment format='MMM YYYY'>{to}</Moment>} -{' '}
			{to == null ? (
				<Moment fromNow ago>
					{from}
				</Moment>
			) : (
				<Moment to={to} ago>
					{from}
				</Moment>
			)}
		</p>
		<p>
			<strong>Position:</strong>
			{title}
		</p>
		<p>
			<strong>Description:</strong>
			{description}
		</p>
	</div>
);
ProfileExperience.propTypes = {
	experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
