import './account.css';

import Navbar from '@components/navbar/Navbar';
import Footer from '@components/footer/Footer';
import { AccountHome } from '@components/account/AccountHome';

const Account = () => {
	document.body.style.backgroundColor = '#ffff';

	return (
		<>
			<Navbar />
			<div className="noz-account p-3 mx-auto">
				<h3>Your Account</h3>
				<AccountHome />
			</div>
			<Footer />
		</>
	)
}

export default Account;
