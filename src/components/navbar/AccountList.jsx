import { Link } from 'react-router-dom';

const AccountList = () => (
	<Link to="/signin" style={{ textDecoration: "none" }}>
		<div className="nozama-account-list text-white">
			<span>Hello, sign in</span>
			<h5>Account & Lists</h5>
		</div>
	</Link>
)

export default AccountList;
