import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../store/actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
	useEffect(() => {
		getGithubRepos(username);
	}, [getGithubRepos, username]);
	return (
		<div className='profile-github'>
			<h2 className='text-primary my-1'>Github Repos</h2>

			{repos == null ? (
				<Spinner />
			) : repos.length > 0 ? (
				repos.map((repo, index) => (
					<div key={repo.id} className='rep bg-white p-1 my-1'>
						<div>
							<h4>
								<a
									href={repo.html_url}
									target='_blank'
									rel='noopener noreferrer'
								>
									{repo.name}
								</a>
							</h4>
							<p>{repo.decription}</p>
						</div>
						{/* <div>
							<ul>
								<li className='badge badge-primary'>
									Stars: {repo.stargazers_count}
								</li>
								<li className='badge badge-dark'>
									Watchers: {repo.watchers_count}
								</li>
								<li className='badge badge-light'>Forks: {repo.forks_count}</li>
							</ul>
						</div> */}
					</div>
				))
			) : (
				<h4>
					{' '}
					Either you have entered a wrong Github username or there are no
					Repositories
				</h4>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	repos: state.profile.repos,
});

ProfileGithub.propTypes = {
	username: PropTypes.string.isRequired,
	getGithubRepos: PropTypes.func.isRequired,
	repos: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
