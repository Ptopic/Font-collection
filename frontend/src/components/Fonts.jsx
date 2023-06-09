import React, { useState, useEffect } from 'react';
import Card from './Card';

import { getFonts, updateFont } from '../utils/fonts';

// Gsap
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Spinner from './Spinner';

import '../index.css';
import './Fonts.css';
import {
	fontsHeaderTextFlyIn,
	leftImageFlyIn,
	rightImageFlyIn,
} from '../utils/Animations';

function Fonts({ forwardedRef }) {
	gsap.registerPlugin(ScrollTrigger);

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);
			const res = await getFonts();
			const data = res.data;
			setData(data);
			console.log(data);
			setIsLoading(false);
		};
		getData();

		// Fly header text fly in
		fontsHeaderTextFlyIn(forwardedRef);
	}, []);

	useEffect(() => {
		// Left images
		const elements = gsap.utils.toArray('.font-card');
		console.log(elements);
		elements.forEach((el) => {
			leftImageFlyIn(el);
		});

		// Right images

		const elementsRight = gsap.utils.toArray('.font-card-second-part');

		elementsRight.forEach((el) => {
			rightImageFlyIn(el);
		});
	}, [data]);
	return (
		<>
			{isLoading ? (
				<Spinner size={150} />
			) : (
				<div className="fonts-container">
					{data.map((card, index) => {
						return (
							<Card
								key={index}
								image={card.image}
								image2={card.image2}
								link={card.url}
								isWide={card.wide === 1 ? true : false}
								forwardedRef={forwardedRef}
							/>
						);
					})}
				</div>
			)}
		</>
	);
}

export default Fonts;
