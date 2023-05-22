import React from 'react';
import Lottie from 'react-lottie';
import spinner from '../assets/images/spinner';

function Spinner({ size }) {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: spinner,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};
	return (
		<div className="spinner">
			<Lottie options={defaultOptions} height={size} width={size} />
		</div>
	);
}

export default Spinner;
