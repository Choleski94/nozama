import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

import { signup } from '@store/actions/auth';
import { validateEmail } from '@utils/validate';
import formatMessage from '@utils/formatMessage';
import { withGuestRouter, withBrowserDetect } from '@utils/hocs';
import { AuthBranding, Input, Layout, BlockMessage } from '@components';

const errorCode = '';

const SignUpPage = ({ browser, version, OS, language, ...rest }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [ errors, setErrors ] = React.useState({});
	const [ loading, setLoading ] = React.useState(false);
	const [ browserInfo, setBrowserInfo ] = React.useState({});
	const [ searchParams, setSearchParams ] = useSearchParams();
	const [ data, setData ] = React.useState({
		email: '', inviteCode: '',
		firstName: '', lastName: '',
		password: '', passwordC: '',
	});

	React.useEffect(() => {
		const inviteCode = searchParams.get('code') || '';

		if (inviteCode && inviteCode.length) {
			setData({ ...data, inviteCode });
		}

		setBrowserInfo({
			browser, version, OS, language
		});
	}, []);

	const errorMessages = {
		empty: formatMessage('form.validation.empty.error.text'),
		email: formatMessage('form.validation.email.error.text'),
		password: formatMessage('form.validation.password.error.text'),
		lastName: formatMessage('form.validation.last-name.error.text'),
		firstName: formatMessage('form.validation.first-name.error.text'),
		passwordC: formatMessage('form.validation.password-confirm.error.text'),
	};

	 const validate = (data = {}, ignoreKeys = []) => {
		const errs = {};

		// Check for empty input(s).
		Object.keys(data).map(inputSlug => {
			if (!ignoreKeys.includes(inputSlug) && !data[inputSlug].length) {
				errs[inputSlug] = errorMessages.empty;
			}
		});

		// Verify first name.
		if (data.firstName && !data.firstName.match(/^[a-zA-Z-'. ]+$/)) {
			errs.firstName = errorMessages.firstName;
		}

		// Verify last name.
		if (data.lastName && !data.lastName.match(/^[a-zA-Z-'. ]+$/)) {
			errs.lastName = errorMessages.lastName;
		}

		// Verify email.
		if (data.email && !validateEmail(data.email)) {
			errs.email = errorMessages.email;
		}

		// Verify password.
		if (data.password && data.password.length < 7) {
			errs.password = errorMessages.password;
		}

		if (data.passwordC && data.passwordC !== data.password) {
			errs.passwordC = errorMessages.passwordC;
		}

		return errs;
	};

	const onChange = (e) => setData({
		...data, [e.target.name]: e.target.value
	});

	const onSubmit = (e) => {
		e.preventDefault();

		console.log(data);

		// Check if we have error(s).
		const errs = validate(data, ['OS', 'browser', 'language']);

		setErrors(errs);

		if (Object.keys(errs).length) return null;

		dispatch(signup(data)).then((res) => (
			navigate('/dashboard')
		));
	};

	console.log('MA DATA:::', searchParams.get('code'));

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
							{errorCode && (
								<BlockMessage
									type="error"
									text={formatMessage(`error.${errorCode}.text`)}
								/>
							)} 
							<form className="js-validate needs-validation" noValidate>
								<div className="text-center">
									<div className="mb-5">
										<h1 className="display-5">
											{formatMessage('page.signup.header.text')}
										</h1>
										<p>
											{formatMessage('page.signup.has-account.text')}
											&nbsp;
											<Link to="/signin" className="switcher-text2 link inline-text">
												{formatMessage('page.signup.form.link.signin.text')}
											</Link>
										</p>
									</div>
									{/*
									<div className="d-grid mb-4">
										<a
											className="btn btn-white btn-lg"
											href="authentication-signup-cover.html#"
										>
											<span className="d-flex justify-content-center align-items-center">
												<img
													className="avatar avatar-xss me-2"
													src="assets/svg/brands/google-icon.svg"
													alt="Image Description"
												/>
												{formatMessage('page.signup.form.btn.signup-google.text')}
											</span>
										</a>
									</div>
									<span className="divider-center text-muted mb-4">
										{formatMessage('page.signup.label.or.text')}
									</span>
									*/}
								</div>
								<label className="form-label" htmlFor="fullNameSrEmail">
									{formatMessage('page.signup.form.full-name.text')}
								</label>
								<div className="row">
									<div className="col-sm-6">
										<div className="mb-4">
											<Input
												type="text"
												id="firstName"
												name="firstName"
												onChange={onChange}
												value={data?.firstName}
												error={errors?.firstName}
												placeholder={formatMessage('page.signup.form.first-name.text')}
											/>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="mb-4">
											<Input
												type="text"
												id="lastName"
												name="lastName"
												onChange={onChange}
												value={data?.lastName}
												error={errors?.lastName}
												placeholder={formatMessage('page.signup.form.last-name.text')}
											/>
										</div>
									</div>
								</div>
								<div className="mb-4">
									<Input
										id="email"
										type="email"
										name="email"
										onChange={onChange}
										value={data?.email}
										error={errors?.email}
										label={formatMessage('page.signup.label.email.text')}
										placeholder={formatMessage('page.signup.form.email.text')}
									/>
								</div>
								<div className="mb-4">
									<Input
										id="password"
										type="password"
										name="password"
										onChange={onChange}
										value={data?.password}
										error={errors?.password}
										label={formatMessage('page.signup.label.password.text')}
										placeholder={formatMessage('page.signup.form.password.text')}
									/>
								</div>
								<div className="mb-4">
									<Input
										id="passwordC"
										type="password"
										name="passwordC"
										onChange={onChange}
										value={data?.passwordC}
										error={errors?.passwordC}
										label={formatMessage('page.signup.label.password-confirm.text')}
										placeholder={formatMessage('page.signup.form.repeat-password.text')}
									/>
								</div>
								<div className="mb-4">
									{formatMessage('page.signup.form.terms-privacy.text', {
										terms: (
											<Link 	target="_blank" 
												className="link" 
												rel="noopener noreferrer"
												to="https://www.tigado.ca/terms" 
											>
												{formatMessage('page.signup.link.terms.text')}
											</Link>
										),
										privacy: (
											<Link 	target="_blank" 
												className="link" 
												rel="noopener noreferrer"
												to="https://www.tigado.ca/privacy" 
											>
												{formatMessage('page.signup.link.privacy.text')}
											</Link>
										)
									})}
								</div>
								<div className="d-grid gap-2">
									<button type="submit" className="btn btn-primary btn-lg" onClick={onSubmit}>
										{formatMessage('page.signup.form.btn.signup.text')}
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

export default withGuestRouter(withBrowserDetect(SignUpPage));
