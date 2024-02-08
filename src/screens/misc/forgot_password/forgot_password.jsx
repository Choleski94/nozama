import React from 'react';
import { Link } from 'react-router-dom';

import api from '@api';
import { validateEmail } from '@utils/validate';
import formatMessage from '@utils/formatMessage';
import { withGuestRouter, withBrowserDetect } from '@utils/hocs';
import { AuthBranding, Input, Layout, BlockMessage } from '@components';

const ForgotPasswordPage = ({ browser, version, OS, language }) => {

	const [ data, setData ] = React.useState({});
	const [ errors, setErrors ] = React.useState({});
	const [ loading, setLoading ] = React.useState(false);
	const [ errorCode, setErrorCode ] = React.useState('');
	const [ successCode, setSuccessCode ] = React.useState('');
	const [ browserInfo, setBrowserInfo ] = React.useState({});

	React.useEffect(() => {
		setBrowserInfo({ browser, version, OS, language });
	}, []);

	const errorMessages = {
		empty: formatMessage('form.validation.empty.error.text'),
		email: formatMessage('form.validation.email.error.text')
	};

	const messageType = React.useMemo(() => (
		errorCode ? 'error' : 'success'
	), [errorCode]);

	const validate = data => {
		const errs = {};
		// Check for empty input(s).
		if (!data.email) {
			errs.email = errorMessages.empty;
		}

		// Verify Email.
		if (data.email && !validateEmail(data.email)) {
			errs.email = errorMessages.email;
		}

		return errs;
	}

	const onChange = (e) => setData({
		...data,
		[e.target.name]: (e.target.type === 'checkbox') ? e.target.checked : e.target.value
	});

	const onSubmit = (e) => {
		e.preventDefault();

		// Check if we have error(s).
		const errs = validate(data);
		setErrors(errs);

		if (Object.keys(errs).length) return null;

		setLoading(true);
		api.user.resetPassword(data).then(({ reason }) => {
			setLoading(false);
			setSuccessCode(reason);
			// Redirect user to secure app.
			// router.push({ pathname: '/secure' });
		}).catch(({ response: { data } }) => {
			setLoading(false);
			setErrorCode(data.reason);
		});
	};

	return (
		<>
			{/*
			<Head>
				<title>
					{formatMessage('meta.forgot_password.title.text')}
				</title>
			</Head>
			*/}
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
								{(errorCode || successCode) && (
									<BlockMessage
										type={messageType}
										text={formatMessage([messageType, errorCode || successCode, 'text'].join('.'))}
									/>
								)}
								<form className="js-validate needs-validation" method="post" onSubmit={onSubmit}>
									<div className="text-center">
										<div className="mb-5">
											<h1 className="display-5">
												{formatMessage('page.forgot_password.header.text')}
											</h1>
											<p>
												{formatMessage('page.forgot_password.paragraph.text')}
											</p>
										</div>
									</div>
									<div className="mb-4">
										<label className="form-label" htmlFor="email">
											{formatMessage('page.forgot_password.label.email.text')}
										</label>
										<Input
											id="email"
											type="email"
											name="email"
											value={data?.email}
											onChange={onChange}
											error={errors?.email}
											placeholder={formatMessage('page.forgot_password.form.email.text')}
										/>
									</div>
									<div className="d-grid gap-2">
										<button type="submit" className="btn btn-primary btn-lg" onClick={onSubmit}>
											{formatMessage('page.forgot_password.form.btn.recover.text')}
										</button>
										<div className="text-center">
											<Link
												to="/signup"
												className="btn btn-link"
											>
												<i className="bi-chevron-left" />
												&nbsp;
												{formatMessage('page.forgot_password.has-account.text')}
											</Link>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default withGuestRouter(withBrowserDetect(ForgotPasswordPage));
