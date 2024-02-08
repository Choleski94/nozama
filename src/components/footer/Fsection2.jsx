import React from 'react';
import { Link } from 'react-router-dom';


const FootersectionTwo = () => {

	const currentYear = React.useMemo(() => (
		new Date().getFullYear()
	), []);

	return(
		<div className="nozama-footer-section-two py-3">
			<div className="text-center">
				<Link className="px-2">Conditions of Use & Sale</Link>
				<Link className="px-2">Privacy Notice</Link>
				<Link className="px-2">Interest-Based Ads</Link>
				<br />
				<small>© 1996-{currentYear}, Nozama.com, Inc. or its affiliates</small>
			</div>
		</div>
	)
}

export default FootersectionTwo;
