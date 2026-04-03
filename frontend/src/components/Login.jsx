import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});
	const [successMessage, setSuccessMessage] = useState('');

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		
		// Show success message
		setSuccessMessage('✅ Login successful!');
		
		// Clear form
		setFormData({
			email: '',
			password: ''
		});
		
		console.log('Login data:', formData);
		
		// Hide message after 2 seconds
		setTimeout(() => {
			setSuccessMessage('');
		}, 2000);
	};

	return (
		<div className="login-container">
			<div className="login-box">
				<h2>Login</h2>
				
				{successMessage && (
					<div className="success-message">
						{successMessage}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="input-group">
						<label>Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Enter your email"
							required
						/>
					</div>
					<div className="input-group">
						<label>Password</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Enter your password"
							required
						/>
					</div>
					<button type="submit" className="login-btn">Login</button>
				</form>
				<p className="signup-link">
					Don&apos;t have an account? <Link to="/signup">Sign up</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
