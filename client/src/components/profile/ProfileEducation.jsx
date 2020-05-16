import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({
	education: { school, fieldofstudy, degree, current, to, from, description },
}) => (
	<div>
		<h3 className='text-dark'>{school}</h3>
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
			<strong>Degree:</strong>
			{degree}
		</p>
		<p>
			<strong>Field of Study:</strong>
			{fieldofstudy}
		</p>
		<p>
			<strong>Description:</strong>
			{description}
		</p>
	</div>
);

ProfileEducation.propTypes = {
	education: PropTypes.object.isRequired,
};

export default ProfileEducation;
