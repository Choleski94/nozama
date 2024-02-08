import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

import { signin } from '@store/actions/auth';
import { validateEmail } from '@utils/validate';
import formatMessage from '@utils/formatMessage';
import { AuthBranding, Input, Layout, Forms } from '@components';
import { withGuestRouter, withBrowserDetect } from '@utils/hocs';

const SignInPage = ({ browser, version, OS, language }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [ data, setData ] = React.useState({});
	const [ errors, setErrors ] = React.useState({});
	const [ browserInfo, setBrowserInfo ] = React.useState({});

	React.useEffect(() => setBrowserInfo({
		browser, version, OS, language
	}), []);

	const errorMessages = {
		empty: formatMessage('form.validation.empty.error.text'),
		email: formatMessage('form.validation.email.error.text')
	};

	const validate = (data = {}, ignoreKeys = []) => {
		const errs = {};

		// Check for empty input(s).
		Object.keys(data).map(inputSlug => {
			if (!ignoreKeys.includes(inputSlug) && !data[inputSlug].length) {
				errs[inputSlug] = errorMessages.empty;
			}
		});

		// Check for empty email.
		if (!data?.email) {
			errs.email = errorMessages.empty;
		}

		// Check for empty password.
		if (!data?.password) {
			errs.password = errorMessages.empty;
		}

		// Verify Email.
		if (data.email && !validateEmail(data.email)) {
			errs.email = errorMessages.email;
		}

		return errs;
	};

	const onChange = (e) => setData({
		...data, [e.target?.name]: (
			(e.target.type === 'checkbox') ? 
			e.target.checked : e.target.value
		)
	});

	const onSubmit = (e) => {
		e.preventDefault();

		// Check if we have error(s).
		const errs = validate(data, ['OS', 'browser', 'language']);

		setErrors(errs);

		if (Object.keys(errs).length) return null;

		dispatch(signin(data)).then((res) => (
			navigate('/dashboard')
		));
	};

	return (
		<Layout type="auth">
			<div className="container-fluid px-3">
				<div className="row">
					<div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center min-vh-lg-100 position-relative bg-light px-0">
						<AuthBranding />
					</div>
					<div className="col-lg-6 d-flex justify-content-center align-items-center min-vh-lg-100">
						<div
							className="w-100 content-space-t-4 content-space-t-lg-2 content-space-b-1"
							style={{ maxWidth: "25rem" }}
						>
							<form className="js-validate needs-validation" method="post" onSubmit={onSubmit}>
								<div className="text-center">
									<div className="mb-5">
										<h1 className="display-5">
											{formatMessage('page.signin.header.text')}
										</h1>
										<p>
											{formatMessage('page.signin.no-account.text')}
											&nbsp;
											<Link to="/signup" className="link">
												{formatMessage('page.signin.form.link.signup.text')}
											</Link>
										</p>
									</div>
									{/*
									<div className="d-grid mb-4">
										<a
											className="btn btn-white btn-lg"
											href="authentication-signin-cover.html#"
										>
											<span className="d-flex justify-content-center align-items-center">
												<img
													className="avatar avatar-xss me-2"
													src="assets/svg/brands/google-icon.svg"
													alt="Image Description"
												/>
												{formatMessage('page.signin.form.btn.signin-google.text')}
											</span>
										</a>
									</div>
									<span className="divider-center text-muted mb-4">
										{formatMessage('page.signin.label.or.text')}
									</span>
									*/}
								</div>
								<div className="mb-4">
									<Input
										id="email"
										type="email"
										name="email"
										onChange={onChange}
										error={errors?.email}
										value={data?.email}
										label={formatMessage('page.signin.label.email.text')}
										placeholder={formatMessage('page.signin.form.email.text')}
									/>
								</div>
								<div className="mb-4">
									<Input
										id="password"
										name="password"
										type="password"
										onChange={onChange}
										error={errors?.password}
										value={data?.password}
										placeholder={formatMessage('page.signin.form.password.text')}
										label={(
											<span className="d-flex justify-content-between align-items-center">
												<span>
													{formatMessage('page.signin.label.password.text')}
												</span>
												<Link to="/forgot_password" className="form-label-link mb-0">
													{formatMessage('page.signin.form.link.forgot.text')}
												</Link>
											</span>
										)}
									/>
								</div>
								{/*
								<Input
									id="remember"
									name="remember"
									type="checkbox"
									onChange={onChange}
									value={data?.remember}
									className="form-check-input"
									label={formatMessage('page.signin.form.remember.text')}
								/>
								*/}
								<div className="d-grid mt-3">
									<button type="submit" className="btn btn-primary btn-lg" onClick={onSubmit}>
										{formatMessage('page.signin.form.btn.signin.text')}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default withGuestRouter(withBrowserDetect(SignInPage));
