import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { MENUS } from '@constants/menus';
import { selectPrime } from '@store/selectors/app';

const CategorySection = () => {

	const [ options, setOptions ] = React.useState([]);

	const isPrime = useSelector(selectPrime);

	React.useEffect(() => {
		setOptions(
			isPrime ? MENUS.CATEGORY.PRIME : MENUS.CATEGORY.DEFAULT 
		);
	}, [ isPrime ]);

	if (!options || !options.length) {
		return null;
	}

	return (
		<div className="d-flex align-items-center justify-content-between">
			<span>
				<Link to="" className="px-1 d-flex align-items-center">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" height="15" width="15">
						<g>
							<line x1="13.5" y1="2" x2="0.5" y2="2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
							<line x1="13.5" y1="7" x2="0.5" y2="7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
							<line x1="13.5" y1="12" x2="0.5" y2="12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
						</g>
					</svg>
					<span className="px-1">
						All
					</span>
				</Link>
			</span>
			{options && options.length ? (
				options.map(({ id, text }) => (
					<Link key={id} to={`/browse?category=${id}`} className="px-1">
						{text}
					</Link>
				))
			) : null}
		</div>
	);
}

export default CategorySection;
