import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../store/actions/profile';

const AddEducation = ({ addEducation, history }) => {
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		from: '',
		fieldofstudy: '',
		to: '',
		current: false,
		description: '',
	});

	const {
		school,
		degree,
		from,
		fieldofstudy,
		to,
		current,
		description,
	} = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCheckBox = () => {
		setFormData({ ...formData, current: !current });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addEducation(formData, history);
	};
	return (
		<Fragment>
			<h1 className='large text-primary'>Add An Experience</h1>
			<p className='lead'>
				<i className='fas fa-code-branch'></i> Add any developer/programming
				positions that you have had in the past
			</p>
			<small>* = required field</small>
			<form onSubmit={(e) => onSubmit(e)} className='form'>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* School'
						name='school'
						value={school}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='* Degree'
						name='degree'
						value={degree}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Field of Study'
						name='fieldofstudy'
						value={fieldofstudy}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<h4>From Date</h4>
					<input
						type='date'
						name='from'
						value={from}
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							value={current}
							onChange={(e) => handleCheckBox()}
						/>{' '}
						Current Job
					</p>
				</div>
				{!current && (
					<div className='form-group'>
						<h4>To Date</h4>
						<input
							type='date'
							name='to'
							value={to}
							onChange={(e) => onChange(e)}
						/>
					</div>
				)}
				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Job Description'
						value={description}
						onChange={(e) => onChange(e)}
					></textarea>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
				<a className='btn btn-light my-1' href='dashboard.html'>
					Go Back
				</a>
			</form>
		</Fragment>
	);
};

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
