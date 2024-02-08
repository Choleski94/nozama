import { Link } from 'react-router-dom';

import logo from '../../static/images/nozama-logo.png';
import './auth.css';

import { AuthFooter } from './AuthFooter';

const Signup = () => {
	document.body.style.backgroundColor ="#ffff";
	return(
		<>
			<div className="shadow-sm pb-4 border-bottom">
				<div className="nozama-auth mx-auto mt-1">
					<div className="text-center nozama-logo-auth">
						<Link to="/" style={{textDecoration:"none"}}>
							<img src={logo} alt="nozama-logo" className="img-fluid" />
						</Link>
					</div>
					<div className="auth-form border p-4">
						<h3>Create Account</h3>
						<form action="" className="mt-3">
								<div>
								<label htmlFor="fullname" className="noz-label">
									Your name
								</label>
								<input type="text" id="fullname" className="noz-input" placeholder="First and last name" />
							</div>
							<div className="mt-2">
								<label htmlFor="email" className="noz-label">
									Email
								</label>
								<input type="email" id="email" className="noz-input" placeholder="Email Address" />
							</div>
							<div className="mt-2">
								<label htmlFor="password" className="noz-label">
									Password
								</label>
								<input type="password" id="password" className="noz-input" placeholder="At least 6 chartcters" />
								<span className="noz-help-text">
									Passwords must be at least 6 characters.
								</span>
							</div>
							<div className="mt-4 noz-help-text">
								By enrolling your mobile phone number, you consent to receive automated security notifications via 
								text message from Nozama. Message and data rates may apply.
							</div>
							<div className="d-grid mt-3">
								<button className="py-1 nozama-btn noz-btn-primary">
									Continue
								</button>
							</div>
						</form>
						<div className="mt-3 t-c">
							<span>
								Already have an account? <Link to="/ap/signin">Sign in</Link>
							</span>
							<br />
							<span>
								Buying for work? <Link to="/ap/signin">Create a free business account</Link>
							</span>
						</div>
						<div className="mt-3 t-c">
							<span>
								By creating an account or logging in, you agree to Nozama’s <Link to="">Conditions of Use</Link> and <Link to="">Privacy Policy</Link>.
							</span>
						</div>
					</div>
				</div>
			</div>
			<AuthFooter />
		</>
	)
}

export default Signup;
