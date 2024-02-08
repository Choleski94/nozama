import { Link } from 'react-router-dom';

import './auth.css';

import logo from '../../static/images/nozama-logo.png';

import { AuthFooter } from './AuthFooter';

const Signin = () => {
	document.body.style.backgroundColor = '#ffff';

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
						<h3>Sign in</h3>
						<form action="" className="mt-3">
							<label htmlFor="email" className="noz-label">
								Email or mobile phone number
							</label>
							<input type="email" id="email" className="noz-input" />
							<div className="d-grid mt-3">
								<button className="py-1 nozama-btn noz-btn-primary">Continue</button>
							</div>
						</form>
						<div className="mt-3 t-c">
							<span>
								By continuing, you agree to Nozama's <Link to="">Conditions of Use</Link> and <Link to="">Privacy Notice</Link>.
							</span>
						</div>
						<div className="mt-3 noz-need-help">
							<span>
								<Link to="">Need help?</Link>
							</span>
						</div>
					</div>
					<div className="mt-3 text-center noz-new-account">
						<div className="d-flex justify-content-between align-items-center">
							<div className="border-top" style={{width:"7rem"}}></div>
							<span className="text-muted">New to Nozama?</span>
							<div className="border-top" style={{width:"7rem"}}></div>
						</div>
						<div className="d-grid mt-2">
							<Link to="/ap/register" className="py-1 nozama-btn noz-btn-secondary">Create your Nozama account</Link>
						</div>
					</div>
				</div>
			</div>
			<AuthFooter />
		</>
	)
}

export default Signin;
