import { Link } from 'react-router-dom';

const ReturnsOrders = () => (
	<Link to="/account/orders" style={{ textDecoration: "none" }}>
		<div className="nozama-returns-order px-3 text-white">
			<span>Return</span>
			<h5>& Orders</h5>
		</div>
	</Link>
);

export default ReturnsOrders;
