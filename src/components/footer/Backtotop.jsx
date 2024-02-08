import { Link } from 'react-router-dom'


const BacktoTop = () => {
	const goToTop = () => window.scrollTo({
		top: 0,
		behavior: 'smooth',
	});

	return (
		<div className="nozama-back-to-top text-center py-3">
			<Link to="" className="text-white" onClick={goToTop}>
				Back to top
			</Link>
		</div>
	)
}

export default BacktoTop;
