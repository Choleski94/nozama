import React from 'react';
import { useDispatch } from 'react-redux';

import { togglePrime } from '@store/actions/app';

const withEscapeKeyListener = (Component) => {
	const WithEscapeKeyListener = ({ ...rest }) => {
		const dispatch = useDispatch();

		const handleKeyPress = (event) => {
			if (event.key === 'Escape') {
				dispatch(togglePrime());
			}
		};

		React.useEffect(() => {
			document.addEventListener('keydown', handleKeyPress);

			return () => {
				document.removeEventListener('keydown', handleKeyPress);
			};
		}, []);

		return (
			<Component {...rest} />
		);
	};

	WithEscapeKeyListener.defaultName = 'WithEscapeKeyListener';

	return WithEscapeKeyListener;
};

export default withEscapeKeyListener;
