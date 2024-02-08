import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { MENUS } from '@constants/menus';
import Navbar from '@components/navbar/Navbar';
import Footer from '@components/footer/Footer';
import { CartProductsCards } from '@components/cart/CartHome';
import { SponsoredProductsCard } from '@components/cart/CartHome';

import './browse.css';

import productimage1 from '../../static/images/518YtltCzzL._AC_AA180_.jpg';
import productimage2 from '../../static/images/61+infHNFDL._AC_AA180_.jpg';
import productimage3 from '../../static/images/61h2xBJt6qL._AC_AA180_.jpg';
import productimage4 from '../../static/images/61jMf1cjadL._AC_AA180_.jpg';
import productimage5 from '../../static/images/61fPT0y6UkL._AC_AA180_.jpg';
import productimage6 from '../../static/images/61QzpcWCSML._AC_SR200,200_.jpg';
import productimage7 from '../../static/images/61nZ-xKh8lL._AC_SR200,200_.jpg';
import productimage8 from '../../static/images/61ZuHMrKQFL._AC_SR200,200_.jpg';
import productimage9 from '../../static/images/71z7Ja91MhL._AC_SR200,200_.jpg';

const Browse = () => {
	const [ data, setData ] = React.useState({});
	const [ options, setOptions ] = React.useState([]);
	const [ loading, setLoading ] = React.useState(false);
	const [ isSelected, setIsSelected ] = React.useState(false);
	const [ checkboxValues, setCheckboxValues ] = React.useState({});

	const [ searchParams, setSearchParams ] = useSearchParams();

	const menuOptions = React.useMemo(() => ([
		...MENUS.CATEGORY.PRIME, 
		...MENUS.CATEGORY.DEFAULT
	]), []);

	React.useEffect(() => {
		const category = searchParams.get('category');

		const [ categoryData ] = menuOptions.filter(({ id }) => 
			id === category
		);

		setData(categoryData);

		// Check if we have a sub menu.
		if (categoryData?.subMenu) {
			setCheckboxValues(
				categoryData?.subMenu.reduce((agg, { id }) => ({
					...agg, [id]: false,
				}), {})
			);
		}
	}, [ searchParams ]);

	React.useEffect(() => {
		document.body.style.backgroundColor = '#E3E6E6';
	}, []);

	React.useEffect(() => {
		fetchBrowse();
	}, []);

	const handleCategoryClick = (e) => (
		setCheckboxValues((prevValues) => ({
			...prevValues,
			[e.target.name]: !prevValues[e.target.name],
		}))
	);

	const fetchBrowse = () => {
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
		setIsSelected(!isSelected)
	}

	return (
		<>  
			<Navbar />
			<div className="noz-browse mt-4 mx-4">
				<div className="row">
					<div className="col-sm-3">
						<div className="bg-white p-4">
							{data?.text ? (
								<h5 className="bold-text">
									{data?.text}
								</h5>
							) : null}
							{data?.subMenu ? (
								<form className="mt-3">
									{data?.subMenu.map(({ id, text }) => (
										<div className="form-check mb-2">
											<input 
												id={id}
												name={id}
												type="checkbox" 
												className="form-check-input" 
												onChange={handleCategoryClick}
												checked={checkboxValues[id] || false}
											/>
											<h5 className="normal-text">
												{text}
											</h5>
										</div>
									))}
								</form>
							) : null}
						</div>
					</div>
					<div className="col-sm-9">
						<div className="bg-white p-4 pb-5">
							<div className="noz-browse-header">
								<h3 className="medium-text">
									Results
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

							<div className="noz-browse-total float-end">
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
				</div>
			</div>
			<Footer />
		</>
	)
}

export default Browse;
