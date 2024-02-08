import Logo from './Logo';
import Cart from './Cart';
import SearchTab from './SearchTab';
import DeliverTo from './DeliverTo';
import AccountList from './AccountList';
import ReturnsOrders from './ReturnsOrders';
import CategorySection from './CategorySection';

import './navbar.css';

const Navbar = () => (
	<>
		<nav className="container-fluid nozama-nav py-2 px-3">
			<div className="d-flex align-items-center justify-content-between">
				<Logo />
				<DeliverTo />
				<SearchTab />
				<AccountList />
				<ReturnsOrders />
				<Cart />
			</div>
		</nav>
		<main className="nozama-category-section container-fluid py-2 text-white">
			<CategorySection />
		</main>
	</>
);

export default Navbar;
