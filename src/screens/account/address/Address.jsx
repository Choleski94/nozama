import { Link } from 'react-router-dom';

import '../account.css';

import Navbar from '@components/navbar/Navbar';
import Footer from '@components/footer/Footer';
import { AddressCards } from '@components/account/AddressHome';

const Address = () => (
	<>
		<Navbar />
		<div className="noz-address mt-4 mx-auto">
			<nav aria-label="breadcrumb">
				<ol className="breadcrumb">
					<li className="breadcrumb-item"><Link to="/account" className="noz-breadcrumb-link text-muted">Your Account</Link></li>
					<li className="breadcrumb-item noz-breadcrumb-active" aria-current="page">Your Addresses</li>
				</ol>
			</nav>
			<h3 className="h3">Your Addresses</h3>
			<div className="row mt-3">
				<div className="col-sm-4 mb-3 d-flex align-items-stretch" style={{cursor:"pointer"}} onClick={()=>{window.location = '/account/address/add' }}>
					<div className="noz-card-body p-3 card-body noz-add-address rounded text-center">
						<h3 className="h3 text-muted mt-5">
							<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#DDDDDD" className="bi bi-plus-lg" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
							</svg>
							<br />
							Add Address
						</h3>
					</div>
				</div>
				<AddressCards default={true} />
				<AddressCards />
				<AddressCards />
				<AddressCards />
				<AddressCards />
				<AddressCards />
				<AddressCards />
			</div>
		</div>
		<Footer />
	</>
);

export default Address;
