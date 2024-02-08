import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from '@components/navbar/Navbar';
import Footer from '@components/footer/Footer';
import { CartProductsCards } from '@components/cart/CartHome';
import { SponsoredProductsCard } from '@components/cart/CartHome';

import './cart.css';

import productimage1 from '../../static/images/518YtltCzzL._AC_AA180_.jpg';
import productimage2 from '../../static/images/61+infHNFDL._AC_AA180_.jpg';
import productimage3 from '../../static/images/61h2xBJt6qL._AC_AA180_.jpg';
import productimage4 from '../../static/images/61jMf1cjadL._AC_AA180_.jpg';
import productimage5 from '../../static/images/61fPT0y6UkL._AC_AA180_.jpg';
import productimage6 from '../../static/images/61QzpcWCSML._AC_SR200,200_.jpg';
import productimage7 from '../../static/images/61nZ-xKh8lL._AC_SR200,200_.jpg';
import productimage8 from '../../static/images/61ZuHMrKQFL._AC_SR200,200_.jpg';
import productimage9 from '../../static/images/71z7Ja91MhL._AC_SR200,200_.jpg';

const Cart = () => {
	const [ options, setOptions ] = React.useState([]);
	const [ loading, setLoading ] = React.useState(false);
	const [ isSelected, setIsSelected ] = React.useState(false);

	React.useEffect(() => {
		document.body.style.backgroundColor = '#E3E6E6';
	}, []);

	React.useEffect(() => {
		fetchCart();
	}, []);

	const fetchCart = () => {
		setLoading(true);

		setOptions([
			{
				title: '',
				price: '',
				inStock: '',
				description: '',
				img: productimage1,
			},
			{
				title: '',
				price: '',
				inStock: '',
				description: '',
				img: productimage2,
			},
			{
				title: '',
				price: '',
				inStock: '',
				description: '',
				img: productimage3,
			},
			{
				title: '',
				price: '',
				inStock: '',
				description: '',
				img: productimage4,
			},
			{
				title: '',
				price: '',
				inStock: '',
				description: '',
				img: productimage5,
			},
		]);

		setLoading(false);
	}

	const toggleSelect = () => {
		// setIsSelected(!isSelected)
	}

	return (
		<>  
			<Navbar />
			<div className="noz-cart mt-4 mx-4">
				<div className="row">
					<div className="col-sm-9">
						<div className="bg-white p-4 pb-5">
							<div className="noz-cart-header">
								<h3 className="medium-text">
									Shopping Cart
								</h3>
								<Link to="" className="noz-link" onClick={toggleSelect}>
									{isSelected ? 'Deselect' : 'Select'} all items
								</Link>
								<div className="float-end">
									<span className="noz-fs-14">
										Price
									</span>
								</div>
								<div className="border-bottom" />
							</div>

							{options && options.length ? (
								options.map((payload) => (
									<CartProductsCards { ...payload } />
								))
							) : null}

							<div className="noz-cart-total float-end">
								<h6>
									<span className="medium-text">
										Subtotal (5 items):
									</span>
									&nbsp;
									<span className="bold-text">
										$75.00
									</span>
								</h6>
							</div>
						</div>
					</div>
					<div className="col-sm-3">
						<div className="bg-white p-4">
							<h6>
								<span className="medium-text">
									Subtotal (5 items):
								</span>
								&nbsp;
								<span className="bold-text">
									$75.00
								</span>
							</h6>
							<input type="checkbox" checked />
							<label htmlFor="" className="noz-fs-11 normal-text px-2">
								This will be a gift Learn more
							</label>
							<div className="d-grid mt-3 text-center">
								<Link to="/checkout" className="noz-btn noz-link medium-text noz-fs-13 noz-btn-primary shadow-sm py-2" style={{backgroundColor:"#83b77d",border:"none",borderRadius:"10px"}}>
									Proceed to Buy
								</Link>
							</div>
						</div>
						<div className="bg-white p-4 mt-3">
							<h6 className="bold-text">
								Products related to items in your cart
							</h6>
							<span className="noz-fs-11 normal-text">
								Sponsored
							</span>
							<SponsoredProductsCard img={productimage6} />
							<SponsoredProductsCard img={productimage7} />
							<SponsoredProductsCard img={productimage8} />
							<SponsoredProductsCard img={productimage9} />
							<SponsoredProductsCard img={productimage6} />
							<SponsoredProductsCard img={productimage7} />
							<SponsoredProductsCard img={productimage8} />
							<SponsoredProductsCard img={productimage9} />
							<SponsoredProductsCard img={productimage6} />
							<SponsoredProductsCard img={productimage7} />
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Cart;
