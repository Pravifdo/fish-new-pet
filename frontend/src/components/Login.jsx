import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const Login = () => {
	const [userType, setUserType] = useState(null); // 'customer' or 'business'
	
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

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await axios.post('http://localhost:5000/login', {
				...formData,
				userType
			});

			const { token, user } = response.data;

			// Save token and user data to localStorage
			localStorage.setItem('token', token);
			localStorage.setItem('user', JSON.stringify(user));

			setSuccessMessage(`✅ ${userType.toUpperCase()} login successful!`);

			// Clear form
			setFormData({
				email: '',
				password: ''
			});

			// Redirect or perform additional actions
			setTimeout(() => {
				setSuccessMessage('');
			}, 2000);
		} catch (error) {
			console.error('Login error:', error.response?.data?.message || error.message);
			alert(error.response?.data?.message || 'Login failed. Please try again.');
		}
	};

	if (!userType) {
		return (
			<div className="login-container">
				<div className="type-selection-box">
					<h2>Welcome Back</h2>
					<p className="type-subtitle">Select your login type</p>
					
					<div className="button-group">
						<button 
							className="type-btn customer-btn"
							onClick={() => setUserType('customer')}
						>
							<span className="btn-icon">👤</span>
							<span className="btn-text">Customer Login</span>
							<span className="btn-desc">Buy products</span>
						</button>
						
						<button 
							className="type-btn business-btn"
							onClick={() => setUserType('business')}
						>
							<span className="btn-icon">🏪</span>
							<span className="btn-text">Business Login</span>
							<span className="btn-desc">Manage store</span>
						</button>
					</div>

					<p className="login-redirect">
						Don&apos;t have an account? <Link to="/signup">Sign up</Link>
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="login-container">
			<div className="login-box">
				<button className="back-btn" onClick={() => setUserType(null)}>← Back</button>
				<h2>{userType.charAt(0).toUpperCase() + userType.slice(1)} Login</h2>
				
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
