import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../store/actions/profile';

const Experience = ({ experience, deleteExperience }) => {
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className='hide-sm'>{exp.location}</td>
			<td className='hide-sm'>
				<Moment format='MMM YYYY'>{exp.from}</Moment> -{' '}
				{exp.to == null ? (
					'Present'
				) : (
					<Moment format='MMM YYYY'>{exp.to}</Moment>
				)}{' '}
				-{' '}
				{exp.to == null ? (
					<Moment fromNow ago>
						{exp.from}
					</Moment>
				) : (
					<Moment to={exp.to} ago>
						{exp.from}
					</Moment>
				)}
			</td>
			<td>
				<button
					onClick={() => deleteExperience(exp._id)}
					className='btn btn-danger'
				>
					Delete
				</button>
			</td>
		</tr>
	));
	return (
		<Fragment>
			<h2 className='my-2'>Experience Credentials</h2>
			<table className='table'>
				<thead>
					<tr>
						<th className='hide-sm'>Company</th>
						<th className='hide-sm'>Title</th>
						<th className='hide-sm'>Years</th>
						<th />
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
