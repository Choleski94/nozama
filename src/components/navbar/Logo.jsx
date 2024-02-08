import { Link } from 'react-router-dom';

import logo from '../../static/images/nozama-white-logo.png';

const Logo = () => (
	<div className="nozama-logo">
		<Link to="/" className="text-white">
			<img src={logo} alt="nozama-logo" className="img-fluid" />
		</Link>
	</div>
);

export default Logo;
