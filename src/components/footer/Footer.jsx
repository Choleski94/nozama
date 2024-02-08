import BacktoTop from './Backtotop';
import FootersectionOne from './Fsection1';
import FootersectionTwo from './Fsection2';

import './footer.css';

const Footer = () => (
	<footer className="nozama-footer text-white mt-5">
		<BacktoTop />
		<FootersectionOne />
		<FootersectionTwo />
	</footer>
);

export default Footer;
